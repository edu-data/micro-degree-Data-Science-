const pptxgen = require("pptxgenjs");

const NAVY = "1E2761";
const NAVY_D = "141B44";
const ICE  = "CADCFC";
const GOLD = "C9A227";
const INK  = "1B1F2A";
const GREY = "5A6473";
const LINE = "DCE3EE";
const BG   = "FFFFFF";
const SOFT = "F4F7FC";
const RED  = "9E2A2B";
const GRN  = "2C5F2D";

const HF = "Cambria";        // header font
const BF = "맑은 고딕";       // body font (Malgun Gothic)

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";

const W = 13.3, H = 7.5, M = 0.7;

/* ---------------- helpers ---------------- */

function slideBase(dark) {
  const s = pres.addSlide();
  s.background = { color: dark ? NAVY : BG };
  return s;
}

// number badge in a circle
function badge(s, x, y, d, text, fill, txt) {
  s.addShape(pres.ShapeType.ellipse, {
    x, y, w: d, h: d, fill: { color: fill || NAVY },
    line: { color: fill || NAVY, width: 0 }
  });
  s.addText(text, {
    x, y, w: d, h: d, align: "center", valign: "middle", margin: 0,
    fontFace: BF, fontSize: d > 0.5 ? 14 : 11, bold: true, color: txt || "FFFFFF"
  });
}

function card(s, x, y, w, h, fill) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: fill || SOFT },
    line: { color: LINE, width: 1 }
  });
}

// standard content-slide header (no accent rules)
function header(s, kicker, title) {
  if (kicker) {
    s.addText(kicker, {
      x: M, y: 0.34, w: W - 2 * M, h: 0.3, margin: 0,
      fontFace: BF, fontSize: 12, bold: true, color: GOLD, charSpacing: 1.5
    });
  }
  s.addText(title, {
    x: M, y: kicker ? 0.66 : 0.5, w: W - 2 * M, h: 0.72, margin: 0,
    fontFace: HF, fontSize: 30, bold: true, color: NAVY, valign: "top"
  });
}

function tip(s, y, text, color) {
  const c = color || NAVY;
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y, w: W - 2 * M, h: 0.62, rectRadius: 0.06,
    fill: { color: SOFT }, line: { color: LINE, width: 1 }
  });
  s.addShape(pres.ShapeType.ellipse, { x: M + 0.18, y: y + 0.16, w: 0.3, h: 0.3,
    fill: { color: c }, line: { color: c, width: 0 } });
  s.addText("!", { x: M + 0.18, y: y + 0.16, w: 0.3, h: 0.3, margin: 0,
    align: "center", valign: "middle", fontFace: BF, fontSize: 13, bold: true, color: "FFFFFF" });
  s.addText(text, {
    x: M + 0.62, y: y + 0.06, w: W - 2 * M - 0.85, h: 0.5, margin: 0,
    valign: "middle", fontFace: BF, fontSize: 12, color: INK
  });
}

function tableOpts(colW, extra) {
  return Object.assign({
    x: M, w: W - 2 * M, colW,
    border: { type: "solid", pt: 0.75, color: LINE },
    fontFace: BF, fontSize: 12, color: INK,
    valign: "middle", autoPage: false
  }, extra || {});
}
function hrow(cells) {
  return cells.map(t => ({ text: t, options: {
    fill: { color: NAVY }, color: "FFFFFF", bold: true, fontSize: 12,
    align: "center", margin: [4, 6, 4, 6] } }));
}
function row(cells, opts) {
  return cells.map((t, i) => ({ text: t, options: Object.assign(
    { margin: [5, 8, 5, 8], fontSize: 12,
      bold: i === 0, color: i === 0 ? NAVY : INK,
      fill: { color: i === 0 ? SOFT : "FFFFFF" } }, opts || {}) }));
}

// bullet list
function bullets(s, x, y, w, h, items, size) {
  s.addText(items.map((t, i) => ({
    text: t, options: { bullet: { indent: 14 }, breakLine: i !== items.length - 1 }
  })), {
    x, y, w, h, margin: 0, fontFace: BF, fontSize: size || 13,
    color: INK, paraSpaceAfter: 7, lineSpacing: 19
  });
}

function sectionSlide(part, titleKo, titleEn, sub, items) {
  const s = slideBase(true);
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 1.5, w: 2.1, h: 0.52, rectRadius: 0.1,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 }
  });
  s.addText(part, { x: M, y: 1.5, w: 2.1, h: 0.52, margin: 0, align: "center",
    valign: "middle", fontFace: BF, fontSize: 15, bold: true, color: NAVY_D });
  s.addText(titleKo, { x: M, y: 2.25, w: W - 2 * M, h: 0.9, margin: 0,
    fontFace: HF, fontSize: 42, bold: true, color: "FFFFFF" });
  s.addText(titleEn, { x: M, y: 3.15, w: W - 2 * M, h: 0.45, margin: 0,
    fontFace: BF, fontSize: 17, color: ICE });
  s.addText(sub, { x: M, y: 3.72, w: W - 2 * M, h: 0.45, margin: 0,
    fontFace: BF, fontSize: 15, italic: true, color: GOLD });
  if (items) {
    const cw = (W - 2 * M - 0.6) / items.length;
    items.forEach((t, i) => {
      const x = M + i * (cw + 0.3);
      s.addShape(pres.ShapeType.roundRect, { x, y: 4.75, w: cw, h: 1.35, rectRadius: 0.08,
        fill: { color: NAVY_D }, line: { color: "3A4680", width: 1 } });
      badge(s, x + 0.25, 4.98, 0.42, String(i + 1), GOLD, NAVY_D);
      s.addText(t, { x: x + 0.78, y: 4.92, w: cw - 1.0, h: 1.0, margin: 0,
        valign: "middle", fontFace: BF, fontSize: 12.5, color: ICE });
    });
  }
  return s;
}

module.exports = { pres, pptxgen, NAVY, NAVY_D, ICE, GOLD, INK, GREY, LINE, BG, SOFT, RED, GRN,
  HF, BF, W, H, M, slideBase, badge, card, header, tip, tableOpts, hrow, row, bullets, sectionSlide };
