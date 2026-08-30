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
 ("0:00", "OPEN", "Just your face, then share the workbook.", [
   ("say", "Hi Eva. I've taken everything you gave me for March and built three statements. I'll go through them one at a time, left to right, and for each one I'll tell you what it means and where its totals come from."),
 ]),

 ("0:15", "STATEMENT 1 &middot; WHAT IT IS", "Point at the whole left-hand block.", [
   ("say", "First statement: the Income Statement. It answers one question — did you get richer or poorer during March? It has two halves. Revenue, and expenses."),
 ]),
 ("0:25", "REVENUE", "Point at the green Revenue heading, then the total.", [
   ("say", "Revenue is everything that came in and left you better off. Yours adds up to six thousand, one hundred and thirty dollars. That's your salary, your freelance tutoring, the dividends your ETF paid you, and the hundred-dollar Uber Eats gift card from your uncle."),
   ("say", "The gift card surprises people. You didn't work for it, and no money hit your bank. But you're a hundred dollars better off than you were, so it's revenue."),
 ]),
 ("0:55", "EXPENSES", "Point at the Expenses heading and total. Then rest on the gym line, then electricity.", [
   ("say", "Expenses are what it cost you to live for the month. Yours come to three thousand and thirty-six dollars — rent, groceries, the car, insurance, and so on."),
   ("say", "Two are worth explaining, because they're the ones people get wrong. Your gym membership went on your credit card, so you haven't paid a cent for it yet — but you used the gym in March, so it's a March expense. Your electricity bill hasn't even arrived. Same thing. You used the power in March, so it counts in March."),
   ("say", "That's the rule: an expense counts when you <em>use</em> the thing, not when you pay for it."),
 ]),
 ("1:35", "NET INCOME", "Point at the green Net Income cell.", [
   ("say", "Revenue minus expenses gives net income — this green cell. Three thousand and ninety-four dollars. That is how much better off March made you."),
 ]),

 ("1:45", "STATEMENT 2 &middot; WHAT IT IS", "Move to the middle block. Point at the whole thing.", [
   ("say", "Second statement: the Balance Sheet. This one isn't about the month at all. It's a photograph of a single day — the 31st of March. It has three parts. Assets, liabilities, and net assets."),
 ]),
 ("1:55", "ASSETS", "Point at the Assets heading, then the total.", [
   ("say", "Assets are everything you own that has value. Yours add up to fifty-nine thousand, eight hundred and thirty-one dollars — your ETF, your bank account, your car, your camping gear, your laptop."),
   ("say", "Two you might not expect. The thousand-dollar holiday deposit is an asset, because you still own that trip — you just haven't taken it yet. And the gift card, because you haven't spent it."),
 ]),
 ("2:25", "LIABILITIES", "Point at the Liabilities heading, then the total. Rest on the electricity line.", [
   ("say", "Liabilities are the opposite. Everything you owe to somebody else. Yours come to two thousand, eight hundred and seventy-three dollars — your personal loan, your credit card balance, and that electricity bill."),
   ("say", "Notice the electricity turns up twice. It's an expense on the first statement because you used the power. It's a liability here because you still owe the money. That's normal — one thing, two effects."),
 ]),
 ("2:50", "NET ASSETS", "Point at the Net assets box.", [
   ("say", "Net assets is simply assets minus liabilities. What you own, take away what you owe. Fifty-six thousand, nine hundred and fifty-eight dollars. That's your net worth — the one number that says how you're really doing."),
 ]),
 ("3:00", "THE CHECK", "Point at the equity rows underneath — 53,864 plus 3,094.", [
   ("opt", "And underneath there's a check. You started March worth fifty-three thousand, eight hundred and sixty-four. Add the three thousand and ninety-four you earned during the month, and you land on exactly the same fifty-six, nine-five-eight. Two different routes to the same number, so I know it's right."),
 ]),

 ("3:15", "STATEMENT 3 &middot; WHAT IT IS", "Move to the right-hand block.", [
   ("say", "Third statement: the Cash Flow Statement. This one only cares about real money moving in and out of your bank account. Nothing else."),
 ]),
 ("3:25", "CASH IN AND CASH OUT", "Point at the receipts total, then the payments total.", [
   ("say", "Cash in was six thousand and thirty. That's a hundred dollars less than your revenue, because the gift card was never cash."),
   ("say", "Cash out was four thousand, two hundred and seventy-eight. And here's the interesting part. The gym and the electricity aren't in there at all, because no money actually moved. But the holiday deposit is, and so is the payment you made on February's credit card — real money left your account, even though neither one is a March expense."),
 ]),
 ("3:55", "NET CASH FLOW", "Point at the net cash flow figure, then the two bank balances.", [
   ("say", "Cash in minus cash out: your bank grew one thousand, seven hundred and fifty-two dollars. From eight thousand at the start of March, to nine thousand, seven hundred and fifty-two at the end."),
   ("say", "So March made you three thousand better off, but your bank only grew seventeen hundred. Both are true. Profit and cash are not the same thing — and it's the cash that buys the apartment."),
 ]),
 ("4:15", "BRIDGE", "Back to your face.", [
   ("say", "That's March. Now let's look at April."),
 ]),
]

APRIL = [
 ("0:00", "OPEN", "Switch to the April tab.", [
   ("say", "Now April. This one works differently. Instead of building statements, we track seven transactions and see what each one did to you. The tool is this equation across the top."),
 ]),
 ("0:12", "THE FOUR COLUMNS", "Point at each column heading in turn as you name it.", [
   ("say", "Four things can change. Assets — what you own. Liabilities — what you owe. Revenue — what leaves you better off. Expenses — what leaves you worse off. And the rule is that every transaction changes two of them. Never just one."),
 ]),
 ("0:32", "THE FOUR EASY ONES", "Walk down the salary, casino, phone and fine rows as you say them.", [
   ("say", "Four of the seven are straightforward. Your salary came in — assets up, and it's revenue. You won money at the casino — assets up again, and that's revenue too. You didn't work for it, but you're better off, so it counts. Your phone bill went out — assets down, and that's an expense. Your traffic fine, the same."),
   ("say", "Between them, revenue went up two thousand, seven hundred and sixty-six dollars, and expenses went up three hundred and eighty."),
 ]),
 ("1:05", "THE THREE THAT CATCH PEOPLE", "The shoes row, then the tickets row, then the credit card row.", [
   ("say", "The other three are the interesting ones. You bought running shoes on your credit card. You own the shoes now, so assets go up — but you owe the card the same amount, so liabilities go up too. They cancel out. You're not worse off."),
   ("say", "You bought concert tickets, also on the card. Same cancelling — but with an extra point. The concert is in December. You haven't used those tickets yet, so it isn't an expense. It becomes one the night you go."),
   ("say", "And you paid off your credit card bill. Money left your account, so assets go down — but the debt went away, so liabilities go down by exactly the same amount. It <em>feels</em> like spending. It isn't. Your net worth didn't move at all."),
 ]),
 ("1:50", "YOUR FOUR ANSWERS", "Point at each of the four boxed answers in turn.", [
   ("say", "So, your four answers. Assets up two thousand, two hundred and sixty-one. Liabilities actually down a hundred and twenty-five, because you paid off more than you charged. Revenue up two thousand, seven hundred and sixty-six. Expenses up three hundred and eighty."),
   ("say", "And it balances. Assets minus liabilities is two thousand three hundred and eighty-six — and revenue minus expenses is the same two thousand three hundred and eighty-six. That's how I know nothing's been missed. April left you two thousand, three hundred and eighty-six dollars better off."),
 ]),
 ("2:20", "CLOSE &middot; SLOW DOWN", "Just your face.", [
   ("say", "So that's where you stand, Eva. Your net worth is growing. The main thing to keep an eye on is the gap between what you earn and what actually lands in your bank."),
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
   "#5fc0a2", "#06231b", 260, "4:20", "pm.march", MARCH),
  ("eva-prompter-april.html", "Eva's April Prompter", "APRIL &middot; EXERCISE 2",
   "#6fb6dd", "#062231", 150, "2:30", "pm.april", APRIL),
]:
    body, words = build(beats)
    open("/home/user/My-computer-claude-code/"+fn, "w").write(TEMPLATE.format(
        title=title, tag=tag, accent=accent, accent_ink=ink,
        target_secs=secs, target_label=label, store_key=key, body=body))
    print("%-28s %4d words  target %s  = %.0f wpm" % (fn, words, label, words/(secs/60)))
