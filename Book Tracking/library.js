// library.html - kitapları kart veya liste olarak gösterir.
// books.js içindeki "books" dizisini kullanır (cover, summary dahil).
const allBooks = books;

const container = document.getElementById("book-container");
const searchInput = document.getElementById("search");
const statusFilter = document.getElementById("status-filter");
const countLabel = document.getElementById("count");
const viewButtons = document.querySelectorAll("[data-view]");

let view = "cards";

// Durum filtresini verideki durumlardan otomatik oluştur
[...new Set(allBooks.map(b => b.status))].forEach(s => {
  const opt = document.createElement("option");
  opt.value = s;
  opt.textContent = s;
  statusFilter.appendChild(opt);
});

function stars(rating) {
  return rating > 0 ? "★".repeat(rating) + "☆".repeat(5 - rating) : "Henüz puanlanmadı";
}

function statusClass(status) {
  return "durum-" + status.toLowerCase().replace(/\s+/g, "-").replace(/ı/g, "i");
}

function render() {
  const q = searchInput.value.trim().toLowerCase();
  const st = statusFilter.value;

  const shown = allBooks.filter(b =>
    (st === "all" || b.status === st) &&
    (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
  );

  countLabel.textContent = "Gösterilen: " + shown.length + " / " + allBooks.length + " kitap";
  container.className = view === "cards" ? "kart-izgara" : "liste";
  container.innerHTML = "";

  if (shown.length === 0) {
    container.innerHTML = '<p class="bos">Aramana uyan kitap yok. Aramayı veya filtreyi temizle.</p>';
    return;
  }

  shown.forEach(b => {
    const a = document.createElement("a");
    a.className = "kitap-link";
    a.href = "details.html?id=" + b.id; // detay sayfasına id ile gider

    // Kapak resmi varsa resmi, yoksa adının yazdığı kahverengi kapağı göster
    const kapak = b.cover
      ? '<img src="' + b.cover + '" alt="' + b.title + '">'
      : '<div class="bos-kapak">' + b.title + '</div>';

    a.innerHTML =
      '<div class="kapak">' + kapak + '</div>' +
      '<div class="metin">' +
        '<p class="ad">' + b.title + '</p>' +
        '<p class="yazar">' + b.author + '</p>' +
        '<p class="bilgi">' + b.genre + ', ' + b.pages + ' sayfa</p>' +
        '<p class="puan">' + stars(b.rating) + '</p>' +
        '<span class="rozet ' + statusClass(b.status) + '">' + b.status + '</span>' +
        '<p class="ozet">' + b.summary + '</p>' +
      '</div>';
    container.appendChild(a);
  });
}

viewButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    view = btn.dataset.view;
    viewButtons.forEach(b => b.setAttribute("aria-pressed", b === btn));
    render();
  });
});
searchInput.addEventListener("input", render);
statusFilter.addEventListener("change", render);

render();
