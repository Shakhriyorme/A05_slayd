/* A5 — Hujjatlarni klasterlash: ma'lumotlar va IR yadrosi.
   Brauzerda window.IR, node'da module.exports. Tashqi kutubxona yo'q. */
(function (root) {
  'use strict';

  // ---------- Ma'lumotlar (sintetik namuna qidiruv natijalari) ----------
  // label: 0 sayyora, 1 Bruno Mars, 2 shokolad, 3 Mars IT School
  var MEANINGS = [
    { key: 'planet', name: 'Sayyora', hint: 'rover, krater' },
    { key: 'bruno', name: 'Bruno Mars', hint: 'qo\'shiqchi' },
    { key: 'choco', name: 'Shokolad', hint: 'Mars batonchasi' },
    { key: 'school', name: 'Mars IT School', hint: 'Toshkent' }
  ];

  var MARS = [
    { t: 'Perseverance roveri Jezero kraterida', s: 'NASA roveri Mars sayyorasidagi Jezero kraterida tuproq va qadimiy ko\'l izlarini o\'rganmoqda', u: 'science.nasa.gov', y: 0 },
    { t: 'Bruno Mars — 24K Magic', s: 'Qo\'shiqchi Bruno Mars 24K Magic albomi bilan Grammy mukofotining yetti nominatsiyasida g\'olib bo\'lgan', u: 'grammy.com', y: 1 },
    { t: 'Mars shokoladi tarixi', s: 'Mars shokoladi: karamel va nugali batoncha birinchi marta 1932-yilda Angliyada ishlab chiqarilgan', u: 'wikipedia.org', y: 2 },
    { t: 'Mars IT School', s: 'Mars IT School: Toshkentda bolalar uchun dasturlash kurslari va darslari', u: 'marsit.uz', y: 3 },
    { t: 'Mars — qizil sayyora', s: 'Mars Quyosh tizimidagi qizil sayyora: kraterlar, tuproq va roverlar', u: 'kosmos.uz', y: 0 },
    { t: 'Bruno Mars pleylisti', s: 'Bruno Mars qo\'shiqlari: qo\'shiqchining eng ko\'p tinglangan treklari va albomlari', u: 'music.uz', y: 1 },
    { t: 'Mars batonchasi kaloriyasi', s: 'Mars batonchasi kaloriyasi: bitta shokolad batonchada qancha shakar va karamel bor', u: 'sog-lom.uz', y: 2 },
    { t: 'Python kursi bolalarga', s: 'Mars IT School o\'quvchilari Python dasturlash darslarida loyihalar yaratadi', u: 'marsit.uz/kurslar', y: 3 },
    { t: 'Rover tuproq namunalari', s: 'Rover Mars sayyorasi kraterida tuproq namunalarini yig\'ib, Yerga qaytarish uchun saqlamoqda', u: 'jpl.nasa.gov', y: 0 },
    { t: 'Bruno Mars konserti', s: 'Bruno Mars konsertiga chiptalar: qo\'shiqchining jahon turnesi, albom treklari va qo\'shiqlari', u: 'tickets.uz', y: 1 },
    { t: 'Shokoladli pirojnoe retsepti', s: 'Uyda Mars shokoladli pirojnoe retsepti: karamel, shokolad va batoncha bo\'laklari', u: 'oshxona.uz', y: 2 },
    { t: 'Sinov darsiga yozilish', s: 'Dasturlash kursiga yozilish: Mars IT School sinov darsi va filiallari', u: 'marsit.uz/aloqa', y: 3 },
    { t: 'Marsda suv bo\'lganmi?', s: 'Mars sayyorasida suv bo\'lganmi? Rover krater va tuproq suratlarini Yerga yubormoqda', u: 'fan.uz', y: 0 },
    { t: 'Yangi klip va muxlislar', s: 'Qo\'shiqchi Bruno Mars klipi: yangi trek, albom va muxlislar reaksiyasi', u: 'youtube.com', y: 1 },
    { t: 'Kofe va karamel trendi', s: 'Kofe bilan shirinlik: Mars shokolad batonchasi va karamelli latte — shahar kafelaridagi trend', u: 'cityguide.uz', y: 2 },
    { t: 'IT kurs tanlash', s: 'Farzandingiz uchun IT kurs tanlash: Mars IT School kurslari va darslar jadvali', u: 'ota-ona.uz', y: 3 }
  ];

  // Ketma-ket (single-pass) demo uchun oqim: 0 AI vositalari, 1 gaming/esport, 2 musiqa/striming
  var TOPICS = [
    { key: 'ai', name: 'AI vositalari' },
    { key: 'game', name: 'Gaming / esport' },
    { key: 'music', name: 'Musiqa / striming' }
  ];
  var STREAM = [
    { s: 'AI modeli o\'zbekcha matnlarni tarjima qiladi', y: 0 },
    { s: 'Esport turnirida o\'zbek jamoasi finalga chiqdi', y: 1 },
    { s: 'Yangi albom: reperning treklari strimingda trendda', y: 2 },
    { s: 'AI modellari rasm va matnni birga tushunmoqda', y: 0 },
    { s: 'Striming xizmatida eng ko\'p tinglangan treklar va albomlar', y: 2 },
    { s: 'Yangi o\'yin: geymerlar esport turnir rejimini maqtamoqda', y: 1 },
    { s: 'Talabalar uchun AI yordamchi: matnlarni qisqartiradi', y: 0 },
    { s: 'Esport jamoalari uchun gaming arena: o\'yin turnirlari', y: 1 },
    { s: 'Qo\'shiqchi yangi albomini striming uchun jonli ijro etadi', y: 2 },
    { s: 'Geymerlar uchun o\'yin noutbuki: turnirlarda qaysi biri yaxshi?', y: 1 },
    { s: 'Ochiq AI modelini noutbukda ishga tushirish: yordamchi qo\'llanma', y: 0 },
    { s: 'Pleylist sirlari: striming treklarini kayfiyatga qarab tanlash', y: 2 },
    { s: 'Mobil o\'yinlar turniri: jamoalar sovrin uchun o\'ynadi', y: 1 },
    { s: 'AI yordamchilari va modellar kod yozishni tezlashtirmoqda', y: 0 },
    { s: 'Qo\'shiqchilar albomlarini striming platformalariga avval chiqarmoqda', y: 2 }
  ];

  // ---------- Matnni qayta ishlash ----------
  var STOP = ('va bilan uchun bu ham endi yangi eng bir birga yana o\'z qancha bor qanday qaysi haqida ' +
    'bo\'yicha ularni ular uning uni bitta avval marta qarab biri yaxshi ko\'p yilda birinchi ishlab ' +
    'chiqarilgan bo\'lgan bo\'lganmi qilmoqda qiladi uyda').split(' ');
  var STOPSET = {}; STOP.forEach(function (w) { STOPSET[w] = 1; });

  // Qo'shimchalar: brief ro'yxati + dagi, lardagi, li. Eng uzuni birinchi.
  var SUFFIXES = ['lardagi', 'laridan', 'larida', 'larini', 'lariga', 'larning', 'lardan', 'larda', 'larni',
    'larga', 'sining', 'sidan', 'dagi', 'lari', 'sida', 'sini', 'siga', 'ining', 'idan', 'ning', 'lar',
    'ida', 'ini', 'iga', 'dan', 'da', 'ni', 'ga', 'si', 'li', 'i']
    .sort(function (a, b) { return b.length - a.length; });
  var MIN_STEM = 4;

  function normalize(text) {
    return text.toLowerCase().replace(/[‘’ʻʼ`]/g, '\'');
  }

  // Bitta so'zdan qo'shimchalarni ketma-ket kesadi; o'zak kamida 4 harf qoladi.
  function stem(w) {
    var changed = true;
    while (changed) {
      changed = false;
      for (var i = 0; i < SUFFIXES.length; i++) {
        var suf = SUFFIXES[i];
        if (w.length - suf.length >= MIN_STEM && w.slice(-suf.length) === suf) {
          w = w.slice(0, -suf.length);
          changed = true;
          break;
        }
      }
    }
    return w;
  }

  function tokenize(text, useStem) {
    var raw = normalize(text).match(/[a-z0-9']+/g) || [];
    var out = [];
    for (var i = 0; i < raw.length; i++) {
      var w = raw[i].replace(/^'+|'+$/g, '');
      if (w.length < 2 || STOPSET[w] || /^\d+$/.test(w)) continue;
      out.push(useStem ? stem(w) : w);
    }
    return out;
  }

  // ---------- TF-IDF (scikit-learn bilan bir xil: smooth idf + L2) ----------
  function tfidf(texts, useStem) {
    var docs = texts.map(function (t) { return tokenize(t, useStem); });
    var vocab = {}, terms = [];
    docs.forEach(function (d) { d.forEach(function (w) { if (!(w in vocab)) { vocab[w] = terms.length; terms.push(w); } }); });
    var N = docs.length, V = terms.length, df = new Array(V).fill(0);
    docs.forEach(function (d) {
      var seen = {};
      d.forEach(function (w) { if (!seen[w]) { seen[w] = 1; df[vocab[w]]++; } });
    });
    var idf = df.map(function (f) { return Math.log((1 + N) / (1 + f)) + 1; });
    var X = docs.map(function (d) {
      var v = new Array(V).fill(0);
      d.forEach(function (w) { v[vocab[w]] += 1; });
      for (var j = 0; j < V; j++) v[j] *= idf[j];
      return l2(v);
    });
    return { X: X, terms: terms, idf: idf, tokens: docs };
  }

  function l2(v) {
    var s = 0; for (var i = 0; i < v.length; i++) s += v[i] * v[i];
    s = Math.sqrt(s) || 1;
    return v.map(function (x) { return x / s; });
  }
  function dot(a, b) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i] * b[i]; return s; }
  function cosine(a, b) {
    var na = Math.sqrt(dot(a, a)), nb = Math.sqrt(dot(b, b));
    return na && nb ? dot(a, b) / (na * nb) : 0;
  }
  function mean(vs, dim) {
    var m = new Array(dim).fill(0);
    vs.forEach(function (v) { for (var i = 0; i < dim; i++) m[i] += v[i]; });
    return vs.length ? m.map(function (x) { return x / vs.length; }) : m;
  }

  // ---------- Tasodifiy sonlar (takrorlanadigan) ----------
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ---------- K-means (kosinus, greedy k-means++ boshlanishi — scikit-learn kabi) ----------
  // history: har iteratsiyadagi markazlar va tayinlashlar (qadam-baqadam ko'rsatish uchun)
  function kmeans(X, k, seed, maxIter, localTrials) {
    var r = rng(seed || 1), n = X.length, dim = X[0].length;
    var C = [X[Math.floor(r() * n)].slice()];
    var trials = localTrials || 5; // n_local_trials (sklearn: 2 + ln k); 5 — qisqa matnlarda barqarorroq
    function minD2(extra) {
      return X.map(function (x) {
        var best = Infinity;
        C.concat(extra ? [extra] : []).forEach(function (c) { var d = 1 - cosine(x, c); if (d < best) best = d; });
        return best * best;
      });
    }
    while (C.length < k) {
      var d2 = minD2(), sum = d2.reduce(function (a, b) { return a + b; }, 0);
      var bestIdx = 0, bestPot = Infinity;
      for (var t = 0; t < trials; t++) {
        var pick = r() * sum, idx = 0;
        for (; idx < n - 1; idx++) { pick -= d2[idx]; if (pick <= 0) break; }
        var pot = minD2(X[idx]).reduce(function (a, b) { return a + b; }, 0);
        if (pot < bestPot) { bestPot = pot; bestIdx = idx; }
      }
      C.push(X[bestIdx].slice());
    }
    var assign = new Array(n).fill(-1), history = [];
    for (var it = 0; it < (maxIter || 20); it++) {
      var changed = false;
      for (var i = 0; i < n; i++) {
        var best = -2, bj = 0;
        for (var j = 0; j < k; j++) { var s = cosine(X[i], C[j]); if (s > best) { best = s; bj = j; } }
        if (assign[i] !== bj) { assign[i] = bj; changed = true; }
      }
      history.push({ centers: C.map(function (c) { return c.slice(); }), assign: assign.slice() });
      C = C.map(function (c, j) {
        var members = X.filter(function (_, i) { return assign[i] === j; });
        return members.length ? mean(members, dim) : c;
      });
      if (!changed && it > 0) break;
    }
    history.push({ centers: C.map(function (c) { return c.slice(); }), assign: assign.slice() });
    return { assign: assign, centers: C, history: history };
  }

  // ---------- Ketma-ket (single-pass / leader) klasterlash ----------
  // Har yangi hujjat eng o'xshash klaster markaziga solishtiriladi:
  // o'xshashlik >= threshold bo'lsa qo'shiladi, aks holda yangi klaster ochiladi.
  function singlePass(X, threshold, upto) {
    var clusters = [], assign = [], sims = [], dim = X[0].length;
    var n = upto == null ? X.length : upto;
    for (var i = 0; i < n; i++) {
      var best = -1, bj = -1;
      clusters.forEach(function (c, j) { var s = cosine(X[i], c.center); if (s > best) { best = s; bj = j; } });
      if (bj >= 0 && best >= threshold) {
        clusters[bj].members.push(i);
        clusters[bj].center = mean(clusters[bj].members.map(function (m) { return X[m]; }), dim);
        assign.push(bj);
      } else {
        clusters.push({ members: [i], center: X[i].slice() });
        assign.push(clusters.length - 1);
      }
      sims.push(best);
    }
    return { assign: assign, clusters: clusters, sims: sims };
  }

  // ---------- Baholash ----------
  function purity(assign, labels) {
    var byC = {};
    assign.forEach(function (c, i) { (byC[c] = byC[c] || {}); byC[c][labels[i]] = (byC[c][labels[i]] || 0) + 1; });
    var total = 0;
    Object.keys(byC).forEach(function (c) {
      total += Math.max.apply(null, Object.keys(byC[c]).map(function (l) { return byC[c][l]; }));
    });
    return total / assign.length;
  }
  // Ikki bo'linma bir xilmi (yorliq nomlaridan qat'i nazar)
  function samePartition(a, b) {
    var m1 = {}, m2 = {};
    for (var i = 0; i < a.length; i++) {
      if (a[i] in m1) { if (m1[a[i]] !== b[i]) return false; } else m1[a[i]] = b[i];
      if (b[i] in m2) { if (m2[b[i]] !== a[i]) return false; } else m2[b[i]] = a[i];
    }
    return true;
  }
  function silhouette(X, assign) {
    var n = X.length, ks = {}, total = 0;
    assign.forEach(function (c) { ks[c] = 1; });
    if (Object.keys(ks).length < 2) return 0;
    for (var i = 0; i < n; i++) {
      var dist = {}, cnt = {};
      for (var j = 0; j < n; j++) {
        if (i === j) continue;
        var d = 1 - cosine(X[i], X[j]);
        dist[assign[j]] = (dist[assign[j]] || 0) + d; cnt[assign[j]] = (cnt[assign[j]] || 0) + 1;
      }
      if (!cnt[assign[i]]) continue; // yolg'iz nuqta: s = 0
      var a = dist[assign[i]] / cnt[assign[i]], b = Infinity;
      Object.keys(dist).forEach(function (c) { if (+c !== assign[i]) b = Math.min(b, dist[c] / cnt[c]); });
      total += (b - a) / Math.max(a, b);
    }
    return total / n;
  }

  // ---------- 2D proyeksiya: markazlashtirilgan TF-IDF -> SVD (PCA) ----------
  function jacobiEigen(A) {
    var n = A.length, a = A.map(function (r) { return r.slice(); });
    var V = a.map(function (_, i) { return a.map(function (_, j) { return i === j ? 1 : 0; }); });
    for (var sweep = 0; sweep < 100; sweep++) {
      var off = 0;
      for (var p = 0; p < n; p++) for (var q = p + 1; q < n; q++) off += a[p][q] * a[p][q];
      if (off < 1e-14) break;
      for (p = 0; p < n; p++) for (q = p + 1; q < n; q++) {
        if (Math.abs(a[p][q]) < 1e-15) continue;
        var th = (a[q][q] - a[p][p]) / (2 * a[p][q]);
        var t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1));
        var c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (var k = 0; k < n; k++) {
          var akp = a[k][p], akq = a[k][q];
          a[k][p] = c * akp - s * akq; a[k][q] = s * akp + c * akq;
        }
        for (k = 0; k < n; k++) {
          var apk = a[p][k], aqk = a[q][k];
          a[p][k] = c * apk - s * aqk; a[q][k] = s * apk + c * aqk;
        }
        for (k = 0; k < n; k++) {
          var vkp = V[k][p], vkq = V[k][q];
          V[k][p] = c * vkp - s * vkq; V[k][q] = s * vkp + c * vkq;
        }
      }
    }
    var vals = a.map(function (r, i) { return r[i]; });
    var order = vals.map(function (_, i) { return i; }).sort(function (i, j) { return vals[j] - vals[i]; });
    return { values: order.map(function (i) { return vals[i]; }), vectors: order.map(function (i) { return V.map(function (r) { return r[i]; }); }) };
  }
  // Qaytaradi: project(v) -> [x, y]; hujjatlar koordinatalari ham.
  function pca2(X) {
    var n = X.length, dim = X[0].length, mu = mean(X, dim);
    var Xc = X.map(function (x) { return x.map(function (v, j) { return v - mu[j]; }); });
    var G = Xc.map(function (a) { return Xc.map(function (b) { return dot(a, b); }); });
    var e = jacobiEigen(G);
    var comps = [0, 1, 2].map(function (c) {
      var s = Math.sqrt(Math.max(e.values[c], 1e-12)), u = e.vectors[c], v = new Array(dim).fill(0);
      for (var i = 0; i < n; i++) for (var j = 0; j < dim; j++) v[j] += Xc[i][j] * u[i];
      return v.map(function (x) { return x / s; });
    });
    function to3(v) { var d = v.map(function (x, j) { return x - mu[j]; }); return comps.map(function (c) { return dot(d, c); }); }
    // 3 komponentadan 2D: juft masofalarni eng yaxshi saqlaydigan tekislik (yorliqlarsiz, MDS stress)
    var P3 = X.map(to3), r = rng(7), best = null, bestStress = Infinity;
    function d3(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); }
    for (var t = 0; t < 3000; t++) {
      var a = [r() - 0.5, r() - 0.5, r() - 0.5], b = [r() - 0.5, r() - 0.5, r() - 0.5];
      var na = Math.hypot(a[0], a[1], a[2]); a = a.map(function (x) { return x / na; });
      var ab = a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; b = b.map(function (x, k) { return x - ab * a[k]; });
      var nb = Math.hypot(b[0], b[1], b[2]); b = b.map(function (x) { return x / nb; });
      var stress = 0;
      for (var p = 0; p < n; p++) for (var q = p + 1; q < n; q++) {
        var dx = (P3[p][0] - P3[q][0]) * a[0] + (P3[p][1] - P3[q][1]) * a[1] + (P3[p][2] - P3[q][2]) * a[2];
        var dy = (P3[p][0] - P3[q][0]) * b[0] + (P3[p][1] - P3[q][1]) * b[1] + (P3[p][2] - P3[q][2]) * b[2];
        var diff = Math.hypot(dx, dy) - d3(P3[p], P3[q]); stress += diff * diff;
      }
      if (stress < bestStress) { bestStress = stress; best = [a, b]; }
    }
    function project(v) { var p3 = to3(v); return best.map(function (f) { return f[0] * p3[0] + f[1] * p3[1] + f[2] * p3[2]; }); }
    return { points: X.map(project), project: project };
  }

  // ---------- Ierarxik (single / complete / average bog'lanish, kosinus masofa) ----------
  function averageLinkage(X) { return linkage(X, 'average'); }
  function linkage(X, method) {
    var n = X.length, clusters = [], merges = [];
    for (var i = 0; i < n; i++) clusters.push({ id: i, members: [i] });
    var D = X.map(function (a) { return X.map(function (b) { return 1 - cosine(a, b); }); });
    function cd(A, B) {
      var s = 0, mn = Infinity, mx = -Infinity;
      A.members.forEach(function (i) { B.members.forEach(function (j) { var d = D[i][j]; s += d; if (d < mn) mn = d; if (d > mx) mx = d; }); });
      if (method === 'single') return mn;
      if (method === 'complete') return mx;
      return s / (A.members.length * B.members.length);
    }
    var next = n;
    while (clusters.length > 1) {
      var best = Infinity, bi = 0, bj = 1;
      for (var a = 0; a < clusters.length; a++) for (var b = a + 1; b < clusters.length; b++) {
        var d = cd(clusters[a], clusters[b]); if (d < best) { best = d; bi = a; bj = b; }
      }
      var A = clusters[bi], B = clusters[bj];
      var merged = { id: next++, members: A.members.concat(B.members), left: A, right: B, height: best };
      merges.push(merged);
      clusters.splice(bj, 1); clusters.splice(bi, 1, merged);
    }
    return { root: clusters[0], merges: merges };
  }
  // Kesish chizig'i balandligida klaster yorliqlari
  function cutTree(rootNode, h, n) {
    var assign = new Array(n), c = 0;
    (function walk(node) {
      if (node.left && node.height > h) { walk(node.left); walk(node.right); }
      else { node.members.forEach(function (m) { assign[m] = c; }); c++; }
    })(rootNode);
    return assign;
  }

  // Klaster "nomi": markazdagi eng og'ir so'zlar
  function topTerms(center, terms, k, exclude) {
    return center.map(function (w, j) { return [w, terms[j]]; })
      .filter(function (p) { return !exclude || exclude.indexOf(p[1]) < 0; })
      .sort(function (a, b) { return b[0] - a[0]; }).slice(0, k || 3).map(function (p) { return p[1]; });
  }

  var IR = {
    MEANINGS: MEANINGS, MARS: MARS, TOPICS: TOPICS, STREAM: STREAM, SUFFIXES: SUFFIXES, STOP: STOP,
    normalize: normalize, stem: stem, tokenize: tokenize, tfidf: tfidf, cosine: cosine, rng: rng,
    kmeans: kmeans, singlePass: singlePass, purity: purity, samePartition: samePartition,
    silhouette: silhouette, pca2: pca2, averageLinkage: averageLinkage, linkage: linkage, cutTree: cutTree, topTerms: topTerms
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = IR; else root.IR = IR;
})(this);
