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
pres.layout = "LAYOUT_WIDE";      // 13.3 x 7.5
pres.author = "연구조사방법론 특강";
pres.title  = "연구조사방법론 특강 (Survey Research)";

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

/* =============== Slide 1 : 표지 =============== */
{
  const s = slideBase(true);
  s.addShape(pres.ShapeType.ellipse, { x: 9.7, y: -1.6, w: 5.4, h: 5.4,
    fill: { color: "2B3A7A" }, line: { color: "2B3A7A", width: 0 } });
  s.addShape(pres.ShapeType.ellipse, { x: 11.0, y: 3.6, w: 3.6, h: 3.6,
    fill: { color: "16205A" }, line: { color: "16205A", width: 0 } });

  s.addText("SURVEY RESEARCH METHODOLOGY", {
    x: M, y: 1.25, w: 8.4, h: 0.35, margin: 0,
    fontFace: BF, fontSize: 12.5, bold: true, color: GOLD, charSpacing: 2 });
  s.addText("연구조사방법론 특강", {
    x: M, y: 1.72, w: 8.6, h: 1.05, margin: 0,
    fontFace: HF, fontSize: 48, bold: true, color: "FFFFFF" });
  s.addText("조사연구(Survey Research)의 기초부터 군사 분야 적용까지", {
    x: M, y: 2.82, w: 8.6, h: 0.45, margin: 0,
    fontFace: BF, fontSize: 17, color: ICE });

  const info = [
    ["대상", "지휘참모 2과정 2기 해군소령 61명"],
    ["시간", "150분 (5~7교시)"],
    ["구성", "Part 1 기초 · Part 2 설계 · Part 3 분석"],
    ["강사", "(강사 이름)"]
  ];
  info.forEach((it, i) => {
    const y = 3.72 + i * 0.62;
    s.addText(it[0], { x: M, y, w: 1.0, h: 0.45, margin: 0, valign: "middle",
      fontFace: BF, fontSize: 12.5, bold: true, color: GOLD });
    s.addText(it[1], { x: M + 1.05, y, w: 7.3, h: 0.45, margin: 0, valign: "middle",
      fontFace: BF, fontSize: 14, color: "FFFFFF" });
  });
  s.addNotes("특강 개요 소개. 150분 3개 교시 구성, Part 2가 핵심임을 예고.");
}

/* =============== Slide 2 : 목차 =============== */
{
  const s = slideBase(false);
  header(s, "CONTENTS", "목차");
  const parts = [
    { n: "1", t: "조사연구의 기초", e: "5교시", star: false,
      items: ["연구란 무엇인가", "연구 과정 6단계", "연구문제와 가설 설정", "문헌 검토 및 실전 예시"] },
    { n: "2", t: "조사연구 설계", e: "6교시 · 핵심", star: true,
      items: ["조사연구의 개념과 유형", "조사연구 절차와 설문지 설계", "측정의 질 (타당도·신뢰도)", "군사 분야 조사설계 사례"] },
    { n: "3", t: "자료수집 · 분석 · 해석", e: "7교시", star: false,
      items: ["자료수집 실무 및 연구윤리", "기술통계와 추론통계 개요", "실제 분석 결과 해석 사례", "정리 및 Q&A"] }
  ];
  const cw = (W - 2 * M - 0.6) / 3;
  parts.forEach((p, i) => {
    const x = M + i * (cw + 0.3);
    card(s, x, 1.72, cw, 4.6, p.star ? NAVY : SOFT);
    badge(s, x + 0.32, 2.0, 0.6, p.n, p.star ? GOLD : NAVY, p.star ? NAVY_D : "FFFFFF");
    s.addText(p.t, { x: x + 0.32, y: 2.68, w: cw - 0.64, h: 0.7, margin: 0,
      fontFace: HF, fontSize: 19, bold: true, color: p.star ? "FFFFFF" : NAVY });
    s.addText(p.e, { x: x + 0.32, y: 3.4, w: cw - 0.64, h: 0.3, margin: 0,
      fontFace: BF, fontSize: 12, bold: true, color: p.star ? GOLD : GREY });
    s.addText(p.items.map((t, k) => ({ text: t, options: {
      bullet: { indent: 13 }, breakLine: k !== p.items.length - 1 } })), {
      x: x + 0.32, y: 3.82, w: cw - 0.64, h: 2.3, margin: 0,
      fontFace: BF, fontSize: 12.5, color: p.star ? ICE : INK,
      paraSpaceAfter: 8, lineSpacing: 18 });
  });
  s.addText("Part 2는 본 특강의 핵심입니다 — 신뢰할 수 있는 데이터를 얻기 위한 설계에 가장 많은 시간을 배분합니다.", {
    x: M, y: 6.5, w: W - 2 * M, h: 0.4, margin: 0,
    fontFace: BF, fontSize: 12, italic: true, color: GREY });
}

/* =============== Slide 3 : Part 1 표지 =============== */
sectionSlide("PART 1", "조사연구의 기초", "Survey Research Basics",
  "군사적 의사결정을 위한 체계적 접근",
  ["연구란 무엇인가", "연구 과정 6단계", "연구문제와 가설", "문헌 검토·실전 예시"]);

/* =============== Slide 4 : 연구란 무엇인가 =============== */
{
  const s = slideBase(false);
  header(s, "1-1  WHAT IS RESEARCH?", "연구란 무엇인가");
  card(s, M, 1.62, W - 2 * M, 1.02, SOFT);
  s.addText("과학적 연구(Scientific Research)란", {
    x: M + 0.3, y: 1.74, w: W - 2 * M - 0.6, h: 0.3, margin: 0,
    fontFace: BF, fontSize: 12.5, bold: true, color: GOLD });
  s.addText("체계적이고 객관적인 과정을 통해 새로운 지식을 창출하거나 기존 지식을 검증하는 활동. 군사 분야에서는 자원의 효율적 배분, 교육훈련 성과 측정, 부대 사기 진단 등을 위해 필수적입니다.", {
    x: M + 0.3, y: 2.04, w: W - 2 * M - 0.6, h: 0.5, margin: 0,
    fontFace: BF, fontSize: 13, color: INK });

  const rows = [
    hrow(["구분", "일상적 판단 (Everyday Judgment)", "체계적 연구 (Systematic Research)"]),
    row(["근거", "직관, 개인적 경험, 관습", "경험적 데이터, 체계적 관찰, 논리적 추론"]),
    row(["과정", "임의적, 비공식적", "절차적·공식적, 반복 가능(Replicable)"]),
    row(["결과", "주관적, 오류 가능성 높음", "객관적, 신뢰성·타당성 확보"])
  ];
  s.addTable(rows, tableOpts([1.9, 4.8, 5.2], { y: 2.9, rowH: 0.62 }));
  tip(s, 5.62, "훌륭한 지휘관의 ‘감’도 중요하지만, 이를 뒷받침할 객관적 ‘데이터’가 있을 때 정책적 설득력이 극대화됩니다.");
}

/* =============== Slide 5 : 연구 과정 6단계 =============== */
{
  const s = slideBase(false);
  header(s, "1-2  RESEARCH PROCESS", "연구 과정 6단계");
  const steps = [
    ["문제 식별", "해결해야 할 군사적·행정적 현안 도출"],
    ["문헌 검토", "선행 연구 및 관련 규정·교범 확인"],
    ["목적·가설 설정", "변수 간 관계에 대한 잠정적 결론 도출"],
    ["조사 설계·자료 수집", "설문지, 면접, 관찰을 통한 데이터 획득"],
    ["분석 및 해석", "통계적 기법을 활용한 가설 검증"],
    ["보고서 작성", "지휘관 및 유관 부서에 결과 공유"]
  ];
  const cw = (W - 2 * M - 5 * 0.22) / 6;
  steps.forEach((st, i) => {
    const x = M + i * (cw + 0.22);
    card(s, x, 1.75, cw, 3.0, i % 2 === 0 ? SOFT : "FFFFFF");
    badge(s, x + cw / 2 - 0.24, 1.98, 0.48, String(i + 1), NAVY);
    s.addText(st[0], { x: x + 0.12, y: 2.6, w: cw - 0.24, h: 0.62, margin: 0,
      align: "center", valign: "top", fontFace: BF, fontSize: 13.5, bold: true, color: NAVY });
    s.addText(st[1], { x: x + 0.12, y: 3.26, w: cw - 0.24, h: 1.35, margin: 0,
      align: "center", valign: "top", fontFace: BF, fontSize: 11.5, color: GREY, lineSpacing: 16 });
    if (i < 5) {
      s.addShape(pres.ShapeType.rightArrow, {
        x: x + cw + 0.03, y: 2.09, w: 0.16, h: 0.26,
        fill: { color: GOLD }, line: { color: GOLD, width: 0 } });
    }
  });
  card(s, M, 5.05, W - 2 * M, 1.3, NAVY);
  s.addText("각 단계는 되돌아갈 수 있습니다 (Iterative)", {
    x: M + 0.35, y: 5.2, w: W - 2 * M - 0.7, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 13.5, bold: true, color: GOLD });
  s.addText("분석 과정에서 자료의 한계가 드러나면 가설이나 조사 설계 단계로 돌아가 보완합니다. 순차적 진행이 아니라 순환적 개선 과정이라는 점이 실제 연구와 교과서의 가장 큰 차이입니다.", {
    x: M + 0.35, y: 5.56, w: W - 2 * M - 0.7, h: 0.68, margin: 0,
    fontFace: BF, fontSize: 12.5, color: ICE, lineSpacing: 17 });
}

/* =============== Slide 6 : 양적 vs 질적 =============== */
{
  const s = slideBase(false);
  header(s, "RESEARCH PARADIGM", "양적연구 vs 질적연구 개관");
  const rows = [
    hrow(["구분", "양적연구 (Quantitative)", "질적연구 (Qualitative)"]),
    row(["목적", "변수 간 관계 검증, 일반화", "현상의 의미 탐색, 맥락 이해"]),
    row(["자료", "수치 데이터 (설문, 실험)", "텍스트, 관찰, 면담"]),
    row(["분석", "통계적 분석 (SPSS, AMOS)", "코딩, 주제 분석 (NVivo)"]),
    row(["표본", "대규모 (100명 이상 권장)", "소규모 (5~30명)"]),
    row(["결과", "수치, 표, 그래프", "내러티브, 범주, 이론"])
  ];
  s.addTable(rows, tableOpts([1.9, 5.0, 5.0], { y: 1.68, rowH: 0.52 }));
  card(s, M, 4.9, 6.4, 1.55, NAVY);
  s.addText("조사연구(Survey Research)는 대표적인 양적연구 방법", {
    x: M + 0.3, y: 5.05, w: 5.8, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 13.5, bold: true, color: GOLD });
  s.addText("본 특강은 양적연구, 그 중에서도 설문조사 기반 연구에 집중합니다.", {
    x: M + 0.3, y: 5.42, w: 5.8, h: 0.9, margin: 0,
    fontFace: BF, fontSize: 12.5, color: ICE, lineSpacing: 17 });
  card(s, M + 6.7, 4.9, W - 2 * M - 6.7, 1.55, SOFT);
  s.addText("혼합연구(Mixed Methods) 참고", {
    x: M + 7.0, y: 5.05, w: 4.9, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 13.5, bold: true, color: NAVY });
  s.addText("2025년 신병 정신전력교육 연구는 설문(양적)과 FGI·심층면담(질적)을 병행하여 다각적 진단을 실시했습니다.", {
    x: M + 7.0, y: 5.42, w: 4.9, h: 0.9, margin: 0,
    fontFace: BF, fontSize: 12.5, color: INK, lineSpacing: 17 });
}

/* =============== Slide 7 : 연구문제와 가설 =============== */
{
  const s = slideBase(false);
  header(s, "1-3  RESEARCH QUESTIONS & HYPOTHESES", "연구문제와 가설 설정");
  const cw = (W - 2 * M - 0.6) / 3;
  const blocks = [
    { t: "좋은 연구문제의 요건", items: [
      "명확하고 구체적일 것",
      "경험적으로 검증 가능할 것",
      "자료 수집이 실제로 가능할 것",
      "부대·정책에 시사점을 줄 것"] },
    { t: "변수(Variables)의 이해", items: [
      "독립변수: 원인이 되는 변수\n(예: 교육 프로그램의 종류)",
      "종속변수: 결과가 되는 변수\n(예: 교육 이수 후 정신전력 점수)"] },
    { t: "가설(Hypothesis)의 유형", items: [
      "귀무가설 H₀: 차이·관계가 없다\n(예: 교육 방식에 따라 차이가 없다)",
      "대립가설 H₁: 연구자가 입증하려는 가설\n(예: 교육 방식에 따라 유의한 차이가 있다)"] }
  ];
  blocks.forEach((b, i) => {
    const x = M + i * (cw + 0.3);
    card(s, x, 1.72, cw, 4.0, i === 2 ? SOFT : "FFFFFF");
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.72, w: cw, h: 0.62,
      rectRadius: 0.08, fill: { color: NAVY }, line: { color: NAVY, width: 0 } });
    s.addText(b.t, { x: x + 0.24, y: 1.72, w: cw - 0.48, h: 0.62, margin: 0,
      valign: "middle", fontFace: BF, fontSize: 14, bold: true, color: "FFFFFF" });
    bullets(s, x + 0.24, 2.56, cw - 0.48, 3.0, b.items, 12.5);
  });
  tip(s, 5.95, "가설은 반드시 ‘검증 가능한 형태’로 진술하십시오. 검증할 수 없는 주장은 연구문제가 아니라 의견입니다.");
}

/* =============== Slide 8 : 연구문제 작성 공식 =============== */
{
  const s = slideBase(false);
  header(s, "FORMULA & VARIABLES", "연구문제 작성 공식과 변수의 관계");
  card(s, M, 1.62, W - 2 * M, 0.92, NAVY);
  s.addText([
    { text: "“[독립변수]가 [종속변수]에 미치는 영향”", options: { breakLine: true } },
    { text: "“[독립변수]에 따른 [종속변수]의 차이”", options: {} }
  ], { x: M, y: 1.62, w: W - 2 * M, h: 0.92, margin: 0, align: "center", valign: "middle",
    fontFace: HF, fontSize: 17, bold: true, color: "FFFFFF", lineSpacing: 24 });

  const rows = [
    hrow(["유형", "연구문제 예시", "독립변수", "종속변수"]),
    row(["영향 관계", "해군 장교의 변혁적 리더십이 부하의 직무만족에 미치는 영향", "변혁적 리더십", "직무만족"]),
    row(["집단 비교", "교육 방식(민간위탁 vs 군 자체)에 따른 장병 인성 점수의 차이", "교육 방식", "인성 점수"]),
    row(["매개 효과", "직무스트레스가 이직의도에 미치는 영향에서 조직몰입의 매개효과", "직무스트레스", "이직의도"])
  ];
  s.addTable(rows, tableOpts([1.5, 5.9, 2.25, 2.25], { y: 2.78, rowH: 0.6 }));

  // 변수 관계 모형
  const yb = 5.15;
  card(s, M, yb, W - 2 * M, 1.85, SOFT);
  s.addText("변수 관계 기본 모형", { x: M + 0.3, y: yb + 0.12, w: 3.0, h: 0.3, margin: 0,
    fontFace: BF, fontSize: 12.5, bold: true, color: GOLD });
  const bx = [M + 0.55, M + 4.85, M + 9.15], bw = 2.55, bh = 0.72, by = yb + 0.95;
  const nodes = [["독립변수", "예: 교육 방식"], ["매개변수", "예: 교육 만족도"], ["종속변수", "예: 정신전력 수준"]];
  nodes.forEach((n, i) => {
    s.addShape(pres.ShapeType.roundRect, { x: bx[i], y: by, w: bw, h: bh, rectRadius: 0.08,
      fill: { color: i === 1 ? "FFFFFF" : NAVY }, line: { color: i === 1 ? NAVY : NAVY, width: 1.25 } });
    s.addText([
      { text: n[0], options: { fontSize: 13, bold: true, breakLine: true } },
      { text: n[1], options: { fontSize: 10.5 } }
    ], { x: bx[i], y: by, w: bw, h: bh, margin: 0, align: "center", valign: "middle",
      fontFace: BF, color: i === 1 ? NAVY : "FFFFFF" });
    if (i < 2) s.addShape(pres.ShapeType.rightArrow, {
      x: bx[i] + bw + 0.35, y: by + 0.24, w: 1.05, h: 0.24,
      fill: { color: GOLD }, line: { color: GOLD, width: 0 } });
  });
  s.addText("조절변수 (예: 복무 동기)  →  관계의 강도를 바꾼다", {
    x: M + 4.85, y: by - 0.5, w: 6.9, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 11.5, italic: true, color: GREY });
}

/* =============== Slide 9 : 문헌 검토 =============== */
{
  const s = slideBase(false);
  header(s, "1-4  LITERATURE REVIEW", "문헌 검토");
  card(s, M, 1.72, 4.5, 3.05, NAVY);
  s.addText("문헌 검토의 목적", { x: M + 0.32, y: 1.95, w: 3.9, h: 0.36, margin: 0,
    fontFace: BF, fontSize: 15, bold: true, color: GOLD });
  s.addText([
    { text: "연구의 독창성 확보 (중복 연구 방지)", options: { bullet: { indent: 13 }, breakLine: true } },
    { text: "이론적 배경과 변수 관계의 근거 확보", options: { bullet: { indent: 13 }, breakLine: true } },
    { text: "검증된 측정도구(설문 문항) 벤치마킹", options: { bullet: { indent: 13 }, breakLine: true } },
    { text: "선행 연구의 한계에서 내 연구의 필요성 도출", options: { bullet: { indent: 13 } } }
  ], { x: M + 0.32, y: 2.45, w: 3.9, h: 2.1, margin: 0,
    fontFace: BF, fontSize: 12.5, color: ICE, paraSpaceAfter: 9, lineSpacing: 18 });

  const steps = ["핵심 키워드 선정 (예: 장병 사기, 인성교육 효과)",
    "관련 문헌 검색 (국회도서관, 국방 학술DB, RISS 등)",
    "문헌 스크리닝 및 질 평가",
    "데이터 추출 및 체계적 정리",
    "연구 간 관계 분석 및 요약"];
  const sx = M + 4.85, sw = W - M - sx;
  s.addText("문헌 검토 5단계 절차", { x: sx, y: 1.78, w: sw, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 15, bold: true, color: NAVY });
  steps.forEach((t, i) => {
    const y = 2.25 + i * 0.52;
    badge(s, sx, y, 0.36, String(i + 1), i === 0 ? GOLD : NAVY, i === 0 ? NAVY_D : "FFFFFF");
    s.addText(t, { x: sx + 0.52, y, w: sw - 0.52, h: 0.36, margin: 0, valign: "middle",
      fontFace: BF, fontSize: 12.5, color: INK });
  });
  tip(s, 5.05, "선행연구 정리 전략: Excel이나 EndNote 등을 활용해 [저자/연도 · 연구목적 · 연구대상 · 측정변수 · 주요결과] 표로 관리하면 편리합니다.");
}

/* =============== Slide 10 : 실전 예시 연구문제 =============== */
{
  const s = slideBase(false);
  header(s, "1-5  CASE EXAMPLES", "실전 예시: 군사 분야 연구문제");
  s.addText("실제 수행된 3건의 국방 분야 보고서에서 추출한 연구문제입니다.", {
    x: M, y: 1.5, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 12.5, italic: true, color: GREY });
  const cases = [
    { y: 2022, q: "장병 인성교육 민간위탁 vs 군 자체 프로그램의 효과성에 차이가 있는가?",
      doc: "(2022) 장병 인성교육 효과성 비교분석 연구",
      a: ["독립변수 — 인성교육 방식 (민간위탁 vs 군종장교 주관 회복탄력성)",
          "종속변수 — 장병의 인성, 회복탄력성, 사기 점수"] },
    { y: 2024, q: "실감형 디지털 정신전력교육의 실태와 개선 방안은 무엇인가?",
      doc: "(2024) 실감형 디지털 정신전력교육 실태 및 개선 방안",
      a: ["주요 변수 — VR 체험관 인프라 현황, 운영 행정 부담, 사용자 만족도"] },
    { y: 2025, q: "신병 정신전력교육이 정신전력 수준 향상에 효과가 있는가?",
      doc: "(2025) 신병 정신전력교육 효과 분석",
      a: ["가설 — 체감·실감·공감형 교육은 신병의 정신전력 수준을 유의하게 향상시킬 것이다"] }
  ];
  cases.forEach((c, i) => {
    const y = 1.98 + i * 1.62;
    card(s, M, y, W - 2 * M, 1.42, i === 2 ? SOFT : "FFFFFF");
    s.addShape(pres.ShapeType.roundRect, { x: M + 0.22, y: y + 0.24, w: 0.95, h: 0.44,
      rectRadius: 0.08, fill: { color: NAVY }, line: { color: NAVY, width: 0 } });
    s.addText(String(c.y), { x: M + 0.22, y: y + 0.24, w: 0.95, h: 0.44, margin: 0,
      align: "center", valign: "middle", fontFace: BF, fontSize: 12.5, bold: true, color: "FFFFFF" });
    s.addText(c.q, { x: M + 1.35, y: y + 0.16, w: W - 2 * M - 1.6, h: 0.4, margin: 0,
      valign: "middle", fontFace: BF, fontSize: 14, bold: true, color: NAVY });
    s.addText(c.doc, { x: M + 1.35, y: y + 0.56, w: W - 2 * M - 1.6, h: 0.28, margin: 0,
      fontFace: BF, fontSize: 11, italic: true, color: GOLD });
    s.addText(c.a.map((t, k) => ({ text: t, options: {
      bullet: { indent: 13 }, breakLine: k !== c.a.length - 1 } })), {
      x: M + 1.35, y: y + 0.86, w: W - 2 * M - 1.6, h: 0.5, margin: 0,
      fontFace: BF, fontSize: 12, color: INK, lineSpacing: 16 });
  });
}

/* =============== Slide 11 : Part 2 표지 =============== */
sectionSlide("PART 2 ★", "조사연구 설계", "Research Design",
  "신뢰할 수 있는 데이터를 얻기 위한 뼈대 만들기",
  ["개념과 유형", "절차와 표집", "설문지 설계", "타당도·신뢰도"]);

/* =============== Slide 12 : 조사연구의 유형 =============== */
{
  const s = slideBase(false);
  header(s, "2-1  TYPES OF SURVEY RESEARCH", "조사연구의 개념과 유형");
  const groups = [
    { label: "시점에 따른 분류", items: [
      { t: "횡단 조사 (Cross-sectional)", d: "특정 시점에 1회 자료 수집",
        p: "시간과 비용 절약", c: "인과관계 입증이 어려움" },
      { t: "종단 조사 (Longitudinal)", d: "여러 시점에 반복 수집 (사전–사후–추적)",
        p: "변화 추이 파악, 인과 추론 용이", c: "비용과 시간 과다" }] },
    { label: "목적에 따른 분류", items: [
      { t: "기술적 조사 (Descriptive)", d: "현상의 실태·빈도를 설명",
        p: "예: 우리 부대원의 교육 만족도는 몇 점인가?", c: "관계 설명에는 한계" },
      { t: "설명적 조사 (Explanatory)", d: "현상의 인과관계를 설명",
        p: "예: 교육 방식에 따라 만족도가 왜 달라지는가?", c: "정교한 설계 필요" }] }
  ];
  const cw = (W - 2 * M - 0.4) / 2;
  groups.forEach((g, gi) => {
    const x = M + gi * (cw + 0.4);
    s.addText(g.label, { x, y: 1.66, w: cw, h: 0.32, margin: 0,
      fontFace: BF, fontSize: 14, bold: true, color: GOLD });
    g.items.forEach((it, i) => {
      const y = 2.08 + i * 2.28;
      card(s, x, y, cw, 2.05, i === 0 ? NAVY : SOFT);
      const fg = i === 0 ? "FFFFFF" : NAVY;
      s.addText(it.t, { x: x + 0.28, y: y + 0.2, w: cw - 0.56, h: 0.34, margin: 0,
        fontFace: BF, fontSize: 14, bold: true, color: fg });
      s.addText(it.d, { x: x + 0.28, y: y + 0.56, w: cw - 0.56, h: 0.5, margin: 0,
        fontFace: BF, fontSize: 12.5, color: i === 0 ? ICE : INK, lineSpacing: 17 });
      s.addText("＋  " + it.p, { x: x + 0.28, y: y + 1.14, w: cw - 0.56, h: 0.36, margin: 0,
        fontFace: BF, fontSize: 11.5, color: i === 0 ? "9BE8C0" : GRN });
      s.addText("－  " + it.c, { x: x + 0.28, y: y + 1.52, w: cw - 0.56, h: 0.36, margin: 0,
        fontFace: BF, fontSize: 11.5, color: i === 0 ? "F3B0B0" : RED });
    });
  });
}

/* =============== Slide 13 : 절차 및 표집 =============== */
{
  const s = slideBase(false);
  header(s, "2-2  PROCEDURE & SAMPLING", "조사연구 절차 및 표집");
  card(s, M, 1.68, W - 2 * M, 1.02, NAVY);
  s.addText("모집단 (Population)", { x: M + 0.35, y: 1.8, w: 5.4, h: 0.3, margin: 0,
    fontFace: BF, fontSize: 13, bold: true, color: GOLD });
  s.addText("연구 대상 전체 — 예: 대한민국 해군 전체 장병", {
    x: M + 0.35, y: 2.12, w: 5.4, h: 0.42, margin: 0, fontFace: BF, fontSize: 12.5, color: "FFFFFF" });
  s.addShape(pres.ShapeType.rightArrow, { x: M + 5.95, y: 2.06, w: 0.55, h: 0.26,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 } });
  s.addText("표본 (Sample)", { x: M + 6.75, y: 1.8, w: 5.0, h: 0.3, margin: 0,
    fontFace: BF, fontSize: 13, bold: true, color: GOLD });
  s.addText("모집단을 대표하도록 추출된 일부 — 예: 2함대 장병 500명", {
    x: M + 6.75, y: 2.10, w: 5.2, h: 0.48, margin: 0, fontFace: BF, fontSize: 12, color: "FFFFFF" });

  const rows = [
    hrow(["유형", "설명", "예시"]),
    row(["확률 표집\n(Probability)", "모집단의 모든 구성원이 뽑힐 확률이 알려져 있음 — 대표성 높음",
      "단순무작위 표집, 층화 표집\n(계급별·부대별 비율에 맞춰 표집)"]),
    row(["비확률 표집\n(Non-probability)", "연구자의 편의나 주관적 판단에 따라 추출 — 대표성 낮음",
      "편의 표집(접근하기 쉬운 장병만 대상),\n유의 표집, 눈덩이 표집"])
  ];
  s.addTable(rows, tableOpts([2.4, 5.3, 4.2], { y: 2.95, rowH: 1.0 }));
  tip(s, 5.5, "표본 크기: 집단 비교에는 집단당 최소 30명 이상이 권장되며, 오차율을 줄이려면 수백 명 이상이 바람직합니다.", RED);
}

/* =============== Slide 14 : 설문지 설계 =============== */
{
  const s = slideBase(false);
  header(s, "2-3  QUESTIONNAIRE DESIGN", "설문지 설계");
  const cw = (W - 2 * M - 0.35) / 2;
  card(s, M, 1.7, cw, 2.05, SOFT);
  s.addText("문항 유형", { x: M + 0.28, y: 1.88, w: cw - 0.56, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: NAVY });
  bullets(s, M + 0.28, 2.28, cw - 0.56, 1.3, [
    "폐쇄형 질문 — 선택지 제시(만족/보통/불만족). 분석이 쉬움",
    "개방형 질문 — 자유 서술. 심층 정보 획득에 유리하나 분석 부담"], 12.5);

  card(s, M + cw + 0.35, 1.7, cw, 2.05, NAVY);
  s.addText("리커트 척도 (Likert Scale)", { x: M + cw + 0.63, y: 1.88, w: cw - 0.56, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: GOLD });
  s.addText("응답자의 동의 정도를 5점 또는 7점 척도로 측정", {
    x: M + cw + 0.63, y: 2.24, w: cw - 0.56, h: 0.3, margin: 0,
    fontFace: BF, fontSize: 12.5, color: ICE });
  const lw = (cw - 0.56 - 4 * 0.12) / 5;
  ["1\n전혀 아니다", "2\n아니다", "3\n보통", "4\n그렇다", "5\n매우 그렇다"].forEach((t, i) => {
    const x = M + cw + 0.63 + i * (lw + 0.12);
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.65, w: lw, h: 0.82, rectRadius: 0.07,
      fill: { color: i === 4 ? GOLD : NAVY_D }, line: { color: i === 4 ? GOLD : "3A4680", width: 1 } });
    s.addText(t, { x, y: 2.65, w: lw, h: 0.82, margin: 0, align: "center", valign: "middle",
      fontFace: BF, fontSize: 10.5, bold: true, color: i === 4 ? NAVY_D : ICE, lineSpacing: 14 });
  });

  s.addText("설문지 구성 원칙", { x: M, y: 3.95, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 15, bold: true, color: NAVY });
  const rules = [
    ["쉽고 명확한 용어", "모호하거나 전문적인 표현을 지양합니다"],
    ["이중 질문 피하기", "“이 교육은 유익하고 재미있었습니까?”"],
    ["유도성 질문 피하기", "“지휘관의 훌륭한 지도에 만족하십니까?”"],
    ["인구통계 문항은 뒤로", "계급·성별 등은 가급적 맨 뒤에 배치합니다"]
  ];
  const rw = (W - 2 * M - 3 * 0.25) / 4;
  rules.forEach((r, i) => {
    const x = M + i * (rw + 0.25);
    card(s, x, 4.38, rw, 1.85, "FFFFFF");
    badge(s, x + 0.22, 4.6, 0.4, String(i + 1), NAVY);
    s.addText(r[0], { x: x + 0.22, y: 5.08, w: rw - 0.44, h: 0.36, margin: 0,
      fontFace: BF, fontSize: 12.5, bold: true, color: NAVY });
    s.addText(r[1], { x: x + 0.22, y: 5.46, w: rw - 0.44, h: 0.66, margin: 0,
      fontFace: BF, fontSize: 11, color: GREY, lineSpacing: 15 });
  });
}

/* =============== Slide 15 : 좋은 문항 vs 나쁜 문항 =============== */
{
  const s = slideBase(false);
  header(s, "ITEM WRITING", "리커트 척도 문항 작성의 좋은 예와 나쁜 예");
  const rows = [
    hrow(["구분", "나쁜 문항 ✕", "좋은 문항 ○", "문제점"]),
    row(["이중 질문", "“이 교육은 유익하고 흥미로웠다”", "“이 교육은 유익하였다”", "유익성과 흥미를 분리해야 함"]),
    row(["유도성", "“우수한 정신전력교육에 만족한다”", "“정신전력교육에 만족한다”", "‘우수한’이 응답을 유도"]),
    row(["부정형", "“교육이 불필요하지 않다고 생각한다”", "“교육이 필요하다고 생각한다”", "이중 부정으로 혼란 유발"]),
    row(["모호함", "“교육을 자주 받았다”", "“지난 6개월간 교육을 3회 이상 받았다”", "‘자주’의 기준이 불명확"])
  ];
  const t = tableOpts([1.5, 4.2, 4.2, 2.0], { y: 1.62, rowH: 0.56 });
  s.addTable(rows.map((r, ri) => ri === 0 ? r : r.map((c, ci) => {
    if (ci === 1) c.options.color = RED;
    if (ci === 2) c.options.color = GRN;
    if (ci === 3) c.options.fontSize = 11.5, c.options.color = GREY;
    return c;
  })), t);

  s.addText("설문지 전체 구성 순서", { x: M, y: 4.62, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 15, bold: true, color: NAVY });
  const flow = ["① 인사말 및\n연구 목적 안내", "② 동의서\n(Informed Consent)",
    "③ 주요 측정 문항\n(독립·종속·매개변수)", "④ 인구통계학적 문항\n(계급·연령·학력)", "⑤ 감사 인사 및\n제출 안내"];
  const fw = (W - 2 * M - 4 * 0.42) / 5;
  flow.forEach((t2, i) => {
    const x = M + i * (fw + 0.42);
    s.addShape(pres.ShapeType.roundRect, { x, y: 5.08, w: fw, h: 1.05, rectRadius: 0.08,
      fill: { color: i === 2 ? NAVY : SOFT }, line: { color: i === 2 ? NAVY : LINE, width: 1 } });
    s.addText(t2, { x: x + 0.08, y: 5.08, w: fw - 0.16, h: 1.05, margin: 0,
      align: "center", valign: "middle", fontFace: BF, fontSize: 11.5,
      bold: i === 2, color: i === 2 ? "FFFFFF" : INK, lineSpacing: 15 });
    if (i < 4) s.addShape(pres.ShapeType.rightArrow, {
      x: x + fw + 0.09, y: 5.48, w: 0.24, h: 0.24,
      fill: { color: GOLD }, line: { color: GOLD, width: 0 } });
  });
}

/* =============== Slide 16 : 타당도와 신뢰도 =============== */
{
  const s = slideBase(false);
  header(s, "2-4  VALIDITY & RELIABILITY", "측정의 질: 타당도와 신뢰도");
  const cw = (W - 2 * M - 0.4) / 2;
  const cols = [
    { t: "타당도 (Validity)", q: "측정하고자 하는 것을 제대로 측정했는가?",
      m: "과녁의 중앙을 맞추는가", dark: true,
      items: ["내용 타당도 — 문항이 개념을 충분히 대표하는가 (전문가 자문 활용)",
              "구인 타당도 — 추상적 개념(예: 군인정신)을 잘 설명하는가",
              "준거 타당도 — 다른 검증된 기준과 일치하는가"] },
    { t: "신뢰도 (Reliability)", q: "반복 측정해도 일관된 결과가 나오는가?",
      m: "과녁의 한 곳에 모이는가", dark: false,
      items: ["대표 지표 — Cronbach’s α (크론바흐 알파)",
              "통상 0.7 이상이면 신뢰할 만하다고 판단",
              "문항 수가 지나치게 적으면 계수가 낮아짐에 유의"] }
  ];
  cols.forEach((c, i) => {
    const x = M + i * (cw + 0.4);
    card(s, x, 1.68, cw, 3.75, c.dark ? NAVY : SOFT);
    const fg = c.dark ? "FFFFFF" : NAVY;
    s.addText(c.t, { x: x + 0.32, y: 1.9, w: cw - 0.64, h: 0.4, margin: 0,
      fontFace: HF, fontSize: 20, bold: true, color: fg });
    s.addText(c.q, { x: x + 0.32, y: 2.32, w: cw - 0.64, h: 0.34, margin: 0,
      fontFace: BF, fontSize: 12.5, color: c.dark ? ICE : INK });
    s.addText("“" + c.m + "”", { x: x + 0.32, y: 2.7, w: cw - 0.64, h: 0.34, margin: 0,
      fontFace: BF, fontSize: 12.5, italic: true, bold: true, color: GOLD });
    s.addText(c.items.map((t, k) => ({ text: t, options: {
      bullet: { indent: 13 }, breakLine: k !== c.items.length - 1 } })), {
      x: x + 0.32, y: 3.16, w: cw - 0.64, h: 2.05, margin: 0,
      fontFace: BF, fontSize: 12.5, color: c.dark ? ICE : INK,
      paraSpaceAfter: 9, lineSpacing: 18 });
  });
  tip(s, 5.66, "파일럿 테스트(Pilot Test): 본 조사 전에 20~30명을 대상으로 예비 조사를 실시해 문항의 문제점을 찾고 신뢰도를 사전 점검하십시오.");
}

/* =============== Slide 17 : 실제 조사설계 사례 1/2 =============== */
{
  const s = slideBase(false);
  header(s, "2-5  CASE STUDY  (1/2)", "실전 예시: 실제 조사설계 사례");
  s.addText("2025년 보고서 『신병 정신전력교육 효과 분석』 사례", {
    x: M, y: 1.5, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 12.5, italic: true, color: GREY });

  card(s, M, 1.95, W - 2 * M, 1.75, SOFT);
  s.addText("1. 평가모형 적용 — CIPP 모형", { x: M + 0.32, y: 2.12, w: 6.0, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: NAVY });
  const cipp = [["Context", "상황"], ["Input", "투입"], ["Process", "과정"], ["Product", "성과"]];
  const kw = (W - 2 * M - 0.64 - 3 * 0.3) / 4;
  cipp.forEach((c, i) => {
    const x = M + 0.32 + i * (kw + 0.3);
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.58, w: kw, h: 0.85, rectRadius: 0.08,
      fill: { color: NAVY }, line: { color: NAVY, width: 0 } });
    s.addText([
      { text: c[0], options: { fontSize: 13.5, bold: true, color: GOLD, breakLine: true } },
      { text: c[1], options: { fontSize: 11.5, color: ICE } }
    ], { x, y: 2.58, w: kw, h: 0.85, margin: 0, align: "center", valign: "middle", fontFace: BF });
  });

  s.addText("2. 반복측정 설계 (종단연구) — 교육 효과의 지속성을 5개 시점에 걸쳐 측정", {
    x: M, y: 3.92, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: NAVY });
  const T = [["T1", "입소 첫 주", "사전 진단"], ["T2", "2주차", "체감·실감 교육 직후"],
    ["T3", "3주차", "교육 완료 시점"], ["T4", "신규 기수", "사전 측정 (통제집단 역할)"],
    ["T5", "5주차", "신병교육 수료 (추적 조사)"]];
  const tw = (W - 2 * M - 4 * 0.28) / 5;
  T.forEach((t, i) => {
    const x = M + i * (tw + 0.28);
    card(s, x, 4.38, tw, 1.55, i === 4 ? NAVY : "FFFFFF");
    const fg = i === 4 ? "FFFFFF" : NAVY;
    s.addText(t[0], { x: x + 0.12, y: 4.52, w: tw - 0.24, h: 0.42, margin: 0, align: "center",
      fontFace: HF, fontSize: 22, bold: true, color: i === 4 ? GOLD : NAVY });
    s.addText(t[1], { x: x + 0.12, y: 4.98, w: tw - 0.24, h: 0.3, margin: 0, align: "center",
      fontFace: BF, fontSize: 12.5, bold: true, color: fg });
    s.addText(t[2], { x: x + 0.12, y: 5.3, w: tw - 0.24, h: 0.55, margin: 0, align: "center",
      fontFace: BF, fontSize: 11, color: i === 4 ? ICE : GREY, lineSpacing: 15 });
    if (i < 4) s.addShape(pres.ShapeType.rightArrow, { x: x + tw + 0.02, y: 5.03, w: 0.22, h: 0.22,
      fill: { color: GOLD }, line: { color: GOLD, width: 0 } });
  });
  s.addText("시점을 늘릴수록 “교육 직후의 일시적 상승”과 “유지되는 효과”를 구분할 수 있습니다.", {
    x: M, y: 6.12, w: W - 2 * M, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 12, italic: true, color: GREY });
}

/* =============== Slide 18 : 실제 조사설계 사례 2/2 =============== */
{
  const s = slideBase(false);
  header(s, "2-5  CASE STUDY  (2/2)", "실전 예시: 실제 조사설계 사례");
  const items = [
    { n: "3", t: "설문지 구성 실제 (2025년 보고서)", dark: true, lines: [
      "7개 핵심 요인 — 사전설명 / 구성이해·콘텐츠효과 / 군 정체성인식 / 몰입 / 기억지속성 / 만족도 / 추천의도",
      "교육방식별 특화 문항 — 체감형(현장 미션), 실감형(VR·파노라마의 시청각 몰입감), 공감형(탈북민 강연 몰입도)을 분리 측정"] },
    { n: "4", t: "실태조사 설계 (2024년 보고서)", dark: false, lines: [
      "전국 35개소 부대의 VR 인프라 구축 현황 및 교육 운영 실태 파악",
      "횡단조사 + 관계자 FGI(초점집단면접)를 병행하여 수치와 맥락을 함께 확보"] },
    { n: "5", t: "층화 표집을 활용한 비교분석 (2022년 보고서)", dark: false, lines: [
      "민간위탁 인성교육 집단 vs 군종장교 회복탄력성 집단 vs 통제 집단",
      "계급별로 층을 나누어 임의 배정(Stratified random assignment) 실시"] }
  ];
  items.forEach((it, i) => {
    const y = 1.7 + i * 1.62;
    card(s, M, y, W - 2 * M, 1.42, it.dark ? NAVY : SOFT);
    badge(s, M + 0.3, y + 0.34, 0.52, it.n, it.dark ? GOLD : NAVY, it.dark ? NAVY_D : "FFFFFF");
    s.addText(it.t, { x: M + 1.02, y: y + 0.18, w: W - 2 * M - 1.35, h: 0.36, margin: 0,
      valign: "middle", fontFace: BF, fontSize: 14, bold: true, color: it.dark ? GOLD : NAVY });
    s.addText(it.lines.map((t, k) => ({ text: t, options: {
      bullet: { indent: 13 }, breakLine: k !== it.lines.length - 1 } })), {
      x: M + 1.02, y: y + 0.58, w: W - 2 * M - 1.35, h: 0.76, margin: 0,
      fontFace: BF, fontSize: 12, color: it.dark ? ICE : INK,
      paraSpaceAfter: 6, lineSpacing: 16 });
  });
  s.addText("설계 단계에서 “무엇을, 누구에게, 몇 번, 어떻게 비교할 것인가”를 확정해야 분석 단계에서 헤매지 않습니다.", {
    x: M, y: 6.52, w: W - 2 * M, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 12, italic: true, color: GREY });
}

/* =============== Slide 19 : Part 3 표지 =============== */
sectionSlide("PART 3", "자료수집 · 분석 · 해석", "Data Collection & Analysis",
  "얻은 데이터를 어떻게 요리할 것인가",
  ["자료수집·연구윤리", "기술통계", "추론통계", "결과 해석"]);

/* =============== Slide 20 : 자료수집 실무 및 연구윤리 =============== */
{
  const s = slideBase(false);
  header(s, "3-1  FIELDWORK & RESEARCH ETHICS", "자료수집 실무 및 연구윤리");
  const cw = (W - 2 * M - 0.35) / 2;
  card(s, M, 1.7, cw, 2.15, SOFT);
  s.addText("온 · 오프라인 설문 배포", { x: M + 0.3, y: 1.9, w: cw - 0.6, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: NAVY });
  bullets(s, M + 0.3, 2.3, cw - 0.6, 1.4, [
    "온라인 설문 — 접근성이 좋고 데이터 입력이 자동화됨 (인트라넷 체계 활용)",
    "오프라인(지면) 설문 — 교육 직후 현장에서 즉시 실시하면 회수율이 매우 높음"], 12.5);

  card(s, M + cw + 0.35, 1.7, cw, 2.15, SOFT);
  s.addText("응답률 제고 전략", { x: M + cw + 0.65, y: 1.9, w: cw - 0.6, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: NAVY });
  bullets(s, M + cw + 0.65, 2.3, cw - 0.6, 1.4, [
    "설문 결과가 부대 발전에 어떻게 기여하는지 명확히 설명",
    "지나치게 긴 설문지 지양 — 작성 소요 시간 10~15분 내외 권장"], 12.5);

  card(s, M, 4.05, W - 2 * M, 2.25, NAVY);
  s.addText("연구윤리와 IRB (기관생명윤리위원회)", {
    x: M + 0.35, y: 4.25, w: W - 2 * M - 0.7, h: 0.36, margin: 0,
    fontFace: HF, fontSize: 19, bold: true, color: "FFFFFF" });
  const eth = [
    ["동의", "대상자의 사전 동의(Informed Consent)를 반드시 획득합니다"],
    ["익명성", "익명성과 비밀보장 원칙을 준수하고 개인 식별 정보를 수집하지 않습니다"],
    ["자발성", "군은 상명하복 조직이므로, 응답에 따른 불이익이 전혀 없음을 명확히 안내합니다"]
  ];
  const ew = (W - 2 * M - 0.7 - 2 * 0.3) / 3;
  eth.forEach((e, i) => {
    const x = M + 0.35 + i * (ew + 0.3);
    s.addShape(pres.ShapeType.roundRect, { x, y: 4.72, w: ew, h: 1.32, rectRadius: 0.08,
      fill: { color: NAVY_D }, line: { color: "3A4680", width: 1 } });
    s.addText(e[0], { x: x + 0.2, y: 4.86, w: ew - 0.4, h: 0.32, margin: 0,
      fontFace: BF, fontSize: 13, bold: true, color: GOLD });
    s.addText(e[1], { x: x + 0.2, y: 5.2, w: ew - 0.4, h: 0.74, margin: 0,
      fontFace: BF, fontSize: 11.5, color: ICE, lineSpacing: 16 });
  });
}

/* =============== Slide 21 : 기술통계 =============== */
{
  const s = slideBase(false);
  header(s, "3-2  DESCRIPTIVE STATISTICS", "기술통계");
  s.addText("수집된 데이터의 전반적인 특징을 요약하고 설명하는 통계 방법입니다.", {
    x: M, y: 1.5, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 13, color: GREY });
  const items = [
    { t: "빈도분석", e: "Frequency Analysis", d: "성별·계급 등 범주형 변수의 응답자 수와 비율을 파악합니다." },
    { t: "교차분석", e: "Cross Tabulation", d: "두 범주형 변수 간의 관계를 봅니다. 예: 계급별 교육 만족도 교차표." },
    { t: "평균 · 표준편차", e: "Mean & SD", d: "연속형 변수(예: 만족도 5점 만점)의 중심 경향과 퍼짐 정도를 요약합니다." }
  ];
  const cw = (W - 2 * M - 0.6) / 3;
  items.forEach((it, i) => {
    const x = M + i * (cw + 0.3);
    card(s, x, 2.0, cw, 2.5, i === 1 ? NAVY : SOFT);
    const fg = i === 1 ? "FFFFFF" : NAVY;
    badge(s, x + 0.3, 2.28, 0.5, String(i + 1), i === 1 ? GOLD : NAVY, i === 1 ? NAVY_D : "FFFFFF");
    s.addText(it.t, { x: x + 0.3, y: 2.92, w: cw - 0.6, h: 0.38, margin: 0,
      fontFace: HF, fontSize: 19, bold: true, color: fg });
    s.addText(it.e, { x: x + 0.3, y: 3.3, w: cw - 0.6, h: 0.28, margin: 0,
      fontFace: BF, fontSize: 11, color: GOLD });
    s.addText(it.d, { x: x + 0.3, y: 3.64, w: cw - 0.6, h: 0.72, margin: 0,
      fontFace: BF, fontSize: 12, color: i === 1 ? ICE : INK, lineSpacing: 17 });
  });
  card(s, M, 4.78, W - 2 * M, 1.35, "FFFFFF");
  s.addText("분석의 첫걸음", { x: M + 0.32, y: 4.94, w: 3.0, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 13.5, bold: true, color: GOLD });
  s.addText("본격적인 가설 검증에 들어가기 전에, 기술통계로 결측치·입력 오류·이상치(Outlier)가 없는지 반드시 확인하십시오. 이 단계를 건너뛰면 뒤의 모든 분석 결과를 신뢰할 수 없습니다.", {
    x: M + 0.32, y: 5.28, w: W - 2 * M - 0.64, h: 0.72, margin: 0,
    fontFace: BF, fontSize: 12.5, color: INK, lineSpacing: 17 });
}

/* =============== Slide 22 : 추론통계 개요 =============== */
{
  const s = slideBase(false);
  header(s, "3-3  INFERENTIAL STATISTICS", "추론통계 개요");
  s.addText("표본의 데이터를 바탕으로 모집단의 특성을 추론하거나 가설을 검증하는 방법입니다.", {
    x: M, y: 1.5, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 13, color: GREY });
  const rows = [
    hrow(["기법", "적용 상황 (언제 쓰는가?)", "군사 분야 예시"]),
    row(["t-검정\n(t-test)", "두 집단 간의 평균 차이를 비교할 때", "교육 전 vs 교육 후 만족도 비교"]),
    row(["ANOVA\n(분산분석)", "세 집단 이상의 평균 차이를 비교할 때", "육·해·공군 장병 간 사기 점수 비교"]),
    row(["상관분석\n(Correlation)", "두 연속형 변수 간의 선형 관계를 볼 때", "신병 교육 성취도와 부대 적응 점수의 관계"]),
    row(["회귀분석\n(Regression)", "독립변수가 종속변수에 미치는 영향을 예측할 때", "몰입도·만족도·교육 환경이 최종 성취도에 미치는 영향"])
  ];
  s.addTable(rows, tableOpts([2.4, 4.9, 4.6], { y: 1.95, rowH: 0.78 }));
  tip(s, 5.62, "어떤 기법을 쓸지는 ‘데이터의 종류’와 ‘연구문제의 형태’가 결정합니다. 다음 슬라이드의 의사결정 가이드를 참고하십시오.");
}

/* =============== Slide 23 : 분석기법 선택 가이드 =============== */
{
  const s = slideBase(false);
  header(s, "DECISION GUIDE", "분석 기법 선택 의사결정 가이드");
  s.addText("“내 연구에는 어떤 통계를 써야 할까?”", {
    x: M, y: 1.5, w: W - 2 * M, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: GOLD });

  const cw = (W - 2 * M - 0.4) / 2;
  const branches = [
    { q: "집단 간 차이를 비교하고 싶다", sub: "비교하는 집단 수는?", dark: true, opts: [
      ["2개 집단", "t-검정"], ["3개 이상", "ANOVA (분산분석)"]],
      note: "사전–사후 비교 → 대응표본 t-검정\n집단 간 비교 → 독립표본 t-검정" },
    { q: "변수 간 관계·영향을 보고 싶다", sub: "투입하는 변수 수는?", dark: false, opts: [
      ["2개 변수", "상관분석"], ["다수 변수", "다중회귀분석"]],
      note: "관계의 방향·강도만 → 상관분석\n영향력과 설명력까지 → 회귀분석" }
  ];
  branches.forEach((b, i) => {
    const x = M + i * (cw + 0.4);
    card(s, x, 1.95, cw, 4.15, b.dark ? NAVY : SOFT);
    const fg = b.dark ? "FFFFFF" : NAVY;
    s.addText(b.q, { x: x + 0.3, y: 2.15, w: cw - 0.6, h: 0.4, margin: 0,
      fontFace: HF, fontSize: 18, bold: true, color: fg });
    s.addText(b.sub, { x: x + 0.3, y: 2.58, w: cw - 0.6, h: 0.3, margin: 0,
      fontFace: BF, fontSize: 12.5, color: GOLD });
    b.opts.forEach((o, k) => {
      const y = 2.98 + k * 0.86;
      s.addShape(pres.ShapeType.roundRect, { x: x + 0.3, y, w: cw - 0.6, h: 0.72, rectRadius: 0.08,
        fill: { color: b.dark ? NAVY_D : "FFFFFF" }, line: { color: b.dark ? "3A4680" : LINE, width: 1 } });
      s.addText(o[0], { x: x + 0.48, y, w: 2.0, h: 0.72, margin: 0, valign: "middle",
        fontFace: BF, fontSize: 12.5, color: b.dark ? ICE : GREY });
      s.addText(o[1], { x: x + 2.5, y, w: cw - 2.8, h: 0.72, margin: 0, valign: "middle",
        align: "right", fontFace: BF, fontSize: 14.5, bold: true, color: b.dark ? GOLD : NAVY });
    });
    s.addText(b.note, { x: x + 0.3, y: 4.78, w: cw - 0.6, h: 1.1, margin: 0,
      fontFace: BF, fontSize: 12, color: b.dark ? ICE : INK, lineSpacing: 18 });
  });
  s.addText("실전 팁 — 논문에는 분석 기법의 선택 근거를 반드시 기술합니다. 예: “두 집단(민간위탁·군 자체) 간 평균 차이를 검증하기 위해 독립표본 t-검정을 실시하였다.”", {
    x: M, y: 6.32, w: W - 2 * M, h: 0.42, margin: 0,
    fontFace: BF, fontSize: 12, italic: true, color: GREY, lineSpacing: 16 });
}

/* =============== Slide 24 : p-value =============== */
{
  const s = slideBase(false);
  header(s, "INTERPRETATION", "통계 결과 해석의 핵심: p-value와 유의수준");
  card(s, M, 1.6, W - 2 * M, 0.82, NAVY);
  s.addText("p-value(유의확률) — 귀무가설이 참일 때, 현재 관측된 결과(또는 더 극단적인 결과)가 나올 확률", {
    x: M, y: 1.6, w: W - 2 * M, h: 0.82, margin: 0, align: "center", valign: "middle",
    fontFace: BF, fontSize: 14.5, bold: true, color: "FFFFFF" });

  const cw = (W - 2 * M - 0.4) / 2;
  const rows = [
    hrow(["p-value", "해석", "판정"]),
    row(["p < .001", "매우 유의미 (***)", "귀무가설 기각"]),
    row(["p < .01", "유의미 (**)", "귀무가설 기각"]),
    row(["p < .05", "유의미 (*)", "귀무가설 기각"]),
    row(["p ≥ .05", "유의미하지 않음 (n.s.)", "귀무가설 채택"])
  ];
  s.addTable(rows, tableOpts([1.8, 2.6, 1.9], { x: M, w: cw, y: 2.72, rowH: 0.5 }));

  const x2 = M + cw + 0.4;
  card(s, x2, 2.72, cw, 2.5, SOFT);
  s.addText("주의 — 통계적 유의성 ≠ 실질적 유의성", {
    x: x2 + 0.3, y: 2.92, w: cw - 0.6, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: RED });
  bullets(s, x2 + 0.3, 3.34, cw - 0.6, 1.1, [
    "표본이 충분히 크면 사소한 차이도 통계적으로 유의해집니다",
    "효과 크기(Effect Size)를 함께 보고해야 실질적 가치를 판단할 수 있습니다"], 12.5);
  const d = [["0.2", "작음"], ["0.5", "중간"], ["0.8", "큼"]];
  const dw = (cw - 0.6 - 2 * 0.24) / 3;
  d.forEach((v, i) => {
    const x = x2 + 0.3 + i * (dw + 0.24);
    s.addShape(pres.ShapeType.roundRect, { x, y: 4.5, w: dw, h: 0.6, rectRadius: 0.07,
      fill: { color: i === 2 ? NAVY : "FFFFFF" }, line: { color: i === 2 ? NAVY : LINE, width: 1 } });
    s.addText("Cohen's d = " + v[0] + "  ·  " + v[1], {
      x, y: 4.5, w: dw, h: 0.6, margin: 0, align: "center", valign: "middle",
      fontFace: BF, fontSize: 11, bold: true, color: i === 2 ? "FFFFFF" : NAVY });
  });
  tip(s, 5.55, "지휘 결심 보고서에서는 “유의하다”는 문장만으로 부족합니다. 차이가 실무적으로 얼마나 큰 차이인지 함께 제시하십시오.", RED);
}

/* =============== Slide 25 : 분석 결과 해석 1/2 =============== */
{
  const s = slideBase(false);
  header(s, "3-4  RESULTS  (1/2)", "실전 예시: 실제 분석 결과 해석");
  s.addText("2025년 신병 정신전력교육 성과 분석 데이터", {
    x: M, y: 1.5, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 12.5, italic: true, color: GREY });

  s.addText("1. 기술통계 해석 — 교육 전후 수준 및 성취도 향상", {
    x: M, y: 1.9, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: NAVY });
  const stats = [
    { t: "정신전력 수준", a: "3.84", b: "4.16", u: "점 (5점 만점)", d: "교육 전 T1 → 교육 후 T3" },
    { t: "학업 성취도", a: "9.26", b: "15.03", u: "점", d: "지식·이해도가 급격히 성장" }
  ];
  const sw = (W - 2 * M - 0.35) / 2;
  stats.forEach((st, i) => {
    const x = M + i * (sw + 0.35);
    card(s, x, 2.3, sw, 1.65, i === 0 ? NAVY : SOFT);
    const fg = i === 0 ? "FFFFFF" : NAVY;
    s.addText(st.t, { x: x + 0.3, y: 2.44, w: sw - 0.6, h: 0.3, margin: 0,
      fontFace: BF, fontSize: 13, bold: true, color: i === 0 ? GOLD : NAVY });
    s.addText([
      { text: st.a, options: { fontSize: 26, bold: true, color: i === 0 ? ICE : GREY } },
      { text: "   →   ", options: { fontSize: 17, color: GOLD } },
      { text: st.b, options: { fontSize: 34, bold: true, color: i === 0 ? "FFFFFF" : NAVY } },
      { text: "  " + st.u, options: { fontSize: 12, color: i === 0 ? ICE : GREY } }
    ], { x: x + 0.3, y: 2.76, w: sw - 0.6, h: 0.72, margin: 0, valign: "middle", fontFace: HF });
    s.addText(st.d, { x: x + 0.3, y: 3.5, w: sw - 0.6, h: 0.3, margin: 0,
      fontFace: BF, fontSize: 11.5, color: i === 0 ? ICE : GREY });
  });

  s.addText("2. 반복측정 ANOVA 결과", { x: M, y: 4.12, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: NAVY });
  card(s, M, 4.5, W - 2 * M, 1.75, "FFFFFF");
  s.addShape(pres.ShapeType.roundRect, { x: M + 0.3, y: 4.72, w: 2.6, h: 1.3, rectRadius: 0.08,
    fill: { color: NAVY }, line: { color: NAVY, width: 0 } });
  s.addText([
    { text: "F = 84.96", options: { fontSize: 21, bold: true, color: "FFFFFF", breakLine: true } },
    { text: "p < .001", options: { fontSize: 15, bold: true, color: GOLD } }
  ], { x: M + 0.3, y: 4.72, w: 2.6, h: 1.3, margin: 0, align: "center", valign: "middle", fontFace: HF });
  s.addText([
    { text: "T1(입소) → T2(체감·실감형 직후) → T3(교육 종료) → T5(신병교육 수료)로 추적한 결과, 시점별 정신전력 점수가 통계적으로 유의한 차이를 보였습니다.", options: { breakLine: true } },
    { text: "해석 — 일회성 상승이 아니라, 5주차 수료 시점까지 4점 이상이 굳건히 유지됨을 과학적으로 입증하였습니다.", options: { bold: true, color: NAVY } }
  ], { x: M + 3.15, y: 4.72, w: W - M - (M + 3.15) - 0.3, h: 1.3, margin: 0, valign: "middle",
    fontFace: BF, fontSize: 12.5, color: INK, paraSpaceAfter: 8, lineSpacing: 18 });
}

/* =============== Slide 26 : 분석 결과 해석 2/2 =============== */
{
  const s = slideBase(false);
  header(s, "3-4  RESULTS  (2/2)", "실전 예시: 실제 분석 결과 해석");

  const cw = (W - 2 * M - 0.4) / 2;
  card(s, M, 1.62, cw, 4.6, NAVY);
  s.addText("3. 교육효과 지수 산출 (가중치 적용)", {
    x: M + 0.3, y: 1.82, w: cw - 0.6, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: GOLD });
  s.addText("결과 지표와 과정 지표를 혼합하여 종합 지수를 개발했습니다.", {
    x: M + 0.3, y: 2.18, w: cw - 0.6, h: 0.3, margin: 0,
    fontFace: BF, fontSize: 12, color: ICE });
  const wts = [["정신전력 향상도 (결과)", 50], ["교육수단 반응 (과정)", 30], ["세부요소 (학습동기 등)", 20]];
  wts.forEach((w2, i) => {
    const y = 2.6 + i * 0.62;
    s.addText(w2[0], { x: M + 0.3, y, w: cw * 0.55, h: 0.42, margin: 0, valign: "middle",
      fontFace: BF, fontSize: 12, color: "FFFFFF" });
    const bx = M + 0.3 + cw * 0.56, bwMax = cw - 0.6 - cw * 0.56 - 0.65;
    s.addShape(pres.ShapeType.roundRect, { x: bx, y: y + 0.11, w: bwMax, h: 0.2, rectRadius: 0.05,
      fill: { color: NAVY_D }, line: { color: NAVY_D, width: 0 } });
    s.addShape(pres.ShapeType.roundRect, { x: bx, y: y + 0.11, w: bwMax * w2[1] / 50, h: 0.2,
      rectRadius: 0.05, fill: { color: GOLD }, line: { color: GOLD, width: 0 } });
    s.addText(w2[1] + "%", { x: bx + bwMax + 0.08, y, w: 0.6, h: 0.42, margin: 0, valign: "middle",
      fontFace: BF, fontSize: 12, bold: true, color: GOLD });
  });
  s.addShape(pres.ShapeType.roundRect, { x: M + 0.3, y: 4.55, w: cw - 0.6, h: 1.45, rectRadius: 0.08,
    fill: { color: NAVY_D }, line: { color: "3A4680", width: 1 } });
  s.addText("최종 신병 교육효과 지수", { x: M + 0.3, y: 4.7, w: cw - 0.6, h: 0.3, margin: 0,
    align: "center", fontFace: BF, fontSize: 12, color: ICE });
  s.addText("82.9점", { x: M + 0.3, y: 4.96, w: cw - 0.6, h: 0.68, margin: 0,
    align: "center", fontFace: HF, fontSize: 32, bold: true, color: GOLD });
  s.addText("성과 측정의 표준화", { x: M + 0.3, y: 5.64, w: cw - 0.6, h: 0.3, margin: 0,
    align: "center", fontFace: BF, fontSize: 11.5, color: ICE });

  const x2 = M + cw + 0.4;
  card(s, x2, 1.62, cw, 4.6, SOFT);
  s.addText("4. 잠재집단분석(LPA)을 통한 맞춤형 전략 도출", {
    x: x2 + 0.3, y: 1.82, w: cw - 0.6, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: NAVY });
  s.addText("훈련병의 정신전력 수준에 따라 4개 집단으로 분류하였습니다.", {
    x: x2 + 0.3, y: 2.16, w: cw - 0.6, h: 0.4, margin: 0,
    fontFace: BF, fontSize: 11.5, color: GREY });
  s.addShape(pres.ShapeType.roundRect, { x: x2 + 0.3, y: 2.6, w: cw - 0.6, h: 1.3, rectRadius: 0.08,
    fill: { color: "FFFFFF" }, line: { color: RED, width: 1.5 } });
  s.addText([
    { text: "15.8%", options: { fontSize: 30, bold: true, color: RED, fontFace: HF } },
    { text: "   저수준 집단", options: { fontSize: 14, bold: true, color: NAVY, fontFace: BF } }
  ], { x: x2 + 0.5, y: 2.72, w: cw - 1.0, h: 0.55, margin: 0, valign: "middle" });
  s.addText("‘필승의 신념’, ‘사기·단결’ 등 핵심 요소가 매우 취약한 것으로 나타남", {
    x: x2 + 0.5, y: 3.28, w: cw - 1.0, h: 0.52, margin: 0,
    fontFace: BF, fontSize: 12, color: INK, lineSpacing: 16 });
  s.addShape(pres.ShapeType.roundRect, { x: x2 + 0.3, y: 4.05, w: cw - 0.6, h: 1.95, rectRadius: 0.08,
    fill: { color: NAVY }, line: { color: NAVY, width: 0 } });
  s.addText("정책적 제언", { x: x2 + 0.55, y: 4.22, w: cw - 1.1, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 13, bold: true, color: GOLD });
  s.addText("저수준 집단을 끌어올리려면 일방적 강의보다, 정서적 공감 중심의 관리와 작은 성취 미션 경험이 필수적임을 도출하였습니다. 분석이 곧 지휘 결심의 근거가 된 사례입니다.", {
    x: x2 + 0.55, y: 4.56, w: cw - 1.1, h: 1.3, margin: 0,
    fontFace: BF, fontSize: 12.5, color: ICE, lineSpacing: 18 });
}

/* =============== Slide 27 : 정리 및 Q&A =============== */
{
  const s = slideBase(true);
  s.addShape(pres.ShapeType.ellipse, { x: 10.2, y: -1.9, w: 5.2, h: 5.2,
    fill: { color: "2B3A7A" }, line: { color: "2B3A7A", width: 0 } });
  s.addText("3-5  WRAP-UP & Q&A", { x: M, y: 0.62, w: W - 2 * M, h: 0.3, margin: 0,
    fontFace: BF, fontSize: 12.5, bold: true, color: GOLD, charSpacing: 2 });
  s.addText("정리 및 Q&A", { x: M, y: 0.98, w: W - 2 * M, h: 0.72, margin: 0,
    fontFace: HF, fontSize: 34, bold: true, color: "FFFFFF" });

  const sum = [
    ["데이터", "연구는 감(Feeling)이 아닌 데이터(Data)에 기반해야 합니다"],
    ["설계", "명확한 문제와 가설 설정이 전체 조사의 질을 결정합니다"],
    ["측정", "타당하고 신뢰할 수 있는 설문지를 개발하십시오 (파일럿 테스트 필수)"],
    ["해석", "적절한 통계 분석으로 지휘 결심에 도움이 되는 인과관계와 시사점을 도출하십시오"]
  ];
  const cw = (W - 2 * M - 3 * 0.28) / 4;
  sum.forEach((t, i) => {
    const x = M + i * (cw + 0.28);
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.95, w: cw, h: 1.85, rectRadius: 0.08,
      fill: { color: NAVY_D }, line: { color: "3A4680", width: 1 } });
    badge(s, x + 0.24, 2.16, 0.44, String(i + 1), GOLD, NAVY_D);
    s.addText(t[0], { x: x + 0.24, y: 2.7, w: cw - 0.48, h: 0.3, margin: 0,
      fontFace: BF, fontSize: 13, bold: true, color: GOLD });
    s.addText(t[1], { x: x + 0.24, y: 3.02, w: cw - 0.48, h: 0.7, margin: 0,
      fontFace: BF, fontSize: 11.5, color: ICE, lineSpacing: 16 });
  });

  s.addText("“훌륭한 지휘관은 상황을 정확히 진단하고 올바른 결정을 내립니다.\n체계적인 조사연구방법론은 여러분이 내릴 결심의 가장 든든한 무기가 될 것입니다.”", {
    x: M, y: 4.15, w: W - 2 * M, h: 1.0, margin: 0, align: "center",
    fontFace: HF, fontSize: 17, italic: true, color: "FFFFFF", lineSpacing: 28 });

  s.addShape(pres.ShapeType.roundRect, { x: W / 2 - 2.2, y: 5.4, w: 4.4, h: 0.72, rectRadius: 0.12,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 } });
  s.addText("Q & A  질의응답", { x: W / 2 - 2.2, y: 5.4, w: 4.4, h: 0.72, margin: 0,
    align: "center", valign: "middle", fontFace: BF, fontSize: 17, bold: true, color: NAVY_D });
  s.addText("경청해 주셔서 감사합니다. 질문 있으신 분은 자유롭게 말씀해 주십시오.", {
    x: M, y: 6.3, w: W - 2 * M, h: 0.34, margin: 0, align: "center",
    fontFace: BF, fontSize: 12.5, color: ICE });
  s.addNotes("요약 후 질의응답. 수강생 각자의 부대 현안을 연구문제 형태로 바꿔보게 하는 즉석 실습으로 마무리 가능.");
}

pres.writeFile({ fileName: "연구조사방법론_특강.pptx" }).then(f => console.log("saved:", f));
