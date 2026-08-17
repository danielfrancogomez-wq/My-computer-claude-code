const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.author = "Business Assessment";
pres.title = "Five Prompts, One Client Problem";

// ---- palette (Followmont navy + white) ----------------------------------
const DARK   = "0E2338"; // deep navy            (title + conclusion grounds)
const TERRA  = "1D5C9B"; // brand blue           (accent / numerals, on light)
const LIGHTA = "5B9BD5"; // bright blue          (accent on dark grounds)
const SAND   = "DCE6F0"; // pale blue            (result cards)
const SAGE   = "A9C4DC"; // ice blue             (quiet accent on dark)
const PAPER  = "F2F5F8"; // cool off-white       (ask cards)
const INK    = "16212E";
const MUTED  = "6B7787";
const WHITE  = "FFFFFF";
const FILLIN = "9A5F58"; // retained for legacy references

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
    fontFace: BODY, fontSize: 13, bold: true, color: LIGHTA, charSpacing: 2.5, margin: 0,
  });

  s.addText("Five Prompts,\nOne Client Problem", {
    x: M, y: 2.25, w: 9.2, h: 2.1,
    fontFace: HEAD, fontSize: 48, bold: true, color: WHITE, lineSpacing: 54, margin: 0,
  });

  s.addText("Followmont Transport — keeping workers aged 55 and over in the cab and on the dock", {
    x: M, y: 4.65, w: 9.6, h: 0.5,
    fontFace: BODY, fontSize: 17, color: SAGE, margin: 0,
  });

  s.addText("Daniel Franco Gomez  ·  n12854468", {
    x: M, y: 5.85, w: 8, h: 0.35,
    fontFace: BODY, fontSize: 14, bold: true, color: "B9C6D4", margin: 0,
  });
  s.addText("BSB105 The Future Enterprise  ·  Assignment 1: Oral Critique of AI-generated Content", {
    x: M, y: 6.25, w: 10.5, h: 0.35,
    fontFace: BODY, fontSize: 13, color: "8496A8", margin: 0,
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
    { n: "4", t: "Conclusion", d: "What I checked myself, and what I recommend to Followmont" },
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
    "Followmont Transport is a family-owned Australian road freight operator running line-haul and local delivery across regional Queensland and northern New South Wales.\n\nIts drivers and dock staff are ageing. The physical side of the job — lifting freight, climbing in and out of the cab — pushes experienced people out of the job before they're ready to go.",
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
    const y = 1.85 + i * 1.28;
    s.addShape(pres.ShapeType.roundRect, {
      x: 7.35, y, w: 5.25, h: 1.12, rectRadius: 0.08,
      fill: { color: i === 2 ? TERRA : PAPER }, line: { color: i === 2 ? TERRA : "E1E8EF", width: 1 },
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

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.72, w: 11.9, h: 1.22, rectRadius: 0.08, fill: { color: SAND },
  });
  s.addText("“How might we harness data and technology to improve the workforce participation of transport and logistics workers aged 55 and over?”", {
    x: M + 0.4, y: 5.9, w: 11.1, h: 0.68,
    fontFace: BODY, fontSize: 16, italic: true, bold: true, color: "1C3D5C", lineSpacing: 22, margin: 0, valign: "top",
  });
  s.addText("Followmont Transport, presentation to QUT, July 2026", {
    x: M + 0.4, y: 6.55, w: 11.1, h: 0.3,
    fontFace: BODY, fontSize: 11.5, color: "5A748E", margin: 0,
  });

  s.addNotes("Read the provocation aloud, word for word. It is the client's wording, not mine — note that it says participation, which is broader than retention.");
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
        fill: { color: "D2DDE7" },
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
  s.addText("What matters is what changed between steps — what detail fixed, and what only pressure fixed.", {
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
    got: "A usable method, and one useful admission: it can produce citations that look right and aren't. Most of its advice came from vendor guides and from describing itself.",
    craap: [
      { e: "Authority", f: "Based on vendor guides and its own self-description — not independent research." },
      { e: "Purpose",   f: "Vendor guides exist to sell the tool. Useful, but not neutral." },
      { e: "Currency",  f: "Advice about prompting changes with every new model. Undated advice goes stale fast." },
    ],
    notes: "Explain why the first prompt is not about the client at all. The forced disclosure in the quote is what makes the Authority finding possible.",
  },
  {
    n: "02",
    title: "Ask it badly",
    ask: "How might we harness data and technology to improve the workforce participation of transport and logistics workers aged 55 and over?",
    quote: "No context, no constraints, no source demand. That was the point.",
    got: "Six interventions: ergonomic wearables, predictive fatigue management, workforce analytics, knowledge capture, adaptive interfaces and phased retirement. None tied to a country, a company or a product, and not one figure, date or source to check.",
    craap: [
      { e: "Relevance", f: "Nothing in it is specific to Australia, to road freight, or to Followmont." },
      { e: "Accuracy",  f: "No figures and no sources. There's nothing to check." },
      { e: "Currency",  f: "No dates anywhere. The same list would have read the same in 2015." },
    ],
    notes: "Stress that this was deliberate. It is the control, not a mistake — without it there is nothing to compare Prompt 3 against.",
  },
  {
    n: "03",
    title: "Add the client",
    ask: "Here is Followmont, and here is the technology they already run — don't propose it again. Pick one technology and aim it at one barrier: the physical load of the job.",
    quote: "“Name something specific enough that I could search for vendors.”  ·  “Where your evidence comes from outside Australia, say so.”",
    got: "Exoskeletons for manual freight handling — five commercial vendors named, a price range attached, and a full case covering evidence, barriers, enablers and cost. Still not one source, and still no Australian regulation.",
    craap: [
      { e: "Relevance", f: "It got the company right. The evidence stayed generic." },
      { e: "Accuracy",  f: "Exact figures appeared — 15–30% muscle activity, A$1,500–5,000 — with nothing behind them." },
      { e: "Purpose",   f: "Five vendors named, none checked. It reads like a product recommendation." },
    ],
    notes: "The key move: blocking the tech they already run forces new reasoning. Read the two quoted constraints aloud — they are the reason the answer is checkable at all.",
  },
  {
    n: "04",
    title: "Ask for receipts",
    ask: "Give me a source for every number you just used — the 15–30% reduction, the price range, the trial results. And why didn't you mention Australian regulation once?",
    quote: "“If you can't find a source for something, just say so. Don't give me a source that's close enough.”",
    got: "Some claims came back with a study and a year attached. Others came back with an admission that no source existed. It also admitted it had ignored Australian regulation completely.",
    craap: [
      { e: "Accuracy",  f: "It only gave sources when I pushed. Some numbers had none at all." },
      { e: "Authority", f: "The sources it gave were mostly vendors and overseas studies. No Australian regulators." },
      { e: "Currency",  f: "Years only appeared when I asked for them directly." },
    ],
    notes: "This is the slide that carries the argument. Slow down. The permission to fail — 'just say so' — is what produced the honest answer.",
  },
  {
    n: "05",
    title: "Make it useful",
    ask: "Pull it together as a one-page briefing for Followmont's leadership: recommendation, cost, risks, and what they would measure.",
    quote: "“Keep the sourcing honest… don't smooth over the gaps you just told me about.”",
    got: "A one-page briefing a manager could act on — recommendation, rough cost, risks and a measurement plan — with the weak evidence still labelled weak, not quietly dropped.",
    craap: [
      { e: "Purpose",   f: "Written to sell a trial to a board. It sounds more certain than the evidence allows." },
      { e: "Relevance", f: "It fits the decision Followmont actually faces, at a length they'd actually read." },
      { e: "Accuracy",  f: "The gaps stayed in — but only because I told it to." },
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
    fill: { color: PAPER }, line: { color: "E1E8EF", width: 1 }, shadow: softShadow(),
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
    fill: { color: SAND }, line: { color: "C3D3E3", width: 1 }, shadow: softShadow(),
  });
  s.addText("WHAT CAME BACK", {
    x: rx + 0.38, y: cardY + 0.28, w: cardW - 0.76, h: 0.28,
    fontFace: BODY, fontSize: 11.5, bold: true, color: "3E6488", charSpacing: 2, margin: 0,
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
      fill: { color: "F8FAFC" }, line: { color: "DCE4EC", width: 1 },
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
      c: "Manual handling is the dominant injury burden across Australian workplaces",
      v: "Safe Work Australia, Key WHS Statistics (2025 release)",
      f: "Supported — body stressing was 34.5% of serious claims in 2023–24",
      tone: "ok",
    },
    {
      c: "Exoskeletons cut muscle activity by 15–30%",
      v: "Schwartz et al. (2023), Int. J. Environ. Res. Public Health",
      f: "Overstated — passive devices cut muscle activity 12–27%, not 15–30%. French lab, not a depot, and results varied a lot between individuals",
      tone: "mixed",
    },
    {
      c: "Units cost A$1,500–5,000",
      v: "SpanSet Australia; Exxovantage — the AU suppliers",
      f: "Not supported — neither publishes a price. SpanSet only quotes through a rental that credits toward purchase.",
      tone: "bad",
    },
    {
      c: "\u201C55+\u201D is a single workforce group",
      v: "Jobs and Skills Australia; ABS (Lecture 4)",
      f: "Contradicted — participation is 69.6% at 55–64 but 16.3% at 65+: one label, two different problems",
      tone: "bad",
    },
  ];

  const TONE = { ok: "4A6B4A", mixed: "7A6A2B", bad: "9A3F33" };

  rows.forEach((r, i) => {
    const y = 2.62 + i * 0.99;
    s.addShape(pres.ShapeType.roundRect, {
      x: M - 0.15, y, w: 12.2, h: 0.86, rectRadius: 0.06,
      fill: { color: i % 2 === 0 ? PAPER : "FAFCFE" }, line: { color: "E7EDF3", width: 1 },
    });
    s.addText(r.c, {
      x: colX[0], y: y + 0.06, w: cols[0], h: 0.74,
      fontFace: BODY, fontSize: 13, bold: true, color: INK, lineSpacing: 17, margin: 0, valign: "middle",
    });
    s.addText(r.v, {
      x: colX[1], y: y + 0.06, w: cols[1], h: 0.74,
      fontFace: BODY, fontSize: 12, color: MUTED,
      lineSpacing: 16, margin: 0, valign: "middle",
    });
    s.addText(r.f, {
      x: colX[2], y: y + 0.06, w: cols[2], h: 0.74,
      fontFace: BODY, fontSize: 12, color: TONE[r.tone], bold: true,
      lineSpacing: 16, margin: 0, valign: "middle",
    });
  });

  s.addText("Sources: Safe Work Australia (2025); Jobs and Skills Australia and ABS via BSB105 Lecture 4; SpanSet Australia and Exxovantage product pages; Schwartz et al. (2023). Full details on the references slide.", {
    x: M, y: 6.72, w: 11.9, h: 0.35,
    fontFace: BODY, fontSize: 10.5, color: MUTED, margin: 0,
  });

  s.addNotes("This is the validation slide. Land row 3 and row 4 hardest — the price range is not supported by either Australian supplier, and the 55+ block collapses two very different participation rates.");
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
    { e: "Currency",  f: "The briefing has no date of its own, and years only appeared when I pushed. The one study I could trace is from 2023." },
    { e: "Relevance", f: "It assumes the depot conditions I supplied; it verified none of them. It does answer the decision the leadership team faces, at a length they'd read." },
    { e: "Authority", f: "Built on vendor material and overseas trials. No NHVR, no Safe Work Australia — no Australian regulator appears unless I name one." },
    { e: "Accuracy",  f: "When I checked, the muscle-activity range was overstated — 12–27%, not 15–30%. The costing failed completely: no Australian supplier publishes a price in that band." },
    { e: "Purpose",   f: "Written to persuade a board to fund a trial. That's the real risk: it sounds certain about evidence that isn't strong enough yet." },
  ];

  els.forEach((el, i) => {
    const y = 1.95 + i * 0.98;
    s.addShape(pres.ShapeType.roundRect, {
      x: M - 0.15, y, w: 12.2, h: 0.86, rectRadius: 0.06,
      fill: { color: i % 2 === 0 ? PAPER : "FAFCFE" }, line: { color: "E7EDF3", width: 1 },
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
    fontFace: BODY, fontSize: 13, bold: true, color: LIGHTA, charSpacing: 2.5, margin: 0,
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
    s.addShape(pres.ShapeType.rect, { x, y: 2.95, w: 0.55, h: 0.025, fill: { color: LIGHTA } });
    s.addText(pt.k, {
      x, y: 3.18, w: 3.7, h: 0.35,
      fontFace: HEAD, fontSize: 15.5, bold: true, color: SAGE, margin: 0,
    });
    s.addText(pt.v, {
      x, y: 3.56, w: 3.7, h: 0.7,
      fontFace: BODY, fontSize: 14, color: "C3CEDA", lineSpacing: 20, margin: 0, valign: "top",
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 4.45, w: 11.9, h: 2.4, rectRadius: 0.08, fill: { color: "1F6BAE" },
  });
  s.addText("RECOMMENDATION TO FOLLOWMONT", {
    x: M + 0.45, y: 4.68, w: 11, h: 0.3,
    fontFace: BODY, fontSize: 11.5, bold: true, color: "D6E4F2", charSpacing: 2, margin: 0,
  });
  s.addText("Proceed — but to a measured trial, not a rollout.", {
    x: M + 0.45, y: 5.02, w: 11, h: 0.45,
    fontFace: HEAD, fontSize: 24, bold: true, color: WHITE, margin: 0,
  });
  s.addText("The barrier is real — I confirmed that myself. The technology is not yet proven for Australian road freight — the evidence comes from overseas labs, and no Australian supplier supports the price range. Trial it at one depot for six months against two measures recorded before it starts: body-stressing claims and time-loss days. That turns an unproven recommendation into something Followmont can actually test.", {
    x: M + 0.45, y: 5.56, w: 11, h: 1.2,
    fontFace: BODY, fontSize: 13.5, color: "EAF2F9", lineSpacing: 19, margin: 0, valign: "top",
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
    { t: "CRAAP test",
      d: "Australian Education Research Organisation. (2022). Evaluating non-academic sources: The CRAAP test. https://www.edresearch.edu.au/guides-resources/practice-resources/evaluating-non-academic-sources-craap-test" },
    { t: "Injury and claims data",
      d: "Safe Work Australia. (2025). Key work health and safety statistics Australia. https://data.safeworkaustralia.gov.au/insights/key-whs-statistics-australia/latest-release" },
    { t: "Workforce participation",
      d: "Jobs and Skills Australia & Australian Bureau of Statistics, as cited in BSB105 The Future Enterprise, Lecture 4 (2026). Participation rate 69.6% (55–64); 16.3% (65+)." },
    { t: "Client provocation",
      d: "Followmont Transport. (2026, July). Presentation to Queensland University of Technology." },
    { t: "Vendor sources",
      d: "SpanSet Australia. OmniSuit exoskeleton. https://www.spanset.com/au-en/products/omnisuit-33654 · Exxovantage. Back exoskeletons. https://www.exxovantage.com/back-exoskeletons" },
    { t: "Exoskeleton evidence",
      d: "Schwartz, M., Desbrosses, K., Theurel, J., & Mornieux, G. (2023). Biomechanical consequences of using passive and active back-support exoskeletons during different manual handling tasks. International Journal of Environmental Research and Public Health, 20(15), 6468. https://doi.org/10.3390/ijerph20156468" },
    { t: "GenAI acknowledgement",
      d: "Claude (Anthropic) was used to generate all AI content analysed here, in a single conversation, August 2026. Full transcript retained and available on request." },
  ];

  let ry = 1.72;
  refs.forEach((r) => {
    const chars = r.t.length + 3 + r.d.length;
    const lines = Math.max(1, Math.ceil(chars / 150));
    const h = lines * 0.245 + 0.06;
    s.addText(
      [
        { text: r.t + " — ", options: { bold: true, color: TERRA } },
        { text: r.d,         options: { color: INK } },
      ],
      {
        x: M, y: ry, w: 11.9, h,
        fontFace: BODY, fontSize: 11.5, lineSpacing: 16, margin: 0, valign: "top",
      }
    );
    ry += h + 0.2;
  });

  s.addText("All URLs accessed 17 August 2026.", {
    x: M, y: 6.95, w: 11.9, h: 0.3,
    fontFace: BODY, fontSize: 11, italic: true, color: MUTED, margin: 0,
  });

  s.addNotes("Do not read this slide aloud. Leave it on screen while you close. If asked, the AI transcript is retained and can be provided.");
}

pres.writeFile({ fileName: "Followmont-Prompt-Chain.pptx" }).then(() => console.log("written"));
