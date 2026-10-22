"""Cel-shaded 2D look: AnimeGAN paint -> flattened colour regions -> ink outlines.
Usage: python3 cel.py in.jpg out.jpg [--palette pal.npy] [--save-palette pal.npy]"""
import sys, os, numpy as np, cv2
sys.path.insert(0, os.path.dirname(__file__))
from anime import stylize

MODEL = os.path.join(os.path.dirname(__file__), '..', 'models', 'AnimeGANv3_Shinkai_37.onnx')

def fit_palette(bgr, k=28, seed=3):
    lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB).reshape(-1, 3).astype(np.float32)
    rs = np.random.RandomState(seed)
    sub = lab[rs.choice(len(lab), min(80000, len(lab)), replace=False)]
    cv2.setRNGSeed(seed)
    _, _, c = cv2.kmeans(sub, k, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 50, 0.3), 4, cv2.KMEANS_PP_CENTERS)
    return c

def quantize(bgr, pal):
    lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB).reshape(-1, 3).astype(np.float32)
    idx = np.empty(len(lab), np.int32)
    for s in range(0, len(lab), 400000):
        d = ((lab[s:s + 400000, None, :] - pal[None]) ** 2).sum(2)
        idx[s:s + 400000] = d.argmin(1)
    q = pal[idx].reshape(bgr.shape).astype(np.uint8)
    return cv2.cvtColor(q, cv2.COLOR_LAB2BGR)

def cel(bgr, pal=None, width=1080):
    a = stylize(bgr, MODEL, width)
    flat = cv2.pyrMeanShiftFiltering(a, 9, 22)
    flat = cv2.bilateralFilter(flat, 7, 40, 7)
    if pal is None:
        pal = fit_palette(flat)
    q = quantize(flat, pal)
    q = cv2.medianBlur(q, 5)
    hsv = cv2.cvtColor(q, cv2.COLOR_BGR2HSV).astype(np.float32)
    hsv[..., 1] = np.clip(hsv[..., 1] * 1.18, 0, 255)
    hsv[..., 2] = np.clip(hsv[..., 2] * 1.04 + 4, 0, 255)
    q = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)
    g = cv2.GaussianBlur(cv2.cvtColor(flat, cv2.COLOR_BGR2GRAY), (0, 0), 1.2)
    e = cv2.Canny(g, 45, 110)
    e = cv2.dilate(e, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3)))
    # drop tiny edge specks
    n, lab_, st, _ = cv2.connectedComponentsWithStats((e > 0).astype(np.uint8), 8)
    keep = np.zeros(n, bool); keep[1:] = st[1:, cv2.CC_STAT_AREA] >= 40
    e = keep[lab_].astype(np.float32)
    e = cv2.GaussianBlur(e, (0, 0), 0.7)[..., None]
    ink = np.array((38, 36, 34), np.float32)
    out = q.astype(np.float32) * (1 - e * 0.92) + ink * e * 0.92
    return out.astype(np.uint8), pal

if __name__ == '__main__':
    src, dst = sys.argv[1], sys.argv[2]
    pal = np.load(sys.argv[sys.argv.index('--palette') + 1]) if '--palette' in sys.argv else None
    img = cv2.imread(src)
    out, pal = cel(img, pal)
    if '--save-palette' in sys.argv: np.save(sys.argv[sys.argv.index('--save-palette') + 1], pal)
    cv2.imwrite(dst, out, [cv2.IMWRITE_JPEG_QUALITY, 93])
    print(out.shape)
