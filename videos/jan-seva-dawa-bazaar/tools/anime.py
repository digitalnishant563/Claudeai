"""AnimeGANv3 stylisation. Usage: python3 anime.py model.onnx in.jpg out.jpg [width]"""
import sys, numpy as np, cv2, onnxruntime as ort

_sess = {}
def stylize(bgr, model, width=1080):
    if model not in _sess:
        so = ort.SessionOptions(); so.intra_op_num_threads = 4
        _sess[model] = ort.InferenceSession(model, so, providers=['CPUExecutionProvider'])
    s = _sess[model]
    h, w = bgr.shape[:2]
    nw = width - width % 8; nh = int(round(h * nw / w)); nh -= nh % 8
    rgb = cv2.cvtColor(cv2.resize(bgr, (nw, nh), interpolation=cv2.INTER_AREA), cv2.COLOR_BGR2RGB).astype(np.float32) / 127.5 - 1.0
    out = s.run(None, {s.get_inputs()[0].name: rgb[None]})[0][0]
    out = ((np.clip(out, -1, 1) + 1) * 127.5).astype(np.uint8)
    return cv2.cvtColor(out, cv2.COLOR_RGB2BGR)

if __name__ == '__main__':
    model, src, dst = sys.argv[1:4]
    width = int(sys.argv[4]) if len(sys.argv) > 4 else 1080
    img = cv2.imread(src)
    out = stylize(img, model, width)
    cv2.imwrite(dst, out, [cv2.IMWRITE_JPEG_QUALITY, 93])
    print(out.shape)
