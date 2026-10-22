"""2D 'toon' conversion for real photos/frames: flat colour regions + ink outlines.
Usage: python3 toon.py in.jpg outdir [--seg]"""
import sys, os, numpy as np, cv2
import onnxruntime as ort

MODEL = os.path.join(os.path.dirname(__file__), '..', 'models', 'u2net_human_seg.onnx')

def person_mask(bgr):
    sess = ort.InferenceSession(MODEL, providers=['CPUExecutionProvider'])
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
    x = cv2.resize(rgb, (320, 320), interpolation=cv2.INTER_LANCZOS4).astype(np.float32)
    x /= x.max()
    x = (x - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
    x = x.transpose(2, 0, 1)[None].astype(np.float32)
    pred = sess.run(None, {sess.get_inputs()[0].name: x})[0][0, 0]
    pred = (pred - pred.min()) / (pred.max() - pred.min() + 1e-8)
    m = cv2.resize(pred, (bgr.shape[1], bgr.shape[0]), interpolation=cv2.INTER_LINEAR)
    return np.clip(m, 0, 1)

def fit_palette(bgr, k=16, seed=1):
    lab = cv2.cvtColor(smooth(bgr), cv2.COLOR_BGR2LAB).reshape(-1, 3).astype(np.float32)
    rs = np.random.RandomState(seed)
    sub = lab[rs.choice(len(lab), min(60000, len(lab)), replace=False)]
    crit = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 40, 0.5)
    cv2.setRNGSeed(seed)
    _, _, centers = cv2.kmeans(sub, k, None, crit, 4, cv2.KMEANS_PP_CENTERS)
    return centers

def smooth(bgr):
    sm = bgr
    for _ in range(3):
        sm = cv2.bilateralFilter(sm, 9, 55, 9)
    return sm

def toon(bgr, palette, ink=(40, 38, 30), edge_strength=1.0):
    sm = smooth(bgr)
    lab = cv2.cvtColor(sm, cv2.COLOR_BGR2LAB).reshape(-1, 3).astype(np.float32)
    d = ((lab[:, None, :] - palette[None, :, :]) ** 2).sum(2)
    q = palette[d.argmin(1)].reshape(bgr.shape).astype(np.uint8)
    q = cv2.cvtColor(q, cv2.COLOR_LAB2BGR)
    q = cv2.medianBlur(q, 5)
    # punchier, cleaner colours
    hsv = cv2.cvtColor(q, cv2.COLOR_BGR2HSV).astype(np.float32)
    hsv[..., 1] = np.clip(hsv[..., 1] * 1.25, 0, 255)
    hsv[..., 2] = np.clip(hsv[..., 2] * 1.05 + 6, 0, 255)
    q = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)
    # ink outlines from the smoothed luminance
    g = cv2.cvtColor(sm, cv2.COLOR_BGR2GRAY)
    g = cv2.GaussianBlur(g, (0, 0), 1.6)
    e = cv2.Canny(g, 28, 70)
    e = cv2.dilate(e, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3)))
    e = cv2.GaussianBlur(e.astype(np.float32) / 255.0, (0, 0), 0.8) * edge_strength
    e = np.clip(e, 0, 1)[..., None]
    out = q.astype(np.float32) * (1 - e) + np.array(ink, np.float32) * e
    return out.astype(np.uint8)

if __name__ == '__main__':
    src, outdir = sys.argv[1], sys.argv[2]
    os.makedirs(outdir, exist_ok=True)
    img = cv2.imread(src)
    img = cv2.resize(img, (1080, 1920), interpolation=cv2.INTER_AREA)
    pal = fit_palette(img, 18)
    np.save(os.path.join(outdir, 'palette.npy'), pal)
    t = toon(img, pal)
    cv2.imwrite(os.path.join(outdir, 'toon_full.jpg'), t, [cv2.IMWRITE_JPEG_QUALITY, 92])
    if '--seg' in sys.argv:
        m = person_mask(img)
        hard = (m > 0.5).astype(np.uint8)
        n, lab_, stats, _ = cv2.connectedComponentsWithStats(hard)
        if n > 1:
            big = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
            hard = (lab_ == big).astype(np.uint8)
        soft = cv2.GaussianBlur(hard.astype(np.float32), (0, 0), 1.5)
        rgba = np.dstack([t, (soft * 255).astype(np.uint8)])
        cv2.imwrite(os.path.join(outdir, 'person.png'), rgba)
        hole = cv2.dilate(hard * 255, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (31, 31)))
        bg = cv2.inpaint(t, hole, 9, cv2.INPAINT_TELEA)
        cv2.imwrite(os.path.join(outdir, 'bg.jpg'), bg, [cv2.IMWRITE_JPEG_QUALITY, 92])
        cv2.imwrite(os.path.join(outdir, 'mask.png'), hard * 255)
        ys, xs = np.nonzero(hard)
        print('person bbox', xs.min(), ys.min(), xs.max(), ys.max())
    print('done')
