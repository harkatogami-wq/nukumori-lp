// ===== 開催情報（次回のイベントが決まったら、ここだけ書き換えればOK） =====
const EVENT = {
  session: "第2回",
  sessionLabel: "第2回 開催",
  dateShort: "9/28",
  dateLabel: "9月28日（月）10:00〜11:30",
  dateLabelFull: "9月28日（月）10:00〜11:30",
  time: "10:00〜11:30",
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
  apply: "https://utage-system.com/p/RJt07qh92MBC", // お申込みフォーム（UTAGE）
  instagram: "https://www.instagram.com/haruka_hagukumi_touch?igsh=ajV5ZXkzajBydjhz&igsi=ajV5ZXkzajBydjhz&utm_source=qr",
  line: "https://utage-system.com/line/open/xe5Fn3q5YbF2?mtid=WSvCfRkiXhnn", // Lien公式LINE
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
