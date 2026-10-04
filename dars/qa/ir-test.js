// node qa/ir-test.js — stemmer, k-means va single-pass sinovlari
const IR = require('../assets/ir.js');
const labels = IR.MARS.map(d => d.y);
const texts = IR.MARS.map(d => d.s);
let fail = 0;
const ok = (cond, msg) => { console.log((cond ? 'OK   ' : 'FAIL ') + msg); if (!cond) fail++; };

// 1) Stemmer
const cases = { kurslari: 'kurs', kursiga: 'kurs', matnlarni: 'matn', matnni: 'matn', modellari: 'model', modelini: 'model',
  treklari: 'trek', albomlarini: 'albom', turnirida: 'turnir', jamoalari: 'jamoa', jamoasi: 'jamoa',
  sayyorasidagi: 'sayyora', sayyorasida: 'sayyora', yordamchilari: 'yordamch', yordamchi: 'yordamch', shokoladli: 'shokolad' };
for (const [w, s] of Object.entries(cases)) ok(IR.stem(w) === s, `stem(${w}) = ${IR.stem(w)} (kutilgan ${s})`);
ok(IR.stem('dars') === 'dars', 'qisqa o\'zak kesilmaydi: dars');

// 2) K-means: tasodifiy qayta ishga tushirishlar (har biri bitta k-means++ boshlanishi)
function kmRate(useStem, seeds) {
  const X = IR.tfidf(texts, useStem).X;
  let good = 0;
  for (const s of seeds) if (IR.samePartition(IR.kmeans(X, 4, s).assign, labels)) good++;
  return good;
}
// Seed'lar takrorlanadigan RNG'dan: 20 ta paket × 10 restart
const R = IR.rng(20261003);
const trials = [];
for (let t = 0; t < 20; t++) {
  const seeds = Array.from({ length: 10 }, () => Math.floor(R() * 1e9));
  trials.push({ on: kmRate(true, seeds), off: kmRate(false, seeds) });
}
console.log('k-means 20 paket × 10 restart, ON :', trials.map(t => t.on).join(' '));
console.log('k-means 20 paket × 10 restart, OFF:', trials.map(t => t.off).join(' '));
const okBatches = trials.filter(t => t.on >= 9).length;
const offWorse = trials.filter(t => t.off < t.on).length;
console.log(`ON >= 9/10 bo'lgan paketlar: ${okBatches}/20; OFF yomonroq bo'lgan paketlar: ${offWorse}/20`);
const big = Array.from({ length: 1000 }, (_, i) => i + 1);
const onBig = kmRate(true, big), offBig = kmRate(false, big);
console.log(`k-means seed 1..1000: stemming ON ${onBig}/1000, OFF ${offBig}/1000`);
ok(onBig >= 900, 'stemming ON: restartlarning >= 90% to\'g\'ri (seed 1..1000)');
ok(okBatches >= 18, 'stemming ON: 20 paketdan kamida 18 tasida >= 9/10');
ok(offBig < onBig && offWorse > 0, 'stemming OFF ba\'zan yomonroq');

// 3) Single-pass: chegaralar bo'yicha
const S = IR.STREAM.map(d => d.s), SY = IR.STREAM.map(d => d.y);
function spRow(useStem) {
  const X = IR.tfidf(S, useStem).X, rows = [];
  for (let th = 0.05; th <= 0.5001; th += 0.05) {
    const r = IR.singlePass(X, th);
    rows.push({ th: +th.toFixed(2), k: r.clusters.length, purity: +IR.purity(r.assign, SY).toFixed(2), exact: IR.samePartition(r.assign, SY) });
  }
  return rows;
}
const spOn = spRow(true), spOff = spRow(false);
console.log('single-pass ON :', spOn.map(r => `${r.th}:k${r.k}/p${r.purity}${r.exact ? '✓' : ''}`).join('  '));
console.log('single-pass OFF:', spOff.map(r => `${r.th}:k${r.k}/p${r.purity}${r.exact ? '✓' : ''}`).join('  '));
ok(spOn.some(r => r.exact), 'stemming ON: biror chegarada aynan 3 mavzu hosil bo\'ladi');
console.log('aniq 3 mavzu beradigan chegaralar (ON):', spOn.filter(r => r.exact).map(r => r.th).join(', ') || 'yo\'q');
console.log('aniq 3 mavzu beradigan chegaralar (OFF):', spOff.filter(r => r.exact).map(r => r.th).join(', ') || 'yo\'q');

// 4) Silhouette, ierarxik
const X = IR.tfidf(texts, true).X;
const sil = [2, 3, 4, 5, 6].map(k => {
  let best = null;
  for (let s = 1; s <= 10; s++) { const a = IR.kmeans(X, k, s).assign; const v = IR.silhouette(X, a); if (!best || v > best) best = v; }
  return [k, +best.toFixed(3)];
});
console.log('silhouette (eng yaxshi 10 restartdan):', sil.map(([k, v]) => `k=${k}: ${v}`).join(', '));
ok(sil.reduce((a, b) => (b[1] > a[1] ? b : a))[0] === 4, 'silhouette eng yuqori k = 4');
const tree = IR.averageLinkage(X);
const hs = tree.merges.map(m => m.height);
const h4 = (hs[hs.length - 4] + hs[hs.length - 3]) / 2;
const cut = IR.cutTree(tree.root, h4, X.length);
console.log('dendrogram: 4 klasterga kesish, purity =', IR.purity(cut, labels).toFixed(2));
console.log(fail ? `\n${fail} ta sinov o'tmadi` : '\nHammasi o\'tdi');
process.exit(fail ? 1 : 0);
