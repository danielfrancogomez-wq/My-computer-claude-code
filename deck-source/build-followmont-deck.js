const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.author = "Business Assessment";
pres.title = "Five Prompts, One Client Problem";

// ---- palette -------------------------------------------------------------
const DARK   = "2E2A28"; // deep charcoal-brown  (title + closing)
const TERRA  = "B85042"; // terracotta           (accent / numerals)
const SAND   = "E7E8D1"; // sand                 (result cards)
const SAGE   = "A7BEAE"; // sage                 (quiet accent)
const PAPER  = "F4F1EE"; // warm off-white       (ask cards)
const INK    = "2E2A28";
const MUTED  = "7A736E";
const WHITE  = "FFFFFF";

const HEAD = "Cambria";
const BODY = "Calibri";

const M = 0.7;            // page margin
const W = 13.3;

function softShadow() {
  return { type: "outer", angle: 90, blur: 12, offset: 2, color: "000000", opacity: 0.08 };
}

// ---- 1. TITLE ------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: DARK };

  s.addText("GENAI PROMPT CHAIN", {
    x: M, y: 1.75, w: 8, h: 0.3,
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

  s.addText("First-year business assessment", {
    x: M, y: 6.05, w: 6, h: 0.35,
    fontFace: BODY, fontSize: 13, color: "9A928C", margin: 0,
  });

  s.addNotes("Open here. One sentence on what the assessment asked for, then move on.");
}

// ---- 2. THE CLIENT -------------------------------------------------------
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

// ---- 3. THE CHAIN AT A GLANCE -------------------------------------------
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
    { n: "01", t: "Set the method",  d: "Agree the rules before touching the problem" },
    { n: "02", t: "Ask it badly",    d: "The generic question, on purpose" },
    { n: "03", t: "Add the client",  d: "Real operation, real constraints" },
    { n: "04", t: "Ask for receipts", d: "A source for every number" },
    { n: "05", t: "Make it useful",  d: "One page for the leadership team" },
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

// ---- 4-8. PROMPT SLIDES --------------------------------------------------
const prompts = [
  {
    n: "01",
    title: "Set the method",
    ask: "Before the client problem: what makes a prompt well designed, what do you do badly when I ask for research with citations, and how should I sequence prompts so each builds on the last?",
    got: "A workable method — and an admission worth keeping: it can produce citations that look right and aren't.",
    note: "The rules of the game, agreed before the game starts.",
    notes: "Explain why the first prompt is not about the client at all.",
  },
  {
    n: "02",
    title: "Ask it badly",
    ask: "How might we harness data and technology to improve the workforce participation of transport and logistics workers aged 55 and over?",
    got: "Six interventions. No country, no client, no evidence. Perfectly reasonable and completely unusable.",
    note: "The baseline. Deliberately generic, so there is something to compare against.",
    notes: "Stress that this was on purpose. It is the control, not a mistake.",
  },
  {
    n: "03",
    title: "Add the client",
    ask: "Here is Followmont. Here is the technology they already run — don't propose it again. Pick one technology and aim it at one barrier: the physical load of the job.",
    got: "Exoskeletons. Specific, confident, costed — and still not a single source.",
    note: "Specificity changed the vocabulary. It did not change the evidence.",
    notes: "The key move: blocking the tech they already run forces genuinely new reasoning.",
  },
  {
    n: "04",
    title: "Ask for receipts",
    ask: "Give me a source for every number you just used. If you can't find one, say so. And why didn't you mention Australian regulation once?",
    got: "Some claims held up. Some numbers had no source behind them. The Australian gap was real and it admitted it.",
    note: "Pressure is what produced the evidence — detail alone never did.",
    notes: "This is the slide that carries the argument. Slow down here.",
  },
  {
    n: "05",
    title: "Make it useful",
    ask: "Pull it together as a one-page briefing for Followmont's leadership: recommendation, cost, risks, and what they would measure. Don't smooth over the gaps.",
    got: "A briefing a manager could act on, with the weak evidence still labelled as weak.",
    note: "A usable output that is honest about what it doesn't know.",
    notes: "Close the chain. Hand over to the critique you deliver verbally.",
  },
];

prompts.forEach((p) => {
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText(p.n, {
    x: M, y: 0.7, w: 1.4, h: 1.0,
    fontFace: HEAD, fontSize: 54, bold: true, color: TERRA, margin: 0, valign: "middle",
  });
  s.addText(p.title, {
    x: 2.0, y: 0.7, w: 10.6, h: 1.0,
    fontFace: HEAD, fontSize: 38, bold: true, color: INK, margin: 0, valign: "middle",
  });

  const cardY = 2.3, cardH = 2.95, cardW = 5.75;

  // Ask card
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: cardY, w: cardW, h: cardH, rectRadius: 0.08,
    fill: { color: PAPER }, line: { color: "E6E0DA", width: 1 }, shadow: softShadow(),
  });
  s.addText("WHAT I ASKED", {
    x: M + 0.4, y: cardY + 0.35, w: cardW - 0.8, h: 0.3,
    fontFace: BODY, fontSize: 11.5, bold: true, color: MUTED, charSpacing: 2, margin: 0,
  });
  s.addText(p.ask, {
    x: M + 0.4, y: cardY + 0.8, w: cardW - 0.8, h: cardH - 1.2,
    fontFace: BODY, fontSize: 17, color: INK, lineSpacing: 26, margin: 0, valign: "top",
  });

  // Result card
  const rx = M + cardW + 0.4;
  s.addShape(pres.ShapeType.roundRect, {
    x: rx, y: cardY, w: cardW, h: cardH, rectRadius: 0.08,
    fill: { color: SAND }, line: { color: "D8DAC0", width: 1 }, shadow: softShadow(),
  });
  s.addText("WHAT CAME BACK", {
    x: rx + 0.4, y: cardY + 0.35, w: cardW - 0.8, h: 0.3,
    fontFace: BODY, fontSize: 11.5, bold: true, color: "6E7A5E", charSpacing: 2, margin: 0,
  });
  s.addText(p.got, {
    x: rx + 0.4, y: cardY + 0.8, w: cardW - 0.8, h: cardH - 1.2,
    fontFace: BODY, fontSize: 17, color: INK, lineSpacing: 26, margin: 0, valign: "top",
  });

  s.addText(p.note, {
    x: M, y: 5.95, w: 11.9, h: 0.5,
    fontFace: BODY, fontSize: 17, italic: true, color: TERRA, margin: 0,
  });

  s.addNotes(p.notes);
});

// ---- 9. CLOSING ----------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: DARK };

  s.addText("WHAT THE CHAIN SHOWED", {
    x: M, y: 1.35, w: 8, h: 0.3,
    fontFace: BODY, fontSize: 13, bold: true, color: TERRA, charSpacing: 2.5, margin: 0,
  });

  s.addText("Detail changed how the answer sounded.\nPressure changed what it could prove.", {
    x: M, y: 1.95, w: 11.4, h: 1.7,
    fontFace: HEAD, fontSize: 36, bold: true, color: WHITE, lineSpacing: 48, margin: 0,
  });

  const points = [
    { k: "The generic answer", v: "was fluent and unusable" },
    { k: "The specific answer", v: "was confident and still unsourced" },
    { k: "Only the direct challenge", v: "separated the evidence from the filler" },
  ];
  points.forEach((pt, i) => {
    const x = M + i * 4.07;
    s.addShape(pres.ShapeType.rect, { x, y: 4.5, w: 0.55, h: 0.025, fill: { color: TERRA } });
    s.addText(pt.k, {
      x, y: 4.75, w: 3.7, h: 0.35,
      fontFace: HEAD, fontSize: 16, bold: true, color: SAGE, margin: 0,
    });
    s.addText(pt.v, {
      x, y: 5.15, w: 3.7, h: 0.8,
      fontFace: BODY, fontSize: 15.5, color: "CFC7C1", lineSpacing: 21, margin: 0, valign: "top",
    });
  });

  s.addNotes("Land the argument, then move into the spoken critique.");
}

pres.writeFile({ fileName: "Followmont-Prompt-Chain.pptx" }).then(() => console.log("written"));
