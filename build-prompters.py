import re, html

TEMPLATE = """<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap">

<style>
/* Single-theme by design: a prompter is always dark, on any host. */
:root{{
  --ground:#0a0d0f; --panel:#12171a; --edge:#232c31;
  --text:#f1f4f1; --dim:#8c979d;
  --go:{accent}; --go-ink:{accent_ink}; --cue:#dda869;
  --sans:"IBM Plex Sans","Helvetica Neue",Arial,sans-serif;
  --mono:"IBM Plex Mono",ui-monospace,Menlo,monospace;
}}
*{{box-sizing:border-box}}
html,body{{height:100%}}
body{{
  margin:0;background:var(--ground);color:var(--text);
  font-family:var(--sans);overflow:hidden;display:flex;flex-direction:column;
}}

#bar{{
  flex:0 0 auto;background:var(--panel);border-bottom:1px solid var(--edge);
  display:flex;flex-wrap:wrap;align-items:center;gap:8px 18px;padding:10px 16px;
  font-family:var(--mono);font-size:.78rem;
}}
#tag{{
  background:var(--go);color:var(--go-ink);font-weight:600;
  padding:5px 10px;border-radius:3px;letter-spacing:.08em;font-size:.7rem;
}}
.grp{{display:flex;align-items:center;gap:6px}}
.lbl{{color:var(--dim);letter-spacing:.06em;text-transform:uppercase;font-size:.68rem}}
button{{
  font-family:var(--mono);font-size:.78rem;font-weight:500;
  background:transparent;color:var(--text);border:1px solid var(--edge);
  border-radius:3px;padding:5px 10px;cursor:pointer;line-height:1;
}}
button:hover{{border-color:var(--go);color:var(--go)}}
button:focus-visible{{outline:2px solid var(--go);outline-offset:2px}}
button.on{{background:var(--go);border-color:var(--go);color:var(--go-ink)}}
#play{{min-width:92px;font-weight:600}}
.val{{min-width:44px;text-align:center;color:var(--go);font-variant-numeric:tabular-nums}}
#clock{{
  margin-left:auto;display:flex;align-items:baseline;gap:8px;
  font-variant-numeric:tabular-nums;letter-spacing:-.01em
}}
#elapsed{{font-size:1.35rem;font-weight:600}}
#elapsed.over{{color:var(--cue)}}
#target{{color:var(--dim)}}
#progress{{flex:0 0 auto;height:2px;background:var(--edge)}}
#bar-fill{{height:100%;width:0;background:var(--go);transition:width .1s linear}}

#stage{{position:relative;flex:1 1 auto;overflow:hidden}}
#viewport{{
  position:absolute;inset:0;overflow:hidden;
  -webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 16%,#000 76%,transparent 99%);
  mask-image:linear-gradient(to bottom,transparent 0,#000 16%,#000 76%,transparent 99%);
}}
#track{{
  padding:38vh 6vw 75vh;max-width:34ch;margin:0 auto;
  font-size:34px;line-height:1.45;font-weight:400;will-change:transform;
}}
#rule{{
  position:absolute;left:0;right:0;top:38%;height:0;pointer-events:none;
  border-top:1px solid color-mix(in srgb,var(--go) 45%,transparent);
}}
#rule::before,#rule::after{{content:"";position:absolute;top:-5px;border:5px solid transparent}}
#rule::before{{left:0;border-left-color:var(--go)}}
#rule::after{{right:0;border-right-color:var(--go)}}

.tc{{
  font-family:var(--mono);font-size:.42em;font-weight:600;color:var(--go);
  letter-spacing:.1em;margin:1.6em 0 .5em;
}}
.tc span{{color:var(--dim);font-weight:400;margin-left:.9em;letter-spacing:.04em}}
.cue{{
  font-family:var(--mono);font-size:.4em;line-height:1.5;color:var(--cue);
  border-left:2px solid var(--cue);padding-left:.8em;margin:0 0 1.1em;
}}
p.say{{margin:0 0 .85em}}
p.say em{{font-style:normal;color:var(--go)}}
p.opt{{border-left:2px dashed var(--cue);padding-left:.7em;margin-left:-.9em}}
p.opt::before{{
  content:"OPTIONAL — SKIP IF RUNNING LONG";display:block;
  font-family:var(--mono);font-size:.36em;letter-spacing:.12em;color:var(--cue);
  margin-bottom:.5em;
}}
#end{{
  font-family:var(--mono);font-size:.46em;color:var(--dim);
  letter-spacing:.12em;margin-top:2em;
}}

#help{{
  flex:0 0 auto;background:var(--panel);border-top:1px solid var(--edge);
  padding:8px 16px;font-family:var(--mono);font-size:.68rem;color:var(--dim);
  display:flex;flex-wrap:wrap;gap:6px 20px;
}}
#help b{{color:var(--text);font-weight:500}}
@media (max-width:700px){{
  #track{{font-size:26px;max-width:26ch}}
  #clock{{margin-left:0}}
}}
</style>

<div id="bar">
  <span id="tag">{tag}</span>
  <div class="grp">
    <button id="play">&#9654;  Start</button>
    <button id="reset">Restart</button>
  </div>
  <div class="grp">
    <span class="lbl">Speed</span>
    <button data-spd="-1">&minus;</button><span class="val" id="spdVal">1.00&times;</span><button data-spd="1">+</button>
  </div>
  <div class="grp">
    <span class="lbl">Text</span>
    <button data-size="-1">&minus;</button><span class="val" id="sizeVal">34</span><button data-size="1">+</button>
  </div>
  <div class="grp">
    <button id="mirror">Mirror</button>
    <button id="full">Full screen</button>
  </div>
  <div id="clock"><span id="elapsed">0:00</span><span id="target">/ {target_label} target</span></div>
</div>
<div id="progress"><div id="bar-fill"></div></div>

<div id="stage">
  <div id="viewport">
    <div id="track">
{body}
      <div id="end">&mdash; end of script &mdash; hold still for two seconds before you stop recording &mdash;</div>
    </div>
  </div>
  <div id="rule"></div>
</div>

<div id="help">
  <span><b>Space</b> start / pause</span>
  <span><b>&uarr; &darr;</b> speed</span>
  <span><b>+ &minus;</b> text size</span>
  <span><b>R</b> restart</span>
  <span><b>M</b> mirror</span>
  <span><b>PgUp / PgDn</b> jump a screen</span>
</div>

<script>
(function(){{
  var TARGET = {target_secs};
  var KEY = '{store_key}';
  var track = document.getElementById('track');
  var viewport = document.getElementById('viewport');
  var playBtn = document.getElementById('play');
  var elapsedEl = document.getElementById('elapsed');
  var fill = document.getElementById('bar-fill');
  var spdVal = document.getElementById('spdVal');
  var sizeVal = document.getElementById('sizeVal');

  var pos = 0, distance = 1, base = 30, speed = 1, size = 34;
  var playing = false, elapsed = 0, last = null, mirrored = false;

  function store(k,v){{ try{{ localStorage.setItem(KEY+'.'+k,v); }}catch(e){{}} }}
  function load(k,d){{ try{{ var v = localStorage.getItem(KEY+'.'+k); return v===null?d:v; }}catch(e){{ return d; }} }}

  size = parseFloat(load('size', 34)) || 34;
  speed = parseFloat(load('speed', 1)) || 1;

  function measure(){{
    var ratio = distance > 1 ? pos / distance : 0;
    track.style.fontSize = size + 'px';
    distance = Math.max(1, track.scrollHeight - viewport.clientHeight * 0.62);
    base = distance / TARGET;
    pos = ratio * distance;
    render();
  }}

  function fmt(s){{
    s = Math.max(0, Math.floor(s));
    return Math.floor(s/60) + ':' + String(s%60).padStart(2,'0');
  }}

  function render(){{
    track.style.transform =
      'translateY(' + (-pos).toFixed(2) + 'px)' + (mirrored ? ' scaleX(-1)' : '');
    fill.style.width = Math.min(100, pos/distance*100) + '%';
    elapsedEl.textContent = fmt(elapsed);
    elapsedEl.classList.toggle('over', elapsed > TARGET + 10);
    spdVal.textContent = speed.toFixed(2) + '\\u00d7';
    sizeVal.textContent = Math.round(size);
  }}

  function frame(t){{
    if(!playing) return;
    if(last === null) last = t;
    var dt = Math.min(0.25, (t - last)/1000);
    last = t;
    elapsed += dt;
    pos += base * speed * dt;
    if(pos >= distance){{ pos = distance; setPlaying(false); }}
    render();
    if(playing) requestAnimationFrame(frame);
  }}

  function setPlaying(v){{
    playing = v;
    playBtn.innerHTML = v ? '\\u275a\\u275a  Pause' : (pos > 0 ? '\\u25b6  Resume' : '\\u25b6  Start');
    playBtn.classList.toggle('on', v);
    last = null;
    if(v) requestAnimationFrame(frame);
  }}

  playBtn.onclick = function(){{ setPlaying(!playing); }};
  document.getElementById('reset').onclick = function(){{
    setPlaying(false); pos = 0; elapsed = 0; render();
  }};
  document.getElementById('mirror').onclick = function(){{
    mirrored = !mirrored;
    this.classList.toggle('on', mirrored);
    render();
  }};

  function bump(kind, dir){{
    if(kind === 'spd'){{
      speed = Math.min(3, Math.max(0.3, +(speed + dir*0.05).toFixed(2)));
      store('speed', speed);
      render();
    }} else {{
      size = Math.min(72, Math.max(18, size + dir*2));
      store('size', size);
      measure();
    }}
  }}
  Array.prototype.forEach.call(document.querySelectorAll('[data-spd]'), function(b){{
    b.onclick = function(){{ bump('spd', +b.dataset.spd); }};
  }});
  Array.prototype.forEach.call(document.querySelectorAll('[data-size]'), function(b){{
    b.onclick = function(){{ bump('size', +b.dataset.size); }};
  }});

  var fullBtn = document.getElementById('full');
  if(document.fullscreenEnabled){{
    fullBtn.onclick = function(){{
      try{{
        if(document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
      }}catch(e){{}}
    }};
  }} else {{ fullBtn.hidden = true; }}

  document.addEventListener('keydown', function(e){{
    if(e.target.tagName === 'BUTTON' && e.key === ' ') e.target.blur();
    switch(e.key){{
      case ' ':        e.preventDefault(); setPlaying(!playing); break;
      case 'ArrowUp':  e.preventDefault(); bump('spd', 1); break;
      case 'ArrowDown':e.preventDefault(); bump('spd', -1); break;
      case '+': case '=': e.preventDefault(); bump('size', 1); break;
      case '-': case '_': e.preventDefault(); bump('size', -1); break;
      case 'r': case 'R': document.getElementById('reset').click(); break;
      case 'm': case 'M': document.getElementById('mirror').click(); break;
      case 'PageDown': e.preventDefault();
        pos = Math.min(distance, pos + viewport.clientHeight*0.6); render(); break;
      case 'PageUp':   e.preventDefault();
        pos = Math.max(0, pos - viewport.clientHeight*0.6); render(); break;
    }}
  }});

  window.addEventListener('resize', measure);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  measure();
}})();
</script>
"""

MARCH = [
 ("0:00", "OPEN", "On screen: the March brief, or just your face.", [
   ("say", "Hi Eva. Thanks for sending your numbers through — I've turned them into a proper set of financial statements for March. In the next three minutes you'll know what you earned, what you're worth, and where your cash actually went."),
 ]),
 ("0:15", "THE THREE QUESTIONS", "On screen: zoom out so all three blocks are visible.", [
   ("say", "I've built three statements, and each one answers a different question. The Income Statement: did I get richer or poorer this month? The Balance Sheet: what am I worth right now? The Cash Flow Statement: where did the money in my bank actually go?"),
 ]),
 ("0:35", "INCOME STATEMENT", "On screen: left block. Revenue → Expenses → the green Net Income cell.", [
   ("say", "Start on the left. Money in for March: six thousand, one hundred and thirty dollars. Salary $5,200, freelance tutoring $480, $350 of dividends from your ETF, and the $100 Uber Eats gift card from Uncle Wayne. That gift card counts as income — you didn't work for it, but you're a hundred dollars better off."),
   ("opt", "Money out was three thousand and thirty-six dollars — rent $917, groceries $661, vehicle costs $480, dining out $320, and six smaller items."),
   ("say", "Two are worth a pause. The gym went on your credit card, and the electricity hasn't been paid — but both are still March expenses, because you used them in March. An expense counts when you <em>use</em> the thing, not when the money leaves."),
   ("say", "And notice what's missing: the $1,000 holiday deposit. That isn't an expense — you haven't taken the holiday. That money is still yours, just parked somewhere else."),
   ("say", "Money in, minus money out: your net income for March was three thousand and ninety-four dollars."),
 ]),
 ("1:35", "BALANCE SHEET", "On screen: middle block. Assets → Liabilities → Net assets → Equity.", [
   ("say", "Now the middle column — the Balance Sheet. It's a photograph of a single day: the 31st of March."),
   ("say", "Everything you own: fifty-nine thousand, eight hundred and thirty-one dollars. The ETF is the big one at $34,000, then the bank at $9,752 and the car at $7,700 — plus the holiday deposit and the gift card, because you're still holding both."),
   ("say", "Everything you owe: two thousand, eight hundred and seventy-three. Personal loan $2,200, credit card $570, unpaid electricity $103."),
   ("say", "Own minus owe is your net worth: fifty-six thousand, nine hundred and fifty-eight dollars."),
   ("say", "And here's the check I like. You started March worth $53,864. Add the $3,094 you made, and you land exactly on $56,958. Two completely different routes to the same number."),
 ]),
 ("2:15", "CASH FLOW · KEY INSIGHT", "On screen: right block. Net cash flow $1,752, then $8,000 → $9,752.", [
   ("say", "Third column: cash. Six thousand and thirty came in, four thousand two hundred and seventy-eight went out, so your bank grew $1,752 — from $8,000 to $9,752."),
   ("say", "Cash in is $100 lower than income, because the gift card never touched your bank. And the $1,000 deposit and the $410 you paid off February's credit card were cash going out that weren't expenses at all."),
   ("say", "So you made $3,094 but your bank only grew $1,752. Here's the bridge: start at $3,094, take out the $100 gift card, add back the $168 you expensed but didn't pay, then subtract the $1,410 you paid but didn't expense. One thousand, seven hundred and fifty-two. Exactly."),
   ("say", "That gap is the thing to watch, Eva. Profit is not the same as cash — and it's cash that buys the apartment."),
 ]),
 ("2:50", "CLOSE · SLOW DOWN", "On screen: back to the balance sheet, or just your face.", [
   ("say", "So — March made you $3,094 better off, you're worth $56,958, and you owe $2,873. In the next video I'll show you what April did to those numbers."),
 ]),
]

APRIL = [
 ("0:00", "OPEN", "On screen: the April transaction list, or just your face.", [
   ("say", "Hi Eva. Last time we worked out you were worth $56,958 at the end of March. Now let's look at the seven April transactions you sent me, and what each one actually did to you."),
 ]),
 ("0:12", "THE RULE", "On screen: the equation header row — ASSETS − LIABILITIES = OPENING EQUITY + (REVENUE − EXPENSES).", [
   ("say", "I've run them through the accounting equation: what you own, minus what you owe, equals your net worth — and your net worth only moves through income and expenses. The rule to hold on to is that every transaction does two things, never one."),
 ]),
 ("0:30", "THE EASY FOUR", "On screen: walk down the salary, casino, phone and fine rows.", [
   ("say", "Easy ones first. Your salary, $2,718, and the $48 you won at the casino — cash in, and both count as income. Income doesn't have to come from work. Your phone bill $96 and the traffic fine $284 — cash out, and genuinely gone. That's $380 of expenses."),
 ]),
 ("0:50", "THE THREE THAT CATCH PEOPLE", "On screen: the shoes row, then the tickets row, then the credit card row.", [
   ("say", "Three are more interesting. The running shoes, $252 on the credit card: you own $252 more, and you owe $252 more. Your net worth didn't move at all."),
   ("say", "The concert tickets, $193 — the concert isn't until December. Right now you're holding something you haven't used yet, so it isn't an expense. It becomes one the night you walk in."),
   ("say", "And paying off the credit card, $570. This is the one people get wrong. It <em>feels</em> like spending, but $570 left the bank and $570 of debt vanished at the same moment. You are exactly as well off as you were a minute before."),
 ]),
 ("1:25", "THE TOTALS", "On screen: the four boxed answers, then the balance check.", [
   ("say", "April in total: assets up $2,261, liabilities down $125, revenue up $2,766, expenses up $380. And it balances — $2,261 plus $125 is $2,386, and $2,766 minus $380 is also $2,386. Your net worth grew two thousand, three hundred and eighty-six dollars in April."),
 ]),
 ("1:45", "CLOSE · SLOW DOWN", "On screen: just your face.", [
   ("say", "So April added $2,386, and you're now worth just over $59,300. The lesson: paying off debt and buying December tickets feel like spending, but they aren't — you're moving money between pockets, not losing it. The number that gets you the apartment is cash. Call me any time."),
 ]),
]

def build(beats):
    out, words = [], 0
    for tc, label, cue, paras in beats:
        out.append('      <div class="tc">%s <span>%s</span></div>' % (tc, label))
        out.append('      <p class="cue">%s</p>' % cue)
        for kind, text in paras:
            cls = "say opt" if kind == "opt" else "say"
            out.append('      <p class="%s">%s</p>' % (cls, text))
            words += len(re.sub(r"<[^>]+>", "", text).split())
    return "\n".join(out), words

for fn, title, tag, accent, ink, secs, label, key, beats in [
  ("eva-prompter-march.html", "Eva's March Prompter", "MARCH &middot; EXERCISE 1",
   "#5fc0a2", "#06231b", 200, "3:20", "pm.march", MARCH),
  ("eva-prompter-april.html", "Eva's April Prompter", "APRIL &middot; EXERCISE 2",
   "#6fb6dd", "#062231", 125, "2:05", "pm.april", APRIL),
]:
    body, words = build(beats)
    open("/home/user/My-computer-claude-code/"+fn, "w").write(TEMPLATE.format(
        title=title, tag=tag, accent=accent, accent_ink=ink,
        target_secs=secs, target_label=label, store_key=key, body=body))
    print("%-28s %4d words  target %s  = %.0f wpm" % (fn, words, label, words/(secs/60)))
