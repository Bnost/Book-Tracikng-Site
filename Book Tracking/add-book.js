// add-book.html - kullanıcıdan kitap bilgilerini alır ve kaydeder

let durumlar = ["Okundu", "Okunacak", "Okuyorum"];
let seciliDurum = "Okunacak";
let kapakResmi = "";   // seçilen resim yazıya çevrilip burada tutulur

// Sağdaki sütundaki düğmeleri çizer, seçili durum renkli olur
function durumlariGoster() {
  let html = "";
  for (let i = 0; i < durumlar.length; i++) {
    let secili = durumlar[i] == seciliDurum;
    html = html + '<button type="button" class="durum' + (secili ? ' secili' : '') + '"' +
      ' aria-pressed="' + secili + '" onclick="durumSec(' + i + ')">' + durumlar[i] + '</button>';
  }
  document.getElementById("durumlar").innerHTML = html;
}

function durumSec(sira) {
  seciliDurum = durumlar[sira];
  durumlariGoster();
}

function hataGoster(mesaj) {
  document.getElementById("hata").textContent = mesaj;
}

// Dosyadan resim seçilince çalışır
function kapakSec() {
  let dosya = document.getElementById("kapak-dosya").files[0];
  if (dosya == undefined) {
    return;   // dosya seçmeden kapatıldı
  }
  hataGoster("");

  let kaydet = document.getElementById("kaydet");
  kaydet.disabled = true;   // resim hazır olana kadar kaydetme

  let resim = new Image();
  let adres = URL.createObjectURL(dosya);

  resim.onload = function () {
    // Tarayıcıda az yer kaplasın diye resmi en fazla 400px genişliğe küçült
    let oran = Math.min(1, 400 / resim.naturalWidth);
    let tuval = document.createElement("canvas");
    tuval.width = Math.max(1, Math.round(resim.naturalWidth * oran));
    tuval.height = Math.max(1, Math.round(resim.naturalHeight * oran));

    let cizim = tuval.getContext("2d");
    cizim.fillStyle = "white";   // saydam resimlerin arkası beyaz olsun
    cizim.fillRect(0, 0, tuval.width, tuval.height);
    cizim.drawImage(resim, 0, 0, tuval.width, tuval.height);

    kapakResmi = tuval.toDataURL("image/jpeg", 0.8);
    URL.revokeObjectURL(adres);

    document.getElementById("kapak-onizleme").src = kapakResmi;
    document.getElementById("kapak-onizleme").hidden = false;
    document.getElementById("kapak-arti").hidden = true;
    kaydet.disabled = false;
  };

  resim.onerror = function () {
    URL.revokeObjectURL(adres);
    document.getElementById("kapak-dosya").value = "";
    hataGoster("Bu dosya resim olarak açılamadı. Başka bir resim seç.");
    kaydet.disabled = false;
  };

  resim.src = adres;
}

function kitapKaydet(olay) {
  olay.preventDefault();   // form gönderilince sayfa yenilenmesin

  let ozet = document.getElementById("ozet").value.trim();
  let yeni = {
    id: Date.now(),   // o anki zaman: her kitapta farklı bir sayı olur
    title: document.getElementById("ad").value.trim(),
    author: document.getElementById("yazar").value.trim(),
    pages: Number(document.getElementById("sayfa").value),
    genre: "Diğer",
    status: seciliDurum,
    rating: 0,
    cover: kapakResmi,
    summary: ozet,
    description: ozet
  };

  // Kısa özet uzunsa kes, tamamı detay sayfasında görünür
  if (ozet.length > 150) {
    yeni.summary = ozet.slice(0, 150) + "...";
  }

  if (yeni.title == "" || yeni.author == "" || ozet == "") {
    hataGoster("Kitap adı, yazar ve özet boş bırakılamaz.");
    return;
  }

  let liste = eklenenleriOku();
  liste.push(yeni);

  try {
    localStorage.setItem("eklenenKitaplar", JSON.stringify(liste));
  } catch (hata) {
    hataGoster("Kitap kaydedilemedi: tarayıcının saklama alanı dolu ya da kapalı.");
    return;
  }

  location.href = "details.html?id=" + yeni.id;   // eklenen kitabın sayfasına git
}

durumlariGoster();
