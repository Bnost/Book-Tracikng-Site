// ORTAK FONKSİYONLAR - books.js ve reviews.js'ten sonra bağlanır.

// Puanı 5 yıldız olarak gösterir. Dolu yıldızlar boşların üstüne biner,
// genişliği puana göre kesilir: 4.5 puan = %90 genişlik = 4 buçuk yıldız.
function yildizGoster(puan) {
  if (puan == 0) {
    return "Henüz puanlanmadı";
  }
  return '<span class="yildizlar">★★★★★' +
           '<span class="yildiz-dolu" style="width: ' + (puan / 5 * 100) + '%">★★★★★</span>' +
         '</span> ' + puan + ' / 5';
}

// Okuma durumu tarayıcıda saklanır, sayfa kapanınca kaybolmaz
function durumKaydet(id, durum) {
  try {
    localStorage.setItem("durum-" + id, durum);
  } catch (hata) {
    // tarayıcı saklamaya izin vermezse durum sadece bu sayfada değişir
  }
}

// Kitap Ekle sayfasından eklenen kitaplar tarayıcıda saklanır
function eklenenleriOku() {
  try {
    return JSON.parse(localStorage.getItem("eklenenKitaplar")) || [];
  } catch (hata) {
    return [];
  }
}

// Kullanıcının yazdığı metindeki HTML işaretlerini zararsız hâle getirir,
// böylece sayfaya kod olarak değil düz yazı olarak eklenir
function temizle(metin) {
  return String(metin)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Eklenen kitapları books dizisine kat: bütün sayfalarda görünürler
let eklenenler = eklenenleriOku();
for (let i = 0; i < eklenenler.length; i++) {
  let kitap = eklenenler[i];
  kitap.title = temizle(kitap.title);
  kitap.author = temizle(kitap.author);
  kitap.summary = temizle(kitap.summary);
  kitap.description = temizle(kitap.description);
  kitap.eklendi = true;   // kullanıcının eklediği kitap: silinebilir
  books.push(kitap);
}

// Kitapları ada göre A'dan Z'ye sıralı verir, books dizisinin sırası değişmez
function alfabetikSirala() {
  return books.slice().sort(function (a, b) {
    return a.title.localeCompare(b.title, "tr");   // "tr": Ç, Ş, İ gibi harfler doğru sırada olsun
  });
}

// Kaydedilmiş durumları kitaplara uygula
try {
  for (let i = 0; i < books.length; i++) {
    let kayitli = localStorage.getItem("durum-" + books[i].id);
    if (kayitli != null) {
      books[i].status = kayitli;
    }
  }
} catch (hata) {
  // saklama kapalıysa books.js'teki durumlar kullanılır
}

// Kullanıcının bu kitaba yazdığı incelemeyi verir, yoksa null
function incelemeOku(id) {
  try {
    return JSON.parse(localStorage.getItem("inceleme-" + id));   // yazıyı tekrar nesneye çevirir
  } catch (hata) {
    return null;
  }
}

// Kitabın skoru: örnek incelemeler ve kullanıcının incelemesinin ortalaması
// Hiç inceleme yoksa books.js'teki rating kullanılır
function skorHesapla(kitap) {
  let liste = reviews[kitap.id] || [];
  let toplam = 0;
  let adet = 0;

  for (let i = 0; i < liste.length; i++) {
    toplam = toplam + liste[i].rating;
    adet = adet + 1;
  }

  let benimki = incelemeOku(kitap.id);
  if (benimki != null) {
    toplam = toplam + Number(benimki.rating);
    adet = adet + 1;
  }

  if (adet == 0) {
    return kitap.ilkPuan;
  }
  return Math.round(toplam / adet * 10) / 10;   // virgülden sonra tek basamak
}

// Sayfa açılınca bütün kitapların skorunu hesapla
for (let i = 0; i < books.length; i++) {
  books[i].ilkPuan = books[i].rating;   // books.js'teki puanı sakla
  books[i].rating = skorHesapla(books[i]);
}

// Geri tuşuyla dönülen sayfa eski hâliyle açılabilir, güncel skorlar için yenile
window.addEventListener("pageshow", function (olay) {
  if (olay.persisted) {
    location.reload();
  }
});
