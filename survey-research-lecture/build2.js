const T = require("./theme.js");
const { pres, NAVY, NAVY_D, ICE, GOLD, INK, GREY, LINE, SOFT, RED, GRN,
  HF, BF, W, H, M, slideBase, badge, card, header, tip, tableOpts, hrow, row, bullets, sectionSlide } = T;
pres.author = "학위논문 작성법 특강";
pres.title  = "학위논문 작성법 특강 — 조사연구를 중심으로";

/* =============== 1. 표지 =============== */
{
  const s = slideBase(true);
  s.addShape(pres.ShapeType.ellipse, { x: 9.9, y: -1.7, w: 5.4, h: 5.4,
    fill: { color: "2B3A7A" }, line: { color: "2B3A7A", width: 0 } });
  s.addShape(pres.ShapeType.ellipse, { x: 11.1, y: 3.5, w: 3.6, h: 3.6,
    fill: { color: "16205A" }, line: { color: "16205A", width: 0 } });
  s.addText("HOW TO WRITE A MASTER'S THESIS", {
    x: M, y: 1.2, w: 8.4, h: 0.35, margin: 0,
    fontFace: BF, fontSize: 12.5, bold: true, color: GOLD, charSpacing: 2 });
  s.addText("학위논문 작성법 특강", {
    x: M, y: 1.66, w: 8.6, h: 1.05, margin: 0,
    fontFace: HF, fontSize: 46, bold: true, color: "FFFFFF" });
  s.addText("조사연구(Survey Research)를 중심으로 — 석사급 학위논문 작성의 실제", {
    x: M, y: 2.78, w: 8.6, h: 0.45, margin: 0,
    fontFace: BF, fontSize: 16.5, color: ICE });
  const info = [
    ["대상", "지휘참모 2과정 2기 해군소령 61명"],
    ["시간", "16:45 ~ 17:30 (45분, 8교시)"],
    ["구성", "구조 → 서론 → 이론적 배경 → 연구방법 → 결과·논의 → 실무 팁"],
    ["강사", "(강사 이름)"]
  ];
  info.forEach((it, i) => {
    const y = 3.7 + i * 0.62;
    s.addText(it[0], { x: M, y, w: 1.0, h: 0.45, margin: 0, valign: "middle",
      fontFace: BF, fontSize: 12.5, bold: true, color: GOLD });
    s.addText(it[1], { x: M + 1.05, y, w: 7.4, h: 0.45, margin: 0, valign: "middle",
      fontFace: BF, fontSize: 13.5, color: "FFFFFF" });
  });
  s.addNotes("7교시 조사연구방법론 특강의 후속. 방법론을 '논문이라는 형식'에 담는 법이 오늘의 주제임을 예고.");
}

/* =============== 2. 목차 =============== */
{
  const s = slideBase(false);
  header(s, "CONTENTS", "목차 · 45분 운영 계획");
  const items = [
    ["1", "학위논문의 전체 구조", "6장 체제와 실무 보고서와의 차이", "8분"],
    ["2", "서론 작성법", "필요성·목적·연구문제·용어 정의", "7분"],
    ["3", "이론적 배경 작성법", "비판적 종합과 연구모형 도출", "7분"],
    ["4", "연구방법 작성법", "재현 가능성을 확보하는 기술", "7분"],
    ["5", "결과 및 논의·결론", "데이터가 말하게 하는 글쓰기", "7분"],
    ["6", "작성 실무 팁", "APA·흔한 실수·연구윤리와 AI", "5분"],
    ["7", "Q&A 및 마무리", "질의응답", "4분"]
  ];
  const cw = (W - 2 * M - 0.35) / 2;
  items.forEach((it, i) => {
    const col = i < 4 ? 0 : 1, k = i < 4 ? i : i - 4;
    const x = M + col * (cw + 0.35), y = 1.72 + k * 1.14;
    card(s, x, y, cw, 0.98, i === 0 ? NAVY : SOFT);
    const dark = i === 0;
    badge(s, x + 0.24, y + 0.24, 0.5, it[0], dark ? GOLD : NAVY, dark ? NAVY_D : "FFFFFF");
    s.addText(it[1], { x: x + 0.92, y: y + 0.14, w: cw - 2.0, h: 0.38, margin: 0,
      valign: "middle", fontFace: BF, fontSize: 14.5, bold: true, color: dark ? "FFFFFF" : NAVY });
    s.addText(it[2], { x: x + 0.92, y: y + 0.5, w: cw - 2.0, h: 0.34, margin: 0,
      fontFace: BF, fontSize: 11.5, color: dark ? ICE : GREY });
    s.addShape(pres.ShapeType.roundRect, { x: x + cw - 0.98, y: y + 0.29, w: 0.74, h: 0.4,
      rectRadius: 0.07, fill: { color: dark ? NAVY_D : "FFFFFF" },
      line: { color: dark ? "3A4680" : LINE, width: 1 } });
    s.addText(it[3], { x: x + cw - 0.98, y: y + 0.29, w: 0.74, h: 0.4, margin: 0,
      align: "center", valign: "middle", fontFace: BF, fontSize: 11.5, bold: true,
      color: dark ? GOLD : NAVY });
  });
  s.addText("7교시에서 배운 조사연구 방법론을, 오늘은 ‘논문이라는 형식’에 담는 방법을 다룹니다.", {
    x: M + cw + 0.35, y: 5.15, w: cw, h: 0.8, margin: 0,
    fontFace: BF, fontSize: 12.5, italic: true, color: GREY, lineSpacing: 18 });
}

/* =============== 3. 학위논문의 전체 구조 =============== */
{
  const s = slideBase(false);
  header(s, "1  THESIS STRUCTURE", "학위논문의 전체 구조");
  s.addText("석사급 조사연구(Survey Research) 학위논문은 일반적으로 6장 체제를 따릅니다.", {
    x: M, y: 1.5, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 13, color: GREY });
  const rows = [
    hrow(["장 (Chapter)", "핵심 역할", "분량 비중"]),
    row(["제1장  서론", "연구의 필요성 및 목적, 문제 제기", "10%"]),
    row(["제2장  이론적 배경", "선행연구 검토, 연구모형 및 가설 도출", "25%"]),
    row(["제3장  연구방법", "연구설계, 표본, 측정도구(설문), 분석방법", "15%"]),
    row(["제4장  연구결과", "수집된 데이터 분석 결과 (가설 검증)", "25%"]),
    row(["제5장  논의", "결과 해석, 선행연구와의 비교, 시사점", "15%"]),
    row(["제6장  결론", "연구 요약, 한계점 및 제언", "10%"])
  ];
  rows.forEach((r, i) => { if (i > 0) { r[2].options.align = "center"; r[2].options.bold = true;
    r[2].options.color = NAVY; } });
  s.addTable(rows, tableOpts([3.0, 6.9, 2.0], { y: 1.95, rowH: 0.5 }));
  card(s, M, 5.5, W - 2 * M, 1.05, NAVY);
  s.addText("2장과 4장이 전체의 절반 — 이론적 배경과 결과가 논문의 무게중심입니다.", {
    x: M + 0.35, y: 5.62, w: W - 2 * M - 0.7, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 13.5, bold: true, color: GOLD });
  s.addText("서론과 결론은 짧지만 심사위원이 가장 먼저·가장 마지막으로 읽는 부분입니다. 분량은 적어도 공은 가장 많이 들이십시오.", {
    x: M + 0.35, y: 5.96, w: W - 2 * M - 0.7, h: 0.4, margin: 0,
    fontFace: BF, fontSize: 12.5, color: ICE });
}

/* =============== 4. 학위논문 vs 실무 보고서 =============== */
{
  const s = slideBase(false);
  header(s, "1  THESIS vs. FIELD REPORT", "학위논문 vs. 실무 보고서");
  const cw = (W - 2 * M - 0.4) / 2;
  card(s, M, 1.68, cw, 3.5, SOFT);
  s.addText("실무 정책 보고서", { x: M + 0.3, y: 1.88, w: cw - 0.6, h: 0.38, margin: 0,
    fontFace: HF, fontSize: 20, bold: true, color: NAVY });
  s.addText("장병 인성교육 · 정신전력교육 보고서 목차 예시", {
    x: M + 0.3, y: 2.28, w: cw - 0.6, h: 0.3, margin: 0,
    fontFace: BF, fontSize: 11.5, italic: true, color: GOLD });
  ["연구목적 및 필요성", "이론적 배경 (인성교육, 평가 프로그램)", "연구방법 (연구설계, 설문, 분석)",
   "연구결과 (운영성과 분석, 효과성 평가)", "요약 및 제언"].forEach((t, i) => {
    const y = 2.7 + i * 0.46;
    badge(s, M + 0.3, y, 0.32, String(i + 1), NAVY);
    s.addText(t, { x: M + 0.76, y, w: cw - 1.06, h: 0.32, margin: 0, valign: "middle",
      fontFace: BF, fontSize: 12.5, color: INK });
  });

  const x2 = M + cw + 0.4;
  card(s, x2, 1.68, cw, 3.5, NAVY);
  s.addText("학위논문", { x: x2 + 0.3, y: 1.88, w: cw - 0.6, h: 0.38, margin: 0,
    fontFace: HF, fontSize: 20, bold: true, color: "FFFFFF" });
  s.addText("동일한 데이터라도 학문적 엄밀성이 요구되는 지점", {
    x: x2 + 0.3, y: 2.28, w: cw - 0.6, h: 0.3, margin: 0,
    fontFace: BF, fontSize: 11.5, italic: true, color: GOLD });
  const th = [["이론적 배경", "검증된 이론적 틀 위에 연구모형을 세우고 가설을 도출"],
    ["논의(Discussion)", "결과가 왜 그렇게 나왔는지 선행연구와 비교해 해석"],
    ["학문적 기여", "정책 제언에 더해, 학문 영역에 무엇을 더했는지 진술"]];
  th.forEach((t, i) => {
    const y = 2.7 + i * 0.78;
    s.addShape(pres.ShapeType.roundRect, { x: x2 + 0.3, y, w: cw - 0.6, h: 0.66,
      rectRadius: 0.07, fill: { color: NAVY_D }, line: { color: "3A4680", width: 1 } });
    s.addText(t[0], { x: x2 + 0.48, y: y + 0.05, w: cw - 0.96, h: 0.28, margin: 0,
      fontFace: BF, fontSize: 12.5, bold: true, color: GOLD });
    s.addText(t[1], { x: x2 + 0.48, y: y + 0.31, w: cw - 0.96, h: 0.33, margin: 0,
      fontFace: BF, fontSize: 10.5, color: ICE });
  });
  tip(s, 5.42, "실무 보고서는 ‘결과와 정책 제언’에 집중하지만, 학위논문은 이론적 배경(Theoretical Framework)과 논의(Discussion)가 학문적으로 훨씬 깊이 있고 엄밀해야 합니다.", RED);
}

/* =============== 5. 서론 작성법 =============== */
{
  const s = slideBase(false);
  header(s, "2  INTRODUCTION", "서론(Introduction) 작성법");
  s.addText("서론은 독자(심사위원)를 설득하는 첫 단계입니다.", {
    x: M, y: 1.5, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 13, color: GREY });
  const blocks = [
    { t: "연구의 필요성", q: "왜 이 연구가 필요한가?", dark: true, lines: [
      "사회적·실무적 필요성 — 군내 사고 예방, 정신전력 강화 등",
      "학문적 필요성 — 기존 연구의 한계점 극복"] },
    { t: "연구 목적", q: "무엇을 밝힐 것인가?", dark: false, lines: [
      "명확하고 구체적인 한 문장으로 기술",
      "연구 문제(Research Questions)와 가설(Hypotheses)로 구체화"] },
    { t: "범위와 정의", q: "어디까지가 이 연구인가?", dark: false, lines: [
      "연구의 범위와 제한점을 솔직하게 명시",
      "주요 개념의 조작적 정의(Operational Definition) 제시"] }
  ];
  const cw = (W - 2 * M - 0.6) / 3;
  blocks.forEach((b, i) => {
    const x = M + i * (cw + 0.3);
    card(s, x, 1.95, cw, 3.5, b.dark ? NAVY : SOFT);
    const fg = b.dark ? "FFFFFF" : NAVY;
    badge(s, x + 0.3, 2.2, 0.5, String(i + 1), b.dark ? GOLD : NAVY, b.dark ? NAVY_D : "FFFFFF");
    s.addText(b.t, { x: x + 0.3, y: 2.86, w: cw - 0.6, h: 0.4, margin: 0,
      fontFace: HF, fontSize: 20, bold: true, color: fg });
    s.addText("“" + b.q + "”", { x: x + 0.3, y: 3.26, w: cw - 0.6, h: 0.32, margin: 0,
      fontFace: BF, fontSize: 12, italic: true, color: GOLD });
    s.addText(b.lines.map((t, k) => ({ text: t, options: {
      bullet: { indent: 13 }, breakLine: k !== b.lines.length - 1 } })), {
      x: x + 0.3, y: 3.68, w: cw - 0.6, h: 1.6, margin: 0,
      fontFace: BF, fontSize: 12.5, color: b.dark ? ICE : INK,
      paraSpaceAfter: 9, lineSpacing: 18 });
  });
  tip(s, 5.68, "서론의 마지막 문단은 “본 연구는 …을 밝히고자 한다”로 끝나야 합니다. 여기서 제시한 목적이 결론에서 그대로 답변되어야 합니다.");
}

/* =============== 6. 서론 작성 예시 =============== */
{
  const s = slideBase(false);
  header(s, "2  EXAMPLE", "군사 분야 서론 작성 예시");
  s.addText("같은 주제라도 목적 기술의 구체성이 논문의 수준을 가릅니다.", {
    x: M, y: 1.5, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 13, color: GREY });

  card(s, M, 1.95, W - 2 * M, 1.5, "FFFFFF");
  s.addShape(pres.ShapeType.roundRect, { x: M + 0.3, y: 2.18, w: 2.1, h: 0.44,
    rectRadius: 0.08, fill: { color: RED }, line: { color: RED, width: 0 } });
  s.addText("잘못된 기술 ✕", { x: M + 0.3, y: 2.18, w: 2.1, h: 0.44, margin: 0,
    align: "center", valign: "middle", fontFace: BF, fontSize: 12.5, bold: true, color: "FFFFFF" });
  s.addText("“본 연구는 해군 장병들의 사기 진작 방안을 알아보고자 한다.”", {
    x: M + 2.65, y: 2.14, w: W - 2 * M - 2.95, h: 0.5, margin: 0, valign: "middle",
    fontFace: BF, fontSize: 15, color: INK });
  s.addText("무엇을, 누구에게, 어떤 변수로 볼지가 전혀 드러나지 않습니다. 이 문장으로는 분석 계획을 세울 수 없습니다.", {
    x: M + 2.65, y: 2.7, w: W - 2 * M - 2.95, h: 0.4, margin: 0,
    fontFace: BF, fontSize: 12, color: GREY });

  card(s, M, 3.62, W - 2 * M, 2.35, NAVY);
  s.addShape(pres.ShapeType.roundRect, { x: M + 0.3, y: 3.86, w: 2.1, h: 0.44,
    rectRadius: 0.08, fill: { color: GRN }, line: { color: GRN, width: 0 } });
  s.addText("잘된 기술 ○", { x: M + 0.3, y: 3.86, w: 2.1, h: 0.44, margin: 0,
    align: "center", valign: "middle", fontFace: BF, fontSize: 12.5, bold: true, color: "FFFFFF" });
  s.addText([
    { text: "“본 연구의 목적은 해군 함정 근무 장병의 " },
    { text: "직무 스트레스(Job Stress)", options: { bold: true, color: GOLD } },
    { text: "가 " },
    { text: "조직 몰입(Organizational Commitment)", options: { bold: true, color: GOLD } },
    { text: "에 미치는 영향을 파악하고, 이 과정에서 " },
    { text: "지휘관의 변혁적 리더십(Transformational Leadership)이 갖는 조절효과", options: { bold: true, color: GOLD } },
    { text: "를 검증하는 데 있다.”" }
  ], { x: M + 2.65, y: 3.8, w: W - 2 * M - 2.95, h: 1.1, margin: 0,
    fontFace: BF, fontSize: 14, color: "FFFFFF", lineSpacing: 22 });
  const tags = [["대상", "해군 함정 근무 장병"], ["독립변수", "직무 스트레스"],
    ["종속변수", "조직 몰입"], ["조절변수", "변혁적 리더십"]];
  const tw = (W - 2 * M - 2.95 - 3 * 0.22) / 4;
  tags.forEach((t, i) => {
    const x = M + 2.65 + i * (tw + 0.22);
    s.addShape(pres.ShapeType.roundRect, { x, y: 5.0, w: tw, h: 0.72, rectRadius: 0.07,
      fill: { color: NAVY_D }, line: { color: "3A4680", width: 1 } });
    s.addText([
      { text: t[0], options: { fontSize: 10.5, color: GOLD, breakLine: true } },
      { text: t[1], options: { fontSize: 12, bold: true, color: "FFFFFF" } }
    ], { x, y: 5.0, w: tw, h: 0.72, margin: 0, align: "center", valign: "middle", fontFace: BF });
  });
  s.addText("목적 문장 하나에 대상·변수·검증할 관계가 모두 들어 있으면, 3장 연구방법은 저절로 써집니다.", {
    x: M, y: 6.12, w: W - 2 * M, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 12, italic: true, color: GREY });
}

/* =============== 7. 이론적 배경 작성법 =============== */
{
  const s = slideBase(false);
  header(s, "3  THEORETICAL BACKGROUND", "이론적 배경 작성법");
  card(s, M, 1.6, W - 2 * M, 0.8, NAVY);
  s.addText("단순한 ‘개념 나열’이 아닌, 비판적 종합(Critical Synthesis)이 필요합니다.", {
    x: M, y: 1.6, w: W - 2 * M, h: 0.8, margin: 0, align: "center", valign: "middle",
    fontFace: BF, fontSize: 15, bold: true, color: "FFFFFF" });

  const steps = [
    ["선행연구 검토", "기존 연구의 동향과 한계점을 파악합니다"],
    ["이론적 틀 설정", "연구의 뼈대가 되는 이론을 선택합니다"],
    ["연구모형 도출", "변수 간의 관계를 시각화하고 가설로 진술합니다"]
  ];
  const cw = (W - 2 * M - 2 * 0.55) / 3;
  steps.forEach((st, i) => {
    const x = M + i * (cw + 0.55);
    card(s, x, 2.62, cw, 1.5, SOFT);
    badge(s, x + 0.28, 2.86, 0.46, String(i + 1), NAVY);
    s.addText(st[0], { x: x + 0.88, y: 2.84, w: cw - 1.16, h: 0.34, margin: 0,
      valign: "middle", fontFace: BF, fontSize: 14.5, bold: true, color: NAVY });
    s.addText(st[1], { x: x + 0.28, y: 3.34, w: cw - 0.56, h: 0.62, margin: 0,
      fontFace: BF, fontSize: 12, color: INK, lineSpacing: 16 });
    if (i < 2) s.addShape(pres.ShapeType.rightArrow, { x: x + cw + 0.12, y: 3.24, w: 0.3, h: 0.26,
      fill: { color: GOLD }, line: { color: GOLD, width: 0 } });
  });

  card(s, M, 4.32, W - 2 * M, 2.05, "FFFFFF");
  s.addText("실제 보고서 예시 — 2022 인성교육 · 2025 정신전력교육 평가 연구", {
    x: M + 0.32, y: 4.48, w: W - 2 * M - 0.64, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 13.5, bold: true, color: GOLD });
  const models = [
    ["CIPP 평가모형", "Stufflebeam, 1971", "상황(Context) · 투입(Input) · 과정(Process) · 산출(Product)"],
    ["Kirkpatrick 평가모형", "4단계 모형", "1단계 반응 → 2단계 학습 → 3단계 행동 → 4단계 결과"]
  ];
  const mw = (W - 2 * M - 0.64 - 0.3) / 2;
  models.forEach((m, i) => {
    const x = M + 0.32 + i * (mw + 0.3);
    s.addShape(pres.ShapeType.roundRect, { x, y: 4.88, w: mw, h: 0.95, rectRadius: 0.08,
      fill: { color: i === 0 ? NAVY : SOFT }, line: { color: i === 0 ? NAVY : LINE, width: 1 } });
    s.addText([
      { text: m[0] + "  ", options: { fontSize: 13.5, bold: true, color: i === 0 ? "FFFFFF" : NAVY } },
      { text: "(" + m[1] + ")", options: { fontSize: 10.5, color: i === 0 ? ICE : GREY } }
    ], { x: x + 0.24, y: 4.96, w: mw - 0.48, h: 0.3, margin: 0, fontFace: BF });
    s.addText(m[2], { x: x + 0.24, y: 5.28, w: mw - 0.48, h: 0.46, margin: 0,
      fontFace: BF, fontSize: 11.5, color: i === 0 ? ICE : INK });
  });
  s.addText("검증된 이론적 틀을 기반으로 본인의 연구모형을 설계해야 합니다.", {
    x: M, y: 6.45, w: W - 2 * M, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 12, italic: true, color: GREY });
}

/* =============== 8. 선행연구 정리표 =============== */
{
  const s = slideBase(false);
  header(s, "3  LITERATURE MATRIX", "선행연구 정리표 활용 팁");
  s.addText("관련 논문을 읽을 때마다 아래와 같은 표로 정리해 두면, 2장 집필이 ‘요약’이 아니라 ‘조립’이 됩니다.", {
    x: M, y: 1.5, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 13, color: GREY });
  const rows = [
    hrow(["저자(연도)", "연구 대상", "독립변수", "종속변수", "주요 결과", "본 연구와의 차별성"]),
    row(["홍길동(2021)", "육군 초급간부", "리더십 유형", "직무만족도",
      "변혁적 리더십이 유의한 정(+)의 영향", "육군 중심 연구 — 본 연구는 해군"]),
    row(["김해군(2023)", "해군 부사관", "조직문화", "이직의도",
      "보수적 문화가 이직의도를 상승시킴", "부사관 대상 — 본 연구는 ‘장교’"])
  ];
  s.addTable(rows, tableOpts([1.75, 1.65, 1.45, 1.4, 3.0, 2.65], { y: 1.95, rowH: 0.95 }));

  card(s, M, 4.2, W - 2 * M, 2.1, NAVY);
  s.addText("정리표가 그대로 논문이 되는 지점", {
    x: M + 0.35, y: 4.38, w: W - 2 * M - 0.7, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: GOLD });
  const uses = [
    ["변수 선정 근거", "선행연구에서 반복 검증된 변수를 내 모형에 채택합니다"],
    ["측정도구 확보", "어떤 척도를 누가 썼는지 한눈에 보여 출처 명시가 쉬워집니다"],
    ["차별성 진술", "마지막 열이 곧 서론의 ‘연구의 필요성’ 문단이 됩니다"]
  ];
  const uw = (W - 2 * M - 0.7 - 2 * 0.3) / 3;
  uses.forEach((u, i) => {
    const x = M + 0.35 + i * (uw + 0.3);
    s.addShape(pres.ShapeType.roundRect, { x, y: 4.8, w: uw, h: 1.3, rectRadius: 0.08,
      fill: { color: NAVY_D }, line: { color: "3A4680", width: 1 } });
    s.addText(u[0], { x: x + 0.22, y: 4.94, w: uw - 0.44, h: 0.32, margin: 0,
      fontFace: BF, fontSize: 13, bold: true, color: GOLD });
    s.addText(u[1], { x: x + 0.22, y: 5.28, w: uw - 0.44, h: 0.72, margin: 0,
      fontFace: BF, fontSize: 11.5, color: ICE, lineSpacing: 16 });
  });
}

/* =============== 9. 연구방법 작성법 =============== */
{
  const s = slideBase(false);
  header(s, "4  METHODOLOGY", "연구방법(Methodology) 작성법");
  card(s, M, 1.6, W - 2 * M, 0.8, NAVY);
  s.addText("조사연구의 핵심은 재현 가능성(Reproducibility) — 제3자가 이 장만 읽고 동일한 조사를 재현할 수 있어야 합니다.", {
    x: M, y: 1.6, w: W - 2 * M, h: 0.8, margin: 0, align: "center", valign: "middle",
    fontFace: BF, fontSize: 14, bold: true, color: "FFFFFF" });
  const items = [
    { t: "연구설계", e: "Research Design", lines: ["양적 연구, 횡단적 조사 등 설계 유형과 그 선택 이유"] },
    { t: "모집단과 표본", e: "Population & Sample", lines: ["표집 방법(Sampling)", "표본 크기(N)와 그 산출 근거"] },
    { t: "측정도구", e: "Instruments", lines: ["설문지 구성, 문항 수, 척도(예: Likert 5점)", "출처 명시 필수 — 기존 검증 척도 활용 권장"] },
    { t: "타당도·신뢰도", e: "Validity & Reliability", lines: ["요인분석 결과", "Cronbach’s α 값 제시"] },
    { t: "자료분석 방법", e: "Analysis", lines: ["SPSS, AMOS 등 사용 도구와 분석 기법 기술"] }
  ];
  const cw = (W - 2 * M - 4 * 0.24) / 5;
  items.forEach((it, i) => {
    const x = M + i * (cw + 0.24);
    card(s, x, 2.62, cw, 3.05, i === 2 ? NAVY : SOFT);
    const dark = i === 2, fg = dark ? "FFFFFF" : NAVY;
    badge(s, x + cw / 2 - 0.23, 2.86, 0.46, String(i + 1), dark ? GOLD : NAVY, dark ? NAVY_D : "FFFFFF");
    s.addText(it.t, { x: x + 0.14, y: 3.44, w: cw - 0.28, h: 0.36, margin: 0, align: "center",
      fontFace: BF, fontSize: 13.5, bold: true, color: fg });
    s.addText(it.e, { x: x + 0.14, y: 3.8, w: cw - 0.28, h: 0.28, margin: 0, align: "center",
      fontFace: BF, fontSize: 10, color: GOLD });
    s.addText(it.lines.map((t, k) => ({ text: t, options: {
      bullet: { indent: 12 }, breakLine: k !== it.lines.length - 1 } })), {
      x: x + 0.2, y: 4.14, w: cw - 0.4, h: 1.4, margin: 0,
      fontFace: BF, fontSize: 11, color: dark ? ICE : INK, paraSpaceAfter: 7, lineSpacing: 15 });
  });
  tip(s, 5.88, "측정도구의 원출처 누락은 심사에서 가장 자주 지적되는 항목입니다. 문항을 빌려 왔다면 반드시 저자와 연도를 밝히십시오.", RED);
}

/* =============== 10. 연구방법 장 템플릿 =============== */
{
  const s = slideBase(false);
  header(s, "4  CHAPTER TEMPLATE", "조사연구 연구방법 장(Chapter) 작성 템플릿");
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 1.62, w: 2.5, h: 3.9, rectRadius: 0.1,
    fill: { color: NAVY }, line: { color: NAVY, width: 0 } });
  s.addText([
    { text: "제3장", options: { fontSize: 15, color: GOLD, breakLine: true } },
    { text: "연구방법", options: { fontSize: 26, bold: true, color: "FFFFFF" } }
  ], { x: M, y: 1.62, w: 2.5, h: 3.9, margin: 0, align: "center", valign: "middle", fontFace: HF });

  const secs = [
    { t: "제1절  연구모형 및 가설", subs: [] },
    { t: "제2절  조사대상 및 자료수집", subs: ["표집방법 — 층화표집 등", "설문지 배포 및 회수 절차"] },
    { t: "제3절  변수의 조작적 정의 및 측정도구", subs: ["독립·종속변수 척도의 출처", "신뢰도·타당도 검증 결과"] },
    { t: "제4절  분석 방법", subs: ["기술통계, t검정, 회귀분석 등"] }
  ];
  const sx = M + 3.1, sw = W - M - sx;
  let y = 1.62;
  secs.forEach((sc, i) => {
    const h = sc.subs.length ? 0.52 + sc.subs.length * 0.38 + 0.14 : 0.66;
    s.addShape(pres.ShapeType.roundRect, { x: sx, y, w: sw, h, rectRadius: 0.08,
      fill: { color: SOFT }, line: { color: LINE, width: 1 } });
    s.addShape(pres.ShapeType.line, { x: sx - 0.6, y: y + h / 2, w: 0.55, h: 0,
      line: { color: GOLD, width: 2, endArrowType: "triangle" } });
    s.addText(sc.t, { x: sx + 0.3, y: y + 0.1, w: sw - 0.6, h: 0.36, margin: 0,
      valign: "middle", fontFace: BF, fontSize: 14, bold: true, color: NAVY });
    sc.subs.forEach((sb, k) => {
      s.addText("—  " + sb, { x: sx + 0.55, y: y + 0.5 + k * 0.38, w: sw - 0.85, h: 0.34, margin: 0,
        valign: "middle", fontFace: BF, fontSize: 12, color: INK });
    });
    y += h + 0.2;
  });
  tip(s, 5.72, "이 절 구성은 대부분의 대학원 심사 양식과 호환됩니다. 목차를 먼저 확정하고 빈칸을 채워 나가면 집필 속도가 크게 붙습니다.");
}

/* =============== 11. 결과 작성법 =============== */
{
  const s = slideBase(false);
  header(s, "5  RESULTS", "결과(Results) 작성법");
  card(s, M, 1.6, W - 2 * M, 0.8, NAVY);
  s.addText("데이터가 말하게 하십시오. 주관적 해석은 ‘논의’ 장으로 미룹니다.", {
    x: M, y: 1.6, w: W - 2 * M, h: 0.8, margin: 0, align: "center", valign: "middle",
    fontFace: BF, fontSize: 15, bold: true, color: "FFFFFF" });
  const cw = (W - 2 * M - 0.35) / 2;
  card(s, M, 2.62, cw, 2.15, SOFT);
  s.addText("기술통계 (Descriptive)", { x: M + 0.3, y: 2.82, w: cw - 0.6, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 15, bold: true, color: NAVY });
  bullets(s, M + 0.3, 3.24, cw - 0.6, 1.35, [
    "표본의 일반적 특성 (계급·연령·복무기간 분포)",
    "주요 변수의 평균(M)과 표준편차(SD)"], 12.5);

  card(s, M + cw + 0.35, 2.62, cw, 2.15, SOFT);
  s.addText("추론통계 (Inferential)", { x: M + cw + 0.65, y: 2.82, w: cw - 0.6, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 15, bold: true, color: NAVY });
  bullets(s, M + cw + 0.65, 3.24, cw - 0.6, 1.35, [
    "t-test, ANOVA — 집단 간 차이 검증",
    "상관분석, 회귀분석 — 변수 간 관계와 영향력"], 12.5);

  card(s, M, 4.98, W - 2 * M, 1.5, NAVY);
  s.addText("표와 그림을 적극 활용하되, 본문은 핵심 수치만", {
    x: M + 0.35, y: 5.14, w: W - 2 * M - 0.7, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: GOLD });
  s.addText("표에 있는 숫자를 본문에서 그대로 되풀이하지 마십시오. 본문은 “무엇이 유의했고, 어느 방향이었는가”만 짚고, 세부 수치는 표가 담당하게 합니다.", {
    x: M + 0.35, y: 5.5, w: W - 2 * M - 0.7, h: 0.8, margin: 0,
    fontFace: BF, fontSize: 12.5, color: ICE, lineSpacing: 18 });
}

/* =============== 12. 결과 기술 방식 예시 =============== */
{
  const s = slideBase(false);
  header(s, "5  WRITING EXAMPLE", "결과 기술 방식 예시");
  s.addText("2025년 신병 정신전력교육 연구에서 인용", {
    x: M, y: 1.5, w: W - 2 * M, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 12.5, italic: true, color: GREY });

  card(s, M, 1.95, W - 2 * M, 2.15, NAVY);
  s.addShape(pres.ShapeType.roundRect, { x: M + 0.3, y: 2.18, w: 3.2, h: 0.44,
    rectRadius: 0.08, fill: { color: GRN }, line: { color: GRN, width: 0 } });
  s.addText("객관적이고 명확한 수치 제시 ○", { x: M + 0.3, y: 2.18, w: 3.2, h: 0.44, margin: 0,
    align: "center", valign: "middle", fontFace: BF, fontSize: 12, bold: true, color: "FFFFFF" });
  s.addText([
    { text: "“정신전력 수준은 교육 전(T1) 평균 " },
    { text: "3.84점", options: { bold: true, color: GOLD } },
    { text: "에서 교육 종료 시점(T3) 평균 " },
    { text: "4.16점", options: { bold: true, color: GOLD } },
    { text: "으로 향상되었다. t검정 결과" },
    { text: "(t = 9.75, p < .001)", options: { bold: true, color: GOLD } },
    { text: ", 이는 통계적으로 유의미한 차이이며, 신병 교육 수료 시점(T5)까지 효과가 유지됨을 확인하였다.”" }
  ], { x: M + 0.3, y: 2.78, w: W - 2 * M - 0.6, h: 1.15, margin: 0,
    fontFace: BF, fontSize: 14.5, color: "FFFFFF", lineSpacing: 24 });

  const cw = (W - 2 * M - 0.35) / 2;
  card(s, M, 4.3, cw, 1.95, "FFFFFF");
  s.addText("이렇게 쓰지 마십시오 ✕", { x: M + 0.3, y: 4.5, w: cw - 0.6, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: RED });
  bullets(s, M + 0.3, 4.9, cw - 0.6, 1.2, [
    "“점수가 엄청나게 올랐다” — 감정적·주관적 표현",
    "“…한 것으로 사료된다” — 결과 장에서의 추측성 서술"], 12.5);

  card(s, M + cw + 0.35, 4.3, cw, 1.95, SOFT);
  s.addText("반드시 포함할 것 ○", { x: M + cw + 0.65, y: 4.5, w: cw - 0.6, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 14, bold: true, color: GRN });
  bullets(s, M + cw + 0.65, 4.9, cw - 0.6, 1.2, [
    "검정통계량과 유의확률을 괄호 안에 제시 (t값, F값, p값)",
    "비교 시점·집단을 명시해 무엇과 무엇의 차이인지 분명히"], 12.5);
}

/* =============== 13. 논의 및 결론 =============== */
{
  const s = slideBase(false);
  header(s, "5  DISCUSSION & CONCLUSION", "논의(Discussion) 및 결론(Conclusion)");
  const cw = (W - 2 * M - 0.4) / 2;
  card(s, M, 1.68, cw, 4.05, NAVY);
  s.addText("제5장  논의", { x: M + 0.3, y: 1.9, w: cw - 0.6, h: 0.44, margin: 0,
    fontFace: HF, fontSize: 24, bold: true, color: "FFFFFF" });
  s.addText("“왜 이런 결과가 나왔는가?”", { x: M + 0.3, y: 2.36, w: cw - 0.6, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 12.5, italic: true, color: GOLD });
  [["의미 해석", "가설 검증 결과가 무엇을 뜻하는지 설명합니다"],
   ["선행연구와 비교", "기존 연구와 일치하는지, 상반되는지 따집니다"],
   ["시사점 도출", "이론적·실무적 시사점을 나누어 씁니다"]].forEach((t, i) => {
    const y = 2.8 + i * 0.9;
    s.addShape(pres.ShapeType.roundRect, { x: M + 0.3, y, w: cw - 0.6, h: 0.76, rectRadius: 0.07,
      fill: { color: NAVY_D }, line: { color: "3A4680", width: 1 } });
    s.addText(t[0], { x: M + 0.5, y: y + 0.08, w: cw - 1.0, h: 0.3, margin: 0,
      fontFace: BF, fontSize: 13, bold: true, color: GOLD });
    s.addText(t[1], { x: M + 0.5, y: y + 0.38, w: cw - 1.0, h: 0.32, margin: 0,
      fontFace: BF, fontSize: 11.5, color: ICE });
  });

  const x2 = M + cw + 0.4;
  card(s, x2, 1.68, cw, 4.05, SOFT);
  s.addText("제6장  결론", { x: x2 + 0.3, y: 1.9, w: cw - 0.6, h: 0.44, margin: 0,
    fontFace: HF, fontSize: 24, bold: true, color: NAVY });
  s.addText("“그래서 무엇을 알게 되었는가?”", { x: x2 + 0.3, y: 2.36, w: cw - 0.6, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 12.5, italic: true, color: GOLD });
  [["요약", "전체 연구의 핵심을 압축해 다시 진술합니다"],
   ["제언", "해군 정책 및 부대 관리를 위한 구체적 제언을 답니다"],
   ["한계와 후속 연구", "연구의 한계점과 후속 연구 방향을 제시합니다"]].forEach((t, i) => {
    const y = 2.8 + i * 0.9;
    s.addShape(pres.ShapeType.roundRect, { x: x2 + 0.3, y, w: cw - 0.6, h: 0.76, rectRadius: 0.07,
      fill: { color: "FFFFFF" }, line: { color: LINE, width: 1 } });
    s.addText(t[0], { x: x2 + 0.5, y: y + 0.08, w: cw - 1.0, h: 0.3, margin: 0,
      fontFace: BF, fontSize: 13, bold: true, color: NAVY });
    s.addText(t[1], { x: x2 + 0.5, y: y + 0.38, w: cw - 1.0, h: 0.32, margin: 0,
      fontFace: BF, fontSize: 11.5, color: GREY });
  });
  tip(s, 5.95, "한계점을 숨기지 마십시오. 한계를 정확히 아는 연구자가 결과도 정확히 해석합니다 — 심사위원이 보는 것도 그 지점입니다.");
}

/* =============== 14. 작성 실무 팁 =============== */
{
  const s = slideBase(false);
  header(s, "6  PRACTICAL TIPS", "작성 실무 팁");
  card(s, M, 1.68, W - 2 * M, 1.55, NAVY);
  s.addText("APA 스타일 인용", { x: M + 0.35, y: 1.86, w: 4.0, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 15, bold: true, color: GOLD });
  s.addText("본문 인용 —  (홍길동, 2023),  (Smith & Jones, 2021)", {
    x: M + 0.35, y: 2.24, w: 6.2, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 13, color: "FFFFFF" });
  s.addText("참고문헌 목록의 형식(저자·연도·제목·출처 순서, 이탤릭, 문장부호)까지 철저히 준수합니다.", {
    x: M + 0.35, y: 2.6, w: W - 2 * M - 0.7, h: 0.4, margin: 0,
    fontFace: BF, fontSize: 12.5, color: ICE });

  s.addText("학술적 글쓰기 3원칙", { x: M, y: 3.42, w: W - 2 * M, h: 0.34, margin: 0,
    fontFace: BF, fontSize: 15, bold: true, color: NAVY });
  const prin = [
    { t: "명확성", d: "한 문장에는 하나의 생각만 담습니다.", bad: "", good: "" },
    { t: "간결성", d: "불필요한 수식어를 제거합니다.",
      bad: "매우 상당한 영향을 미쳤을 것으로 사료된다", good: "유의미한 영향을 미쳤다" },
    { t: "객관성", d: "1인칭 대명사(‘나’, ‘저자’) 사용을 자제합니다.", bad: "", good: "" }
  ];
  const cw = (W - 2 * M - 0.6) / 3;
  prin.forEach((p, i) => {
    const x = M + i * (cw + 0.3);
    card(s, x, 3.85, cw, 2.45, i === 1 ? SOFT : "FFFFFF");
    badge(s, x + 0.28, 4.08, 0.46, String(i + 1), NAVY);
    s.addText(p.t, { x: x + 0.88, y: 4.06, w: cw - 1.16, h: 0.34, margin: 0, valign: "middle",
      fontFace: HF, fontSize: 19, bold: true, color: NAVY });
    s.addText(p.d, { x: x + 0.28, y: 4.6, w: cw - 0.56, h: 0.62, margin: 0,
      fontFace: BF, fontSize: 12.5, color: INK, lineSpacing: 17 });
    if (p.bad) {
      s.addText("✕  " + p.bad, { x: x + 0.28, y: 5.24, w: cw - 0.56, h: 0.44, margin: 0,
        fontFace: BF, fontSize: 11.5, color: RED });
      s.addText("○  " + p.good, { x: x + 0.28, y: 5.72, w: cw - 0.56, h: 0.44, margin: 0,
        fontFace: BF, fontSize: 11.5, bold: true, color: GRN });
    }
  });
}

/* =============== 15. 흔한 실수 Top 5 =============== */
{
  const s = slideBase(false);
  header(s, "6  COMMON MISTAKES", "흔한 실수 Top 5와 개선 방법");
  const rows = [
    hrow(["", "흔한 실수", "개선 방법"]),
    row(["1", "서론과 결론의 불일치", "연구 목적 – 가설 – 결론이 하나의 실로 이어지는지 점검합니다"]),
    row(["2", "측정도구 출처 누락", "설문 문항의 원출처(저자, 연도)를 반드시 명시합니다"]),
    row(["3", "표 / 그림 번호 오류", "자동 번호 매기기를 활용하거나 최종 제출 전 교열합니다"]),
    row(["4", "과도한 일반화", "해군 소수 부대의 측정 결과를 전 군에 적용하는 해석에 주의합니다"]),
    row(["5", "참고문헌 불일치", "본문 인용 문헌이 목록에 있는지 1:1 크로스체크합니다"])
  ];
  rows.forEach((r, i) => { if (i > 0) { r[0].options.align = "center";
    r[0].options.fill = { color: NAVY }; r[0].options.color = "FFFFFF"; } });
  s.addTable(rows, tableOpts([0.7, 4.3, 6.9], { y: 1.68, rowH: 0.62 }));
  card(s, M, 5.35, W - 2 * M, 1.25, NAVY);
  s.addText("제출 2주 전 체크리스트로 활용하십시오", {
    x: M + 0.35, y: 5.5, w: W - 2 * M - 0.7, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 13.5, bold: true, color: GOLD });
  s.addText("다섯 항목 모두 내용이 아니라 ‘일관성’의 문제입니다. 원고를 처음부터 끝까지 한 번에 읽으면 대부분 드러납니다.", {
    x: M + 0.35, y: 5.86, w: W - 2 * M - 0.7, h: 0.4, margin: 0,
    fontFace: BF, fontSize: 12.5, color: ICE });
}

/* =============== 16. 연구윤리와 AI 도구 =============== */
{
  const s = slideBase(false);
  header(s, "6  RESEARCH ETHICS & AI", "연구 윤리와 AI 도구 활용");
  const cw = (W - 2 * M - 0.4) / 2;
  card(s, M, 1.68, cw, 4.0, SOFT);
  s.addText("표절(Plagiarism) 예방", { x: M + 0.3, y: 1.9, w: cw - 0.6, h: 0.4, margin: 0,
    fontFace: HF, fontSize: 21, bold: true, color: NAVY });
  bullets(s, M + 0.3, 2.4, cw - 0.6, 1.5, [
    "타인의 아이디어나 문장을 가져올 때는 반드시 인용 출처를 표시합니다",
    "6단어 이상 연속으로 동일하면 표절로 간주될 수 있습니다"], 12.5);
  s.addShape(pres.ShapeType.roundRect, { x: M + 0.3, y: 4.05, w: cw - 0.6, h: 1.4,
    rectRadius: 0.08, fill: { color: "FFFFFF" }, line: { color: LINE, width: 1 } });
  s.addText("문장 재구성 (Paraphrasing)", { x: M + 0.52, y: 4.2, w: cw - 1.04, h: 0.32, margin: 0,
    fontFace: BF, fontSize: 13, bold: true, color: GOLD });
  s.addText("원문을 덮고 내 언어로 다시 쓴 뒤 출처를 답니다. 단어만 바꾸는 것은 재구성이 아니라 표절입니다.", {
    x: M + 0.52, y: 4.54, w: cw - 1.04, h: 0.8, margin: 0,
    fontFace: BF, fontSize: 12, color: INK, lineSpacing: 17 });

  const x2 = M + cw + 0.4;
  card(s, x2, 1.68, cw, 4.0, NAVY);
  s.addText("AI 도구 활용 가이드라인", { x: x2 + 0.3, y: 1.9, w: cw - 0.6, h: 0.4, margin: 0,
    fontFace: HF, fontSize: 21, bold: true, color: "FFFFFF" });
  const gl = [
    { h: "권장 ○", c: GRN, lines: "브레인스토밍 · 번역 · 문법 교정 · 통계 코드 작성 보조" },
    { h: "금지 ✕", c: RED, lines: "논문 본문 생성 및 복사/붙여넣기 · 가짜 출처(Hallucination) 생성" }
  ];
  gl.forEach((g, i) => {
    const y = 2.4 + i * 1.1;
    s.addShape(pres.ShapeType.roundRect, { x: x2 + 0.3, y, w: cw - 0.6, h: 0.95,
      rectRadius: 0.08, fill: { color: NAVY_D }, line: { color: g.c, width: 1.5 } });
    s.addText(g.h, { x: x2 + 0.5, y: y + 0.08, w: cw - 1.0, h: 0.3, margin: 0,
      fontFace: BF, fontSize: 13, bold: true, color: g.c === GRN ? "9BE8C0" : "F3B0B0" });
    s.addText(g.lines, { x: x2 + 0.5, y: y + 0.38, w: cw - 1.0, h: 0.5, margin: 0,
      fontFace: BF, fontSize: 12, color: ICE, lineSpacing: 16 });
  });
  s.addShape(pres.ShapeType.roundRect, { x: x2 + 0.3, y: 4.68, w: cw - 0.6, h: 0.77,
    rectRadius: 0.08, fill: { color: GOLD }, line: { color: GOLD, width: 0 } });
  s.addText("AI는 연구의 ‘비서’일 뿐, ‘저자’가 될 수 없습니다", {
    x: x2 + 0.3, y: 4.68, w: cw - 0.6, h: 0.77, margin: 0, align: "center", valign: "middle",
    fontFace: BF, fontSize: 14, bold: true, color: NAVY_D });
  s.addText("소속 대학원의 AI 활용 규정을 반드시 먼저 확인하십시오. 활용 범위를 밝히도록 요구하는 곳이 늘고 있습니다.", {
    x: M, y: 5.85, w: W - 2 * M, h: 0.4, margin: 0,
    fontFace: BF, fontSize: 12, italic: true, color: GREY });
}

/* =============== 17. Q&A 및 마무리 =============== */
{
  const s = slideBase(true);
  s.addShape(pres.ShapeType.ellipse, { x: 10.3, y: -1.9, w: 5.2, h: 5.2,
    fill: { color: "2B3A7A" }, line: { color: "2B3A7A", width: 0 } });
  s.addText("7  WRAP-UP & Q&A", { x: M, y: 0.62, w: W - 2 * M, h: 0.3, margin: 0,
    fontFace: BF, fontSize: 12.5, bold: true, color: GOLD, charSpacing: 2 });
  s.addText("Q&A 및 마무리", { x: M, y: 0.98, w: W - 2 * M, h: 0.72, margin: 0,
    fontFace: HF, fontSize: 34, bold: true, color: "FFFFFF" });

  const sum = [
    ["구조", "6장 체제 — 2장과 4장이 논문의 무게중심입니다"],
    ["일관성", "목적 – 가설 – 결과 – 결론이 하나의 실로 이어져야 합니다"],
    ["엄밀성", "측정도구의 출처와 통계치를 빠짐없이 제시하십시오"],
    ["윤리", "인용은 정확하게, AI는 비서로만 활용하십시오"]
  ];
  const cw = (W - 2 * M - 3 * 0.28) / 4;
  sum.forEach((t, i) => {
    const x = M + i * (cw + 0.28);
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.95, w: cw, h: 1.85, rectRadius: 0.08,
      fill: { color: NAVY_D }, line: { color: "3A4680", width: 1 } });
    badge(s, x + 0.24, 2.14, 0.44, String(i + 1), GOLD, NAVY_D);
    s.addText(t[0], { x: x + 0.24, y: 2.66, w: cw - 0.48, h: 0.3, margin: 0,
      fontFace: BF, fontSize: 13, bold: true, color: GOLD });
    s.addText(t[1], { x: x + 0.24, y: 2.96, w: cw - 0.48, h: 0.76, margin: 0,
      fontFace: BF, fontSize: 11.5, color: ICE, lineSpacing: 16 });
  });

  s.addText("“훌륭한 지휘관은 훌륭한 학자가 될 수 있습니다.\n여러분의 실무 경험을 객관적인 데이터와 이론적 틀로 엮어내는 것이 학위논문입니다.”", {
    x: M, y: 4.05, w: W - 2 * M, h: 1.05, margin: 0, align: "center",
    fontFace: HF, fontSize: 17, italic: true, color: "FFFFFF", lineSpacing: 28 });

  s.addShape(pres.ShapeType.roundRect, { x: W / 2 - 2.3, y: 5.3, w: 4.6, h: 0.72, rectRadius: 0.12,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 } });
  s.addText("Q & A  질의응답", { x: W / 2 - 2.3, y: 5.3, w: 4.6, h: 0.72, margin: 0,
    align: "center", valign: "middle", fontFace: BF, fontSize: 17, bold: true, color: NAVY_D });
  s.addText("해군 소령 여러분의 성공적인 논문 작성을 응원합니다. 감사합니다.", {
    x: M, y: 6.22, w: W - 2 * M, h: 0.34, margin: 0, align: "center",
    fontFace: BF, fontSize: 13, color: ICE });
  s.addNotes("질의응답 및 추가 문의사항 접수. 수강생 각자의 연구 주제를 목적 문장 한 줄로 써 보게 하는 실습으로 마무리 가능.");
}

pres.writeFile({ fileName: "학위논문_작성법_특강.pptx" }).then(f => console.log("saved:", f));
