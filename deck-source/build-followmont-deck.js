const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.author = "Business Assessment";
pres.title = "Five Prompts, One Client Problem";

// ---- palette -------------------------------------------------------------
const DARK  = "2E2A28"; // deep charcoal-brown  (title + closing)
const TERRA = "B85042"; // terracotta           (accent / numerals)
const SAND  = "E7E8D1"; // sand                 (result cards)
const SAGE  = "A7BEAE"; // sage                 (quiet accent)
const PAPER = "F4F1EE"; // warm off-white       (ask cards)
const INK   = "2E2A28";
const MUTED = "7A736E";
const WHITE = "FFFFFF";
const FILLIN = "9A5F58"; // marks text the student completes

const HEAD = "Cambria";
const BODY = "Calibri";

const M = 0.7;  // page margin
const W = 13.3;

function softShadow() {
  return { type: "outer", angle: 90, blur: 12, offset: 2, color: "000000", opacity: 0.08 };
}

// ---- 1. TITLE ------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: DARK };

  s.addText("GENAI PROMPT CHAIN & CRAAP EVALUATION", {
    x: M, y: 1.75, w: 9, h: 0.3,
    fontFace: BODY, fontSize: 13, bold: true, color: TERRA, charSpacing: 2.5, margin: 0,
  });

  s.addText("Five Prompts,\nOne Client Problem", {
    x: M, y: 2.25, w: 9.2, h: 2.1,
    fontFace: HEAD, fontSize: 48, bold: true, color: WHITE, lineSpacing: 54, margin: 0,
  });

  s.addText("Followmont Transport — keeping workers aged 55 and over in the cab and on the dock", {
    x: M, y: 4.65, w: 9.6, h: 0.5,
    fontFace: BODY, fontSize: 17, color: SAGE, margin: 0,
  });

  s.addText("[Your name]  ·  [Unit code]  ·  [Date]", {
    x: M, y: 6.05, w: 7, h: 0.35,
    fontFace: BODY, fontSize: 13, color: "9A928C", margin: 0,
  });

  s.addNotes("Open here. One sentence on what the assessment asked for, then move on.");
}

// ---- 2. AGENDA -----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("Agenda", {
    x: M, y: 0.75, w: 7, h: 0.75,
    fontFace: HEAD, fontSize: 40, bold: true, color: INK, margin: 0,
  });

  const items = [
    { n: "1", t: "Purpose",    d: "The client, the problem, and what I set out to test" },
    { n: "2", t: "Prompts",    d: "A chain of five, each building on the answer before it" },
    { n: "3", t: "CRAAP",      d: "Currency, Relevance, Authority, Accuracy, Purpose — applied at every step" },
    { n: "4", t: "Conclusion", d: "What I validated independently, and what I recommend to Followmont" },
  ];

  items.forEach((it, i) => {
    const y = 1.95 + i * 1.2;
    s.addShape(pres.ShapeType.ellipse, {
      x: M, y: y + 0.05, w: 0.72, h: 0.72,
      fill: { color: i === 2 ? TERRA : PAPER }, line: { color: TERRA, width: 1.25 },
    });
    s.addText(it.n, {
      x: M, y: y + 0.05, w: 0.72, h: 0.72,
      fontFace: HEAD, fontSize: 19, bold: true, color: i === 2 ? WHITE : TERRA,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(it.t, {
      x: 1.75, y: y + 0.02, w: 2.6, h: 0.45,
      fontFace: HEAD, fontSize: 21, bold: true, color: INK, margin: 0, valign: "middle",
    });
    s.addText(it.d, {
      x: 4.5, y: y + 0.02, w: 8.1, h: 0.75,
      fontFace: BODY, fontSize: 15.5, color: MUTED, margin: 0, valign: "middle", lineSpacing: 21,
    });
  });

  s.addNotes("Fifteen seconds. Point at item 3 — the CRAAP evaluation runs through every prompt slide, not just at the end.");
}

// ---- 3. THE CLIENT -------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("The client", {
    x: M, y: 0.75, w: 7, h: 0.75,
    fontFace: HEAD, fontSize: 40, bold: true, color: INK, margin: 0,
  });

  s.addText(
    "Followmont Transport is a family-owned Australian road freight operator running line-haul and local delivery across regional Queensland and northern New South Wales.\n\nIts drivers and dock staff are ageing. The physical side of the job — lifting freight, climbing in and out of the cab — pushes experienced people out of operational roles before they would otherwise choose to leave.",
    {
      x: M, y: 2.0, w: 6.0, h: 3.6,
      fontFace: BODY, fontSize: 17, color: INK, lineSpacing: 27, margin: 0, valign: "top",
    }
  );

  const stats = [
    { n: "~1,000", l: "employees" },
    { n: "26",     l: "depots" },
    { n: "55+",    l: "the group at risk" },
  ];
  stats.forEach((st, i) => {
    const y = 1.95 + i * 1.42;
    s.addShape(pres.ShapeType.roundRect, {
      x: 7.35, y, w: 5.25, h: 1.12, rectRadius: 0.08,
      fill: { color: i === 2 ? TERRA : PAPER }, line: { color: i === 2 ? TERRA : "E6E0DA", width: 1 },
      shadow: softShadow(),
    });
    s.addText(st.n, {
      x: 7.65, y: y + 0.16, w: 2.2, h: 0.8,
      fontFace: HEAD, fontSize: 34, bold: true, color: i === 2 ? WHITE : TERRA, margin: 0, valign: "middle",
    });
    s.addText(st.l, {
      x: 9.85, y: y + 0.16, w: 2.5, h: 0.8,
      fontFace: BODY, fontSize: 14, color: i === 2 ? WHITE : MUTED, margin: 0, valign: "middle", align: "right",
    });
  });

  s.addText("The question: how do data and technology keep these workers in the job longer?", {
    x: M, y: 6.15, w: 11.9, h: 0.45,
    fontFace: BODY, fontSize: 16, italic: true, color: TERRA, margin: 0,
  });

  s.addNotes("Set up the client quickly. The 55+ card is the whole reason the project exists.");
}

// ---- 4. THE CHAIN --------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("The chain", {
    x: M, y: 0.75, w: 7, h: 0.75,
    fontFace: HEAD, fontSize: 40, bold: true, color: INK, margin: 0,
  });
  s.addText("Five prompts in one conversation. Each one uses the answer before it — nothing restarts.", {
    x: M, y: 1.65, w: 11.5, h: 0.4,
    fontFace: BODY, fontSize: 17, color: MUTED, margin: 0,
  });

  const steps = [
    { n: "01", t: "Set the method",   d: "Agree the rules before touching the problem" },
    { n: "02", t: "Ask it badly",     d: "The generic question, on purpose" },
    { n: "03", t: "Add the client",   d: "Real operation, real constraints" },
    { n: "04", t: "Ask for receipts", d: "A source for every number" },
    { n: "05", t: "Make it useful",   d: "One page for the leadership team" },
  ];

  const cw = 2.22, gap = 0.2;
  const total = steps.length * cw + (steps.length - 1) * gap;
  const startX = (W - total) / 2;

  steps.forEach((st, i) => {
    const x = startX + i * (cw + gap);

    if (i < steps.length - 1) {
      s.addShape(pres.ShapeType.rect, {
        x: x + cw * 0.5 + 0.42, y: 3.16, w: cw + gap - 0.84, h: 0.02,
        fill: { color: "DDD6D0" },
      });
    }

    s.addShape(pres.ShapeType.ellipse, {
      x: x + cw / 2 - 0.45, y: 2.72, w: 0.9, h: 0.9,
      fill: { color: i === 0 ? TERRA : PAPER }, line: { color: TERRA, width: 1.25 },
    });
    s.addText(st.n, {
      x: x + cw / 2 - 0.45, y: 2.72, w: 0.9, h: 0.9,
      fontFace: HEAD, fontSize: 19, bold: true, color: i === 0 ? WHITE : TERRA,
      align: "center", valign: "middle", margin: 0,
    });

    s.addText(st.t, {
      x, y: 3.9, w: cw, h: 0.4,
      fontFace: HEAD, fontSize: 17, bold: true, color: INK, align: "center", margin: 0,
    });
    s.addText(st.d, {
      x: x - 0.08, y: 4.38, w: cw + 0.16, h: 1.0,
      fontFace: BODY, fontSize: 13.5, color: MUTED, align: "center", lineSpacing: 17, margin: 0, valign: "top",
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.85, w: 11.9, h: 0.9, rectRadius: 0.08, fill: { color: SAND },
  });
  s.addText("The point of the chain is the gap between the steps — what changes when you add detail, and what only changes when you ask for evidence.", {
    x: M + 0.4, y: 5.85, w: 11.1, h: 0.9,
    fontFace: BODY, fontSize: 15.5, color: INK, valign: "middle", margin: 0,
  });

  s.addNotes("This is the map slide. Everything after it is one step of this row.");
}

// ---- 5-9. PROMPT SLIDES --------------------------------------------------
const prompts = [
  {
    n: "01",
    title: "Set the method",
    ask: "Before the client problem: what makes a prompt well designed, what do you do badly when I ask for research with citations, and how should I sequence prompts so each builds on the last?",
    quote: "“Where your answer draws on vendor documentation or on your own general behaviour rather than independent research, say so explicitly.”",
    got: "A usable method, and one admission worth keeping: it can produce citations that look right and aren't. Most of what it offered came from vendor prompt-engineering guides and from describing its own behaviour.",
    craap: [
      { e: "Authority", f: "Leans on vendor documentation and self-description, not independent research." },
      { e: "Purpose",   f: "Vendor guides exist to promote the tool — useful, but not neutral." },
      { e: "Currency",  f: "Prompt-design guidance shifts with every model release; undated advice ages fast." },
    ],
    notes: "Explain why the first prompt is not about the client at all. The forced disclosure in the quote is what makes the Authority finding possible.",
  },
  {
    n: "02",
    title: "Ask it badly",
    ask: "How might we harness data and technology to improve the workforce participation of transport and logistics workers aged 55 and over?",
    quote: "No context, no constraints, no source demand. That was the point.",
    got: "Six broad interventions, none tied to a country, an employer or a product. Nothing carried a figure, a date or a source, so there was nothing to check. [Name your six here.]",
    craap: [
      { e: "Relevance", f: "Nothing in it is specific to Australia, to road freight, or to Followmont." },
      { e: "Accuracy",  f: "No figures and no sources — the claims cannot be verified either way." },
      { e: "Currency",  f: "Undated throughout; the same list would read the same in 2015." },
    ],
    notes: "Stress that this was deliberate. It is the control, not a mistake — without it there is nothing to compare Prompt 3 against.",
  },
  {
    n: "03",
    title: "Add the client",
    ask: "Here is Followmont, and here is the technology they already run — don't propose it again. Pick one technology and aim it at one barrier: the physical load of the job.",
    quote: "“Name something specific enough that I could search for vendors.”  ·  “Where your evidence comes from outside Australia, say so.”",
    got: "Exoskeletons for manual freight handling — named, costed and argued across evidence, barriers, enablers and business case. Still not one source, and still no Australian regulation.",
    craap: [
      { e: "Relevance", f: "The operation is now right; the evidence behind it stayed generic." },
      { e: "Accuracy",  f: "Precise figures appeared — 15–30% muscle activity, A$1,500–5,000 — with nothing behind them." },
      { e: "Currency",  f: "No publication years offered, despite a post-2022 instruction." },
    ],
    notes: "The key move: blocking the tech they already run forces new reasoning. Read the two quoted constraints aloud — they are the reason the answer is checkable at all.",
  },
  {
    n: "04",
    title: "Ask for receipts",
    ask: "Give me a source for every number you just used — the 15–30% reduction, the price range, the trial results. And why didn't you mention Australian regulation once?",
    quote: "“If you can't find a source for something, just say so. Don't give me a source that's close enough.”",
    got: "Some claims came back with a study and a year attached. Others came back with an admission that no source existed. It also conceded it had ignored the Australian regulatory setting entirely.",
    craap: [
      { e: "Accuracy",  f: "Sourcing only appeared under pressure; some numbers could not be supported at all." },
      { e: "Authority", f: "What did arrive skewed to vendors and overseas studies, not Australian regulators." },
      { e: "Currency",  f: "Publication years surfaced only once I demanded them explicitly." },
    ],
    notes: "This is the slide that carries the argument. Slow down. The permission to fail — 'just say so' — is what produced the honest answer.",
  },
  {
    n: "05",
    title: "Make it useful",
    ask: "Pull it together as a one-page briefing for Followmont's leadership: recommendation, cost, risks, and what they would measure.",
    quote: "“Keep the sourcing honest… don't smooth over the gaps you just told me about.”",
    got: "A one-page briefing a manager could act on — recommendation, indicative cost, risks and a measurement plan — with the weak evidence still labelled weak rather than quietly dropped.",
    craap: [
      { e: "Purpose",   f: "Written to persuade a board to fund a trial; the tone runs ahead of the evidence." },
      { e: "Relevance", f: "Fits the decision Followmont actually faces, at the length they would actually read." },
      { e: "Accuracy",  f: "Gaps stayed visible — but only because I instructed it to keep them." },
    ],
    notes: "Close the chain. Note that honesty had to be requested; it was never volunteered.",
  },
];

prompts.forEach((p) => {
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText(p.n, {
    x: M, y: 0.45, w: 1.4, h: 0.95,
    fontFace: HEAD, fontSize: 50, bold: true, color: TERRA, margin: 0, valign: "middle",
  });
  s.addText(p.title, {
    x: 1.95, y: 0.45, w: 10.6, h: 0.95,
    fontFace: HEAD, fontSize: 36, bold: true, color: INK, margin: 0, valign: "middle",
  });

  const cardY = 1.6, cardH = 2.95, cardW = 5.75;

  // --- what I asked
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: cardY, w: cardW, h: cardH, rectRadius: 0.08,
    fill: { color: PAPER }, line: { color: "E6E0DA", width: 1 }, shadow: softShadow(),
  });
  s.addText("WHAT I ASKED", {
    x: M + 0.38, y: cardY + 0.28, w: cardW - 0.76, h: 0.28,
    fontFace: BODY, fontSize: 11.5, bold: true, color: MUTED, charSpacing: 2, margin: 0,
  });
  s.addText(p.ask, {
    x: M + 0.38, y: cardY + 0.65, w: cardW - 0.76, h: 1.15,
    fontFace: BODY, fontSize: 14.5, color: INK, lineSpacing: 21, margin: 0, valign: "top",
  });
  s.addText(p.quote, {
    x: M + 0.38, y: cardY + 1.9, w: cardW - 0.76, h: 0.85,
    fontFace: BODY, fontSize: 13.5, italic: true, bold: true, color: TERRA,
    lineSpacing: 19, margin: 0, valign: "top",
  });

  // --- what came back
  const rx = M + cardW + 0.4;
  s.addShape(pres.ShapeType.roundRect, {
    x: rx, y: cardY, w: cardW, h: cardH, rectRadius: 0.08,
    fill: { color: SAND }, line: { color: "D8DAC0", width: 1 }, shadow: softShadow(),
  });
  s.addText("WHAT CAME BACK", {
    x: rx + 0.38, y: cardY + 0.28, w: cardW - 0.76, h: 0.28,
    fontFace: BODY, fontSize: 11.5, bold: true, color: "6E7A5E", charSpacing: 2, margin: 0,
  });
  s.addText(p.got, {
    x: rx + 0.38, y: cardY + 0.65, w: cardW - 0.76, h: 2.05,
    fontFace: BODY, fontSize: 14.5, color: INK, lineSpacing: 21, margin: 0, valign: "top",
  });

  // --- CRAAP strip
  s.addText("CRAAP EVALUATION", {
    x: M, y: 4.85, w: 6, h: 0.3,
    fontFace: BODY, fontSize: 11.5, bold: true, color: TERRA, charSpacing: 2, margin: 0,
  });

  const chipW = (11.9 - 2 * 0.28) / 3;
  p.craap.forEach((c, i) => {
    const x = M + i * (chipW + 0.28);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 5.25, w: chipW, h: 1.4, rectRadius: 0.07,
      fill: { color: "FAF8F6" }, line: { color: "E0D6D2", width: 1 },
    });
    s.addText(c.e, {
      x: x + 0.28, y: 5.42, w: chipW - 0.56, h: 0.32,
      fontFace: HEAD, fontSize: 15, bold: true, color: TERRA, margin: 0,
    });
    s.addText(c.f, {
      x: x + 0.28, y: 5.78, w: chipW - 0.56, h: 0.78,
      fontFace: BODY, fontSize: 12.5, color: INK, lineSpacing: 17, margin: 0, valign: "top",
    });
  });

  s.addNotes(p.notes);
});

// ---- 10. VALIDATION ------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("Checking it myself", {
    x: M, y: 0.7, w: 9, h: 0.75,
    fontFace: HEAD, fontSize: 40, bold: true, color: INK, margin: 0,
  });
  s.addText("The AI admitting a gap is its work, not mine — so I checked four claims myself.", {
    x: M, y: 1.58, w: 11.9, h: 0.5,
    fontFace: BODY, fontSize: 16, color: MUTED, margin: 0,
  });

  const cols = [3.55, 3.35, 4.6];
  const colX = [M, M + cols[0] + 0.2, M + cols[0] + cols[1] + 0.4];

  ["THE CLAIM", "CHECKED AGAINST", "WHAT I FOUND"].forEach((h, i) => {
    s.addText(h, {
      x: colX[i], y: 2.22, w: cols[i], h: 0.3,
      fontFace: BODY, fontSize: 11.5, bold: true, color: MUTED, charSpacing: 2, margin: 0,
    });
  });

  const rows = [
    {
      c: "Manual handling is the dominant injury burden in this industry",
      v: "Safe Work Australia, Key WHS Statistics",
      f: "Supported — body stressing was 34.5% of serious claims in 2023–24",
      ok: true,
    },
    {
      c: "Exoskeletons cut muscle activity by 15–30%",
      v: "[The study the AI named — does it exist?]",
      f: "[Your verdict: lab or field? Australian or overseas?]",
      ok: false,
    },
    {
      c: "Units cost A$1,500–5,000",
      v: "[Vendor pricing pages]",
      f: "[Your verdict — did any vendor confirm this range?]",
      ok: false,
    },
    {
      c: "Older workers' participation in transport is falling",
      v: "[ABS / Jobs and Skills Australia]",
      f: "[Your verdict against the Lecture 4 data]",
      ok: false,
    },
  ];

  rows.forEach((r, i) => {
    const y = 2.62 + i * 0.99;
    s.addShape(pres.ShapeType.roundRect, {
      x: M - 0.15, y, w: 12.2, h: 0.86, rectRadius: 0.06,
      fill: { color: i % 2 === 0 ? PAPER : "FBF9F8" }, line: { color: "EFE9E5", width: 1 },
    });
    s.addText(r.c, {
      x: colX[0], y: y + 0.06, w: cols[0], h: 0.74,
      fontFace: BODY, fontSize: 13, bold: true, color: INK, lineSpacing: 17, margin: 0, valign: "middle",
    });
    s.addText(r.v, {
      x: colX[1], y: y + 0.06, w: cols[1], h: 0.74,
      fontFace: BODY, fontSize: 12.5, color: r.ok ? MUTED : FILLIN, italic: !r.ok,
      lineSpacing: 17, margin: 0, valign: "middle",
    });
    s.addText(r.f, {
      x: colX[2], y: y + 0.06, w: cols[2], h: 0.74,
      fontFace: BODY, fontSize: 12.5, color: r.ok ? "4A6B4A" : FILLIN, italic: !r.ok,
      bold: r.ok, lineSpacing: 17, margin: 0, valign: "middle",
    });
  });

  s.addText("Source: Safe Work Australia, Key Work Health and Safety Statistics Australia (2025 release, 2023–24 data). Remaining rows to be completed with your own checks.", {
    x: M, y: 6.72, w: 11.9, h: 0.35,
    fontFace: BODY, fontSize: 10.5, color: MUTED, margin: 0,
  });

  s.addNotes("This is the validation slide — the difference between reporting what the AI said and checking whether it is true. Say out loud which links resolved and which did not.");
}

// ---- 11. CRAAP ON THE FINAL OUTPUT --------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("CRAAP: the final briefing", {
    x: M, y: 0.65, w: 9.5, h: 0.7,
    fontFace: HEAD, fontSize: 38, bold: true, color: INK, margin: 0,
  });
  s.addText("All five elements applied to the Prompt 5 output — the document Followmont would actually read.", {
    x: M, y: 1.4, w: 11.9, h: 0.4,
    fontFace: BODY, fontSize: 15.5, color: MUTED, margin: 0,
  });

  const els = [
    { e: "Currency",  f: "The briefing is undated. Its evidence is post-2022 only where I forced the year to be stated — and one study was older than the instruction allowed." },
    { e: "Relevance", f: "Directly answers the decision in front of the leadership team, at the length they would read. It assumes the depot conditions I supplied; it verified none of them." },
    { e: "Authority", f: "Rests on vendor material and overseas trials. No NHVR, no Safe Work Australia, no Australian regulator appears unless I name one." },
    { e: "Accuracy",  f: "Roughly half the figures survived the Prompt 4 challenge. The unsupported ones remain, labelled as unsupported, rather than removed." },
    { e: "Purpose",   f: "Written to persuade a board to fund a trial. That is the real risk in it — a confident register applied to evidence that does not yet earn it." },
  ];

  els.forEach((el, i) => {
    const y = 1.95 + i * 0.98;
    s.addShape(pres.ShapeType.roundRect, {
      x: M - 0.15, y, w: 12.2, h: 0.86, rectRadius: 0.06,
      fill: { color: i % 2 === 0 ? PAPER : "FBF9F8" }, line: { color: "EFE9E5", width: 1 },
    });
    s.addText(el.e, {
      x: M + 0.15, y: y + 0.06, w: 2.0, h: 0.74,
      fontFace: HEAD, fontSize: 18, bold: true, color: TERRA, margin: 0, valign: "middle",
    });
    s.addText(el.f, {
      x: M + 2.25, y: y + 0.06, w: 9.55, h: 0.74,
      fontFace: BODY, fontSize: 13.5, color: INK, lineSpacing: 18, margin: 0, valign: "middle",
    });
  });

  s.addText("CRAAP test framework: EdResearch (2022) — see references.", {
    x: M, y: 6.95, w: 11.9, h: 0.3,
    fontFace: BODY, fontSize: 10.5, color: MUTED, margin: 0,
  });

  s.addNotes("Tutorial 3 asks for the full five elements on the final output. This is that slide — take it slowly, one element at a time.");
}

// ---- 12. CONCLUSION & RECOMMENDATION ------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: DARK };

  s.addText("CONCLUSION", {
    x: M, y: 0.75, w: 8, h: 0.3,
    fontFace: BODY, fontSize: 13, bold: true, color: TERRA, charSpacing: 2.5, margin: 0,
  });
  s.addText("Detail changed how the answer sounded.\nPressure changed what it could prove.", {
    x: M, y: 1.25, w: 11.4, h: 1.5,
    fontFace: HEAD, fontSize: 32, bold: true, color: WHITE, lineSpacing: 43, margin: 0,
  });

  const points = [
    { k: "The generic answer",     v: "was fluent and unusable" },
    { k: "The specific answer",    v: "was confident and still unsourced" },
    { k: "Only the direct challenge", v: "separated evidence from filler" },
  ];
  points.forEach((pt, i) => {
    const x = M + i * 4.07;
    s.addShape(pres.ShapeType.rect, { x, y: 3.05, w: 0.55, h: 0.025, fill: { color: TERRA } });
    s.addText(pt.k, {
      x, y: 3.3, w: 3.7, h: 0.35,
      fontFace: HEAD, fontSize: 15.5, bold: true, color: SAGE, margin: 0,
    });
    s.addText(pt.v, {
      x, y: 3.68, w: 3.7, h: 0.7,
      fontFace: BODY, fontSize: 14, color: "CFC7C1", lineSpacing: 20, margin: 0, valign: "top",
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 4.6, w: 11.9, h: 2.15, rectRadius: 0.08, fill: { color: TERRA },
  });
  s.addText("RECOMMENDATION TO FOLLOWMONT", {
    x: M + 0.45, y: 4.82, w: 11, h: 0.3,
    fontFace: BODY, fontSize: 11.5, bold: true, color: "F6DED9", charSpacing: 2, margin: 0,
  });
  s.addText("Proceed — but to a measured trial, not a rollout.", {
    x: M + 0.45, y: 5.16, w: 11, h: 0.45,
    fontFace: HEAD, fontSize: 24, bold: true, color: WHITE, margin: 0,
  });
  s.addText("The barrier the AI identified is real and independently confirmed. The technology it recommended is not yet proven for Australian road freight — the evidence is thin, largely from overseas laboratories, and partly unsourced. One depot, measures agreed before the start, and a go/no-go decision at six months turns an unproven recommendation into something Followmont can actually test.", {
    x: M + 0.45, y: 5.68, w: 11, h: 0.95,
    fontFace: BODY, fontSize: 14, color: "FCEFEC", lineSpacing: 20, margin: 0, valign: "top",
  });

  s.addNotes("This answers the assignment's actual question: can Followmont move ahead? Yes — conditionally, and the conditions come from the CRAAP findings.");
}

// ---- 13. REFERENCES ------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("References", {
    x: M, y: 0.7, w: 7, h: 0.75,
    fontFace: HEAD, fontSize: 40, bold: true, color: INK, margin: 0,
  });

  const refs = [
    { t: "CRAAP test framework", d: "EdResearch (2022). [Complete reference — Tutorial 3 reading.]" },
    { t: "Injury and claims data", d: "Safe Work Australia. Key Work Health and Safety Statistics Australia. [Year, URL.]" },
    { t: "Workforce and participation data", d: "[ABS / Jobs and Skills Australia — dataset, year, URL.]" },
    { t: "Sources returned by the AI", d: "[Studies and vendor pages cited in Prompt 4 — author, year, URL, and whether the link resolved.]" },
    { t: "Prompt-design guidance", d: "[Vendor documentation the AI relied on in Prompt 1.]" },
  ];

  refs.forEach((r, i) => {
    const y = 1.85 + i * 0.95;
    s.addText(r.t, {
      x: M, y, w: 3.9, h: 0.4,
      fontFace: HEAD, fontSize: 16, bold: true, color: TERRA, margin: 0, valign: "top",
    });
    s.addText(r.d, {
      x: M + 4.0, y, w: 7.9, h: 0.75,
      fontFace: BODY, fontSize: 14, color: INK, lineSpacing: 19, margin: 0, valign: "top",
    });
  });

  s.addText("All AI-generated content was produced in a single conversation and is quoted or summarised on the prompt slides above.", {
    x: M, y: 6.75, w: 11.9, h: 0.35,
    fontFace: BODY, fontSize: 11.5, italic: true, color: MUTED, margin: 0,
  });

  s.addNotes("Do not read this slide aloud. Leave it on screen while you close.");
}

pres.writeFile({ fileName: "Followmont-Prompt-Chain.pptx" }).then(() => console.log("written"));
