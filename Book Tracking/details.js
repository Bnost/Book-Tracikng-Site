// details.html - adresteki id'ye göre kitabı bulur ve gösterir (details.html?id=3 gibi)

let id = new URLSearchParams(location.search).get("id");
let alan = document.getElementById("detay");
let durumlar = ["Okundu", "Okunacak", "Okuyorum"];
let kitap = null;

for (let i = 0; i < books.length; i++) {
  if (books[i].id == id) {
    kitap = books[i];
  }
}

// Sağdaki sütundaki düğmeleri çizer, seçili durum renkli olur
function durumlariGoster() {
  let html = "";
  for (let i = 0; i < durumlar.length; i++) {
    let secili = durumlar[i] == kitap.status;
    html = html + '<button type="button" class="durum' + (secili ? ' secili' : '') + '"' +
      ' aria-pressed="' + secili + '" onclick="durumSec(' + i + ')">' + durumlar[i] + '</button>';
  }
  document.getElementById("durumlar").innerHTML = html;
}

function durumSec(sira) {
  kitap.status = durumlar[sira];
  durumKaydet(kitap.id, kitap.status);
  durumlariGoster();
}

// Bu tarayıcıda yazılan inceleme: her kitap için bir tane saklanır
let benimIncelemem = null;

// Skoru yeniden hesaplar ve başlığın altında gösterir
function skoruGuncelle() {
  kitap.rating = skorHesapla(kitap);
  document.getElementById("kitap-skoru").innerHTML = yildizGoster(kitap.rating);
}

function incelemeleriGoster() {
  let liste = reviews[kitap.id] || [];
  let toplam = liste.length;
  if (benimIncelemem != null) {
    toplam = toplam + 1;
  }

  let html = "<h2>İncelemeler (" + toplam + ")</h2>" +
    '<div id="benim-alanim"></div>';

  if (liste.length > 0) {
    html = html + '<p class="not">Aşağıdaki incelemeler örnek olarak oluşturulmuştur.</p>';
  }

  for (let i = 0; i < liste.length; i++) {
    html = html +
      '<div class="inceleme">' +
        '<p class="inceleme-ust"><b>' + liste[i].name + '</b><span>' + yildizGoster(liste[i].rating) + '</span></p>' +
        '<p>' + liste[i].text + '</p>' +
      '</div>';
  }
  document.getElementById("incelemeler").innerHTML = html;

  // Daha önce inceleme yazıldıysa onu, yazılmadıysa boş formu göster
  if (benimIncelemem != null) {
    incelememiGoster();
  } else {
    formuGoster();
  }
}

// Kaydedilmiş incelemeyi düzenle düğmesiyle gösterir
function incelememiGoster() {
  document.getElementById("benim-alanim").innerHTML =
    '<div class="inceleme benim">' +
      '<p class="inceleme-ust"><span><b id="benim-ad"></b> (senin incelemen)</span><span>' + yildizGoster(Number(benimIncelemem.rating)) + '</span></p>' +
      '<p class="benim-yorum" id="benim-yorum"></p>' +
      '<div class="form-dugmeler">' +
        '<button type="button" class="durum" onclick="formuGoster()">Düzenle</button>' +
        '<button type="button" class="durum sil" onclick="incelemeSil()">Sil</button>' +
      '</div>' +
    '</div>';

  // Kullanıcının yazdığı metin textContent ile konur: içinde HTML olsa bile yazı olarak görünür
  document.getElementById("benim-ad").textContent = benimIncelemem.name;
  document.getElementById("benim-yorum").textContent = benimIncelemem.text;
}

// İnceleme formu: yeni yazarken boş, düzenlerken dolu gelir
function formuGoster() {
  let duzenleniyor = benimIncelemem != null;

  // Yıldızların üstünde yan yana 10 görünmez alan var: her biri yarım yıldız (0.5, 1, 1.5 ... 5)
  let yarimlar = "";
  for (let puan = 0.5; puan <= 5; puan = puan + 0.5) {
    yarimlar = yarimlar +
      '<label onmouseenter="yildizDoldur(' + puan + ')">' +
        '<input type="radio" name="puan" value="' + puan + '" aria-label="' + puan + ' yıldız" onchange="yildizDoldur(' + puan + ')">' +
      '</label>';
  }

  document.getElementById("benim-alanim").innerHTML =
    '<form class="inceleme inceleme-form" onsubmit="incelemeKaydet(event)">' +
      '<h3>' + (duzenleniyor ? 'İncelemeni düzenle' : 'İnceleme yaz') + '</h3>' +
      '<label for="form-ad">Görünecek isim</label>' +
      '<input type="text" id="form-ad" maxlength="40" required>' +
      '<span>Puan</span>' +
      '<div class="yildiz-sec" role="radiogroup" aria-label="Puan" onmouseleave="yildizDoldur(seciliPuan())">' +
        '<span class="yildizlar">★★★★★<span class="yildiz-dolu" id="form-yildiz">★★★★★</span></span>' +
        '<div class="yarimlar">' + yarimlar + '</div>' +
      '</div>' +
      '<label for="form-yorum">Yorum</label>' +
      '<textarea id="form-yorum" rows="4" maxlength="1000" required></textarea>' +
      '<p class="form-hata" id="form-hata" role="alert"></p>' +
      '<div class="form-dugmeler">' +
        '<button type="submit" class="durum secili">Kaydet</button>' +
        (duzenleniyor ? '<button type="button" class="durum" onclick="incelememiGoster()">Vazgeç</button>' : '') +
      '</div>' +
    '</form>';

  if (duzenleniyor) {
    document.getElementById("form-ad").value = benimIncelemem.name;
    document.querySelector('input[name="puan"][value="' + benimIncelemem.rating + '"]').checked = true;
    document.getElementById("form-yorum").value = benimIncelemem.text;
  }
  yildizDoldur(seciliPuan());
}

// Formda işaretli puanı verir, hiçbiri işaretli değilse 0
function seciliPuan() {
  let secili = document.querySelector('input[name="puan"]:checked');
  if (secili == null) {
    return 0;
  }
  return Number(secili.value);
}

// Formdaki yıldızları verilen puana kadar doldurur
function yildizDoldur(puan) {
  document.getElementById("form-yildiz").style.width = (puan / 5 * 100) + "%";
}

function incelemeKaydet(olay) {
  olay.preventDefault();   // form gönderilince sayfa yenilenmesin

  let yeni = {
    name: document.getElementById("form-ad").value.trim(),
    rating: seciliPuan(),
    text: document.getElementById("form-yorum").value.trim()
  };

  // Sadece boşluk yazıldıysa kaydetme
  if (yeni.name == "" || yeni.text == "" || yeni.rating == 0) {
    document.getElementById("form-hata").textContent = "İsim, puan ve yorum boş bırakılamaz.";
    return;
  }

  try {
    localStorage.setItem("inceleme-" + kitap.id, JSON.stringify(yeni));
  } catch (hata) {
    document.getElementById("form-hata").textContent = "İnceleme kaydedilemedi: tarayıcı saklamaya izin vermiyor.";
    return;
  }

  benimIncelemem = yeni;
  skoruGuncelle();
  incelemeleriGoster();
}

// Sadece Kitap Ekle sayfasından eklenen kitaplar silinebilir
function kitapSil() {
  if (!confirm("Bu kitap ve ona yazdığın inceleme silinsin mi? Bu işlem geri alınamaz.")) {
    return;
  }

  // Silinecek kitap dışındakileri yeni listeye al
  let liste = eklenenleriOku();
  let kalanlar = [];
  for (let i = 0; i < liste.length; i++) {
    if (liste[i].id != kitap.id) {
      kalanlar.push(liste[i]);
    }
  }

  try {
    localStorage.setItem("eklenenKitaplar", JSON.stringify(kalanlar));
    localStorage.removeItem("durum-" + kitap.id);
    localStorage.removeItem("inceleme-" + kitap.id);
  } catch (hata) {
    alert("Kitap silinemedi.");
    return;
  }

  location.replace("library.html");   // silinen kitabın sayfasına geri dönülmesin
}

function incelemeSil() {
  // confirm: Tamam'a basılırsa true, İptal'e basılırsa false döner
  if (!confirm("İncelemen silinsin mi? Bu işlem geri alınamaz.")) {
    return;
  }

  try {
    localStorage.removeItem("inceleme-" + kitap.id);
  } catch (hata) {
    alert("İnceleme silinemedi.");
    return;
  }

  benimIncelemem = null;
  skoruGuncelle();
  incelemeleriGoster();
}

// Kapak resmi varsa resmi, yoksa adının yazdığı kahverengi kapağı verir
function kapakHtml(k) {
  if (k.cover != "") {
    return '<img src="' + k.cover + '" alt="' + k.title + ' kapağı">';
  }
  return '<div class="bos-kapak">' + k.title + '</div>';
}

if (kitap == null) {
  // Menüden gelindiyse id yoktur: bütün kitapları seçenek olarak göster
  let html = '<h1>Kitap Detayı</h1><p>Ayrıntılarını görmek istediğin kitabı seç:</p><div class="secim">';
  let sirali = alfabetikSirala();
  for (let i = 0; i < sirali.length; i++) {
    html = html +
      '<a href="details.html?id=' + sirali[i].id + '">' +
        '<div class="secim-kapak">' + kapakHtml(sirali[i]) + '</div>' +
        '<p class="secim-ad">' + sirali[i].title + '</p>' +
        '<p class="secim-yazar">' + sirali[i].author + '</p>' +
      '</a>';
  }
  alan.innerHTML = html + '</div>';
} else {
  alan.innerHTML =
    '<div class="detay-kapsayici">' +
      '<div class="buyuk-kapak">' + kapakHtml(kitap) + '</div>' +
      '<div class="bilgiler">' +
        '<h1>' + kitap.title + '</h1>' +
        '<p class="detay-puan" id="kitap-skoru">' + yildizGoster(kitap.rating) + '</p>' +
        '<p><b>Yazar:</b> ' + kitap.author + '</p>' +
        '<p><b>Tür:</b> ' + kitap.genre + '</p>' +
        '<p><b>Sayfa sayısı:</b> ' + kitap.pages + '</p>' +
        '<h2>Özet</h2>' +
        '<p class="uzun-ozet">' + (kitap.description || kitap.summary) + '</p>' +
      '</div>' +
      '<div class="durum-sutunu">' +
        '<h2>Durum</h2>' +
        '<div class="durumlar" id="durumlar"></div>' +
        (kitap.eklendi ? '<button type="button" class="durum sil kitap-sil" onclick="kitapSil()">Kitabı Sil</button>' : '') +
      '</div>' +
    '</div>' +
    '<div class="incelemeler" id="incelemeler"></div>';

  document.title = "Book Tracking | " + document.querySelector("#detay h1").textContent;
  durumlariGoster();
  benimIncelemem = incelemeOku(kitap.id);
  incelemeleriGoster();
}
