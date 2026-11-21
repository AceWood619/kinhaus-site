// Kinhaus site script. One file for every page; each block runs only if its elements exist.
(function () {
  // ---- Settings: fill these in once the accounts exist (see README.md) ----
  var KINHAUS = {
    waitlistAction: "",   // email-list form endpoint (add its host to form-action in each page's CSP)
    tipUrl: "https://ko-fi.com/kinhaushome", // Ko-fi tip page (set 2026-11-21)
    socials: [],          // e.g. [{ name: "YouTube", url: "https://..." }]
    forumUrl: "https://github.com/AceWood619/kinhaus-site/discussions"
  };
  var $ = function (id) { return document.getElementById(id); };
  var mail = function (subject, body) {
    window.location.href = 'mailto:hello@kinhaushome.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  };
  var warn = function (el, text) { el.classList.add('warn'); el.textContent = text; };
  var ok = function (el, text) { el.classList.remove('warn'); el.textContent = text; };

  // Mobile menu: close after choosing a link
  var menu = document.querySelector('details.menu');
  if (menu) menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { menu.open = false; }); });

  // Hero finish swatch
  var hero = $('heroImg');
  if (hero) {
    var imgs = { charcoal: "img/ov2-front-charcoal.webp", white: "img/ov2-front-white.webp" };
    document.querySelectorAll('.swatch button').forEach(function (b) {
      b.addEventListener('click', function () {
        hero.src = imgs[b.dataset.src];
        hero.alt = b.dataset.src === 'white' ? 'Kinhaus Node Voice in warm off-white' : 'Kinhaus Node Voice in deep charcoal';
        document.querySelectorAll('.swatch button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      });
    });
  }

  // What-if tabs
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.scen [role="tab"]'));
  if (tabs.length) {
    var show = function (t, focus) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', on ? 'true' : 'false');
        x.tabIndex = on ? 0 : -1;
        $(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) t.focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(t); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); show(tabs[(i + 1) % tabs.length], true); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); show(tabs[(i - 1 + tabs.length) % tabs.length], true); }
      });
    });
    show(tabs[0]);
  }

  // Waitlist
  var wf = $('wlForm');
  if (wf) {
    var wm = $('wlMsg');
    if (KINHAUS.waitlistAction) wf.action = KINHAUS.waitlistAction;
    wf.addEventListener('submit', function (e) {
      var email = $('wlEmail'), consent = $('wlConsent');
      if (!email.value || !email.checkValidity()) { e.preventDefault(); warn(wm, 'Please enter a valid email address.'); email.focus(); return; }
      if (!consent.checked) { e.preventDefault(); warn(wm, 'Please tick the box so we can email you.'); consent.focus(); return; }
      if (KINHAUS.waitlistAction) return;
      e.preventDefault();
      mail('Join the Kinhaus waitlist', 'Please add ' + email.value + ' to the Kinhaus waitlist.\n\nMost interested in: ' + ($('wlInterest').value || 'not sure yet') +
        '\nRun Home Assistant: ' + ($('wlHa').value || 'not said') + '\n\nI agree to get Kinhaus updates by email and can unsubscribe any time.');
      ok(wm, "Your email app should open with a short note. Send it and you're on the list. No email app? Write to hello@kinhaushome.com.");
    });
  }

  // Pilot application
  var pf = $('plForm');
  if (pf) {
    var pm = $('plMsg');
    pf.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { return $(id).value.trim(); };
      var need = [['plName', 'your name'], ['plEmail', 'a valid email'], ['plCity', 'your city and state']];
      for (var k = 0; k < need.length; k++) {
        var el = $(need[k][0]);
        if (!el.value.trim() || !el.checkValidity()) { warn(pm, 'Please enter ' + need[k][1] + '.'); el.focus(); return; }
      }
      if (!$('plAdult').checked || !$('plTerms').checked) { warn(pm, 'Please tick both agreement boxes to apply.'); return; }
      var beta = $('plBeta').checked;
      mail('Pilot home application: ' + v('plName'),
        'Kinhaus pilot home application\n\nName: ' + v('plName') + '\nEmail: ' + v('plEmail') + '\nCity and state: ' + v('plCity') +
        '\nHome: ' + (v('plHome') || 'not said') + '\nRooms: ' + (v('plRooms') || 'not said') + '\nHome Assistant: ' + (v('plHa') || 'not said') +
        '\nWhat I want Kinhaus to do: ' + (v('plWhy') || '-') +
        '\n\nI confirm I am 18 or older and live in the United States. I have read the pilot program terms (kinhaushome.com/pilot-terms.html) and the privacy policy, and agree that Kinhaus may contact me about the pilot.' +
        '\nBeta data program (optional): ' + (beta ? 'YES, I opt in' : 'No') + '\n');
      ok(pm, "Your email app should open with your application filled in. Send it and a person will reply. No email app? Write to hello@kinhaushome.com.");
    });
  }

  // Survey
  var sf = $('svForm');
  if (sf) {
    var sm = $('svMsg');
    sf.addEventListener('submit', function (e) {
      e.preventDefault();
      var radio = function (name) { var r = sf.querySelector('input[name="' + name + '"]:checked'); return r ? r.value : '-'; };
      var checks = function (name) { return Array.prototype.map.call(sf.querySelectorAll('input[name="' + name + '"]:checked'), function (c) { return c.value; }).join('; ') || '-'; };
      if (radio('q_interest') === '-') { warn(sm, 'Please answer the first question, then send.'); return; }
      var t = function (id) { return $(id).value.trim() || '-'; };
      var body = 'KINHAUS SURVEY v1\n' +
        'Q1 interest (1-5): ' + radio('q_interest') + '\n' +
        'Q2 device: ' + radio('q_device') + '\n' +
        'Q3 exciting features: ' + checks('q_features') + '\n' +
        'Q4 how I would use it: ' + t('q_use') + '\n' +
        'Q5 what would stop me: ' + checks('q_blockers') + '\n' +
        'Q6 fair price for a Node: ' + radio('q_price') + '\n' +
        'Q7 Home Assistant: ' + radio('q_ha') + '\n' +
        'Q8 what to improve or add: ' + t('q_improve') + '\n' +
        'Publish my written answers anonymously: ' + ($('q_quote').checked ? 'YES' : 'No') + '\n' +
        'Contact me about my answers: ' + ($('q_contact').checked ? 'YES' : 'No') + '\n';
      mail('Kinhaus survey response', body);
      ok(sm, 'Your email app should open with your answers filled in. Send it and they count. Thank you.');
    });
  }

  // Tip button and socials
  if (KINHAUS.tipUrl && $('tipBtn')) { $('tipBtn').href = KINHAUS.tipUrl; $('tipBtn').hidden = false; if ($('tipSoon')) $('tipSoon').hidden = true; }
  var soc = $('socials');
  if (soc) KINHAUS.socials.forEach(function (x) { var a = document.createElement('a'); a.href = x.url; a.textContent = x.name; a.target = '_blank'; a.rel = 'noopener'; soc.appendChild(a); });

  // Public survey results
  var rb = $('results');
  if (rb) {
    fetch('results.json', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (d) {
      $('rUpdated').textContent = d.updated;
      $('rCount').textContent = d.responses;
      if (!d.responses) { $('rEmpty').hidden = false; return; }
      d.questions.forEach(function (q) {
        var total = Object.keys(q.counts).reduce(function (a, k) { return a + q.counts[k]; }, 0);
        var max = Math.max.apply(null, Object.keys(q.counts).map(function (k) { return q.counts[k]; }).concat([1]));
        var card = document.createElement('div'); card.className = 'rq';
        var h = document.createElement('h3'); h.textContent = q.label; card.appendChild(h);
        var note = document.createElement('p'); note.className = 'rn'; note.textContent = (q.multi ? 'Pick any. ' : '') + total + (q.multi ? ' picks' : ' answers'); card.appendChild(note);
        Object.keys(q.counts).forEach(function (k) {
          var row = document.createElement('div'); row.className = 'bar';
          var lab = document.createElement('span'); lab.textContent = k;
          var track = document.createElement('span'); track.className = 'track';
          var fill = document.createElement('i'); fill.style.width = (100 * q.counts[k] / max) + '%'; track.appendChild(fill);
          var n = document.createElement('b'); n.textContent = q.counts[k];
          row.appendChild(lab); row.appendChild(track); row.appendChild(n); card.appendChild(row);
        });
        rb.appendChild(card);
      });
      var ql = $('rQuotes');
      (d.quotes || []).forEach(function (q) { var b = document.createElement('blockquote'); b.textContent = q; ql.appendChild(b); });
      if (d.quotes && d.quotes.length) $('rQuotesWrap').hidden = false;
      if (d.changes && d.changes.length) {
        var cl = $('rChanges'); d.changes.forEach(function (c) { var li = document.createElement('li'); li.textContent = c; cl.appendChild(li); });
        $('rChangesWrap').hidden = false;
      }
    }).catch(function () { $('rErr').hidden = false; });
  }
})();
