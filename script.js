// ===== 開催情報（次回のイベントが決まったら、ここだけ書き換えればOK） =====
const EVENT = {
  session: "第2回",
  sessionLabel: "次回 開催",
  dateShort: "日程調整中",
  dateLabel: "日程調整中（決まりしだいLINEでお知らせします）",
  dateLabelFull: "日程調整中（決まりしだいLINEでお知らせします）",
  time: "決まりしだいお知らせします",
  venue: "まゆみんち",
  venueNote: "さいたま新都心駅 徒歩15分",
  target: "0歳〜あんよ期の赤ちゃんとママ",
  capacity: "限定4組",
  price: "1,500円",
};

document.querySelectorAll("[data-event]").forEach((el) => {
  const key = el.getAttribute("data-event");
  if (EVENT[key] === undefined) return;
  // <small>などの子要素は残しつつ、先頭のテキストノードだけ差し替える
  const firstChild = el.firstChild;
  if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
    firstChild.textContent = EVENT[key];
  } else {
    el.prepend(document.createTextNode(EVENT[key]));
  }
});

// ===== 申込み導線リンク設定 =====
const LINKS = {
  apply: "https://line-harness-haruka.harka-togami.workers.dev/r/h-nukumori", // 次回のお知らせ（LINEハーネス）。日程が決まったら予約 57bd50f2… に枠を足して ?page=event&id= を付ける
  instagram: "https://www.instagram.com/haruka_hagukumi_touch?igsh=ajV5ZXkzajBydjhz&igsi=ajV5ZXkzajBydjhz&utm_source=qr",
  line: "https://line-harness-haruka.harka-togami.workers.dev/r/h-lien", // Lien公式LINE
  lienHp: "https://lien-hp-5qp.pages.dev",
  mayuminchiHp: "https://mayuminchi-hp.pages.dev",
};

document.querySelectorAll("[data-link]").forEach((el) => {
  const key = el.getAttribute("data-link");
  if (LINKS[key] && LINKS[key] !== "#") {
    el.setAttribute("href", LINKS[key]);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  }
});

// ===== スクロールで表示 =====
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}
