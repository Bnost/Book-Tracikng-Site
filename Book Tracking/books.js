// ORTAK KİTAP LİSTESİ - bütün sayfalar bu dosyayı kullanır.
// Sabit alanlar: id, title, author, pages, genre, status, rating
// Ana sayfa için eklenen alanlar: cover (kapak resmi yolu), summary (kısa özet)
// cover boş bırakılırsa ana sayfada kitabın adının yazdığı renkli bir kapak çıkar.
// Ana sayfadaki raflarda 10 yer var; şimdilik listedeki ilk 10 kitap görünür.

const books = [
  { id: 1, title: "Kızıl Yükseliş", author: "Pierce Brown", pages: 448, genre: "Bilim Kurgu", status: "Okunacak", rating: 0,
    cover: "kapaklar/kizil-yukselis.jpg", summary: "Mars'ta en alt kasttan Darrow, kendi halkını ezen Altınlar'ın arasına sızarak düzeni içeriden yıkmaya çalışır." },
  { id: 2, title: "Pal Sokağı Çocukları", author: "Ferenc Molnár", pages: 200, genre: "Roman", status: "Okunacak", rating: 0,
    cover: "kapaklar/pal-sokagi-cocuklari.jpg", summary: "Budapeşte'de oyun alanlarını korumak için birleşen çocukların Kızıl Gömlekliler'e karşı mücadelesi." },
  { id: 3, title: "1984", author: "George Orwell", pages: 352, genre: "Distopya", status: "Okunacak", rating: 0,
    cover: "kapaklar/1984.jpg", summary: "Her şeyin Büyük Birader tarafından izlendiği bir dünyada Winston Smith'in özgürlük arayışı." },
  { id: 4, title: "Hayvan Çiftliği", author: "George Orwell", pages: 152, genre: "Distopya", status: "Okunacak", rating: 0,
    cover: "kapaklar/hayvan-ciftligi.jpg", summary: "Sahibini kovan hayvanların kurduğu eşit düzen, domuzların yönetiminde yavaş yavaş yeni bir baskıya dönüşür." },
  { id: 5, title: "Fahrenheit 451", author: "Ray Bradbury", pages: 208, genre: "Distopya", status: "Okunacak", rating: 0,
    cover: "kapaklar/fahrenheit-451.jpg", summary: "Kitapların yasak olduğu bir gelecekte, kitap yakmakla görevli itfaiyeci Montag her şeyi sorgulamaya başlar." },
  { id: 6, title: "Hababam Sınıfı", author: "Rıfat Ilgaz", pages: 216, genre: "Mizah", status: "Okunacak", rating: 0,
    cover: "kapaklar/hababam-sinifi.jpg", summary: "Yatılı bir lisenin yaramaz öğrencileri ile onları yola getirmeye çalışan öğretmenlerinin komik maceraları." },
  { id: 7, title: "Suç ve Ceza", author: "Dostoyevski", pages: 687, genre: "Roman", status: "Okunacak", rating: 0,
    cover: "kapaklar/suc-ve-ceza.jpg", summary: "Yoksul bir öğrenci olan Raskolnikov'un işlediği bir cinayetin ardından yaşadığı vicdan azabını anlatır." },
  { id: 8, title: "Simyacı", author: "Paulo Coelho", pages: 184, genre: "Roman", status: "Okunacak", rating: 0,
    cover: "kapaklar/simyaci.jpg", summary: "Çoban Santiago'nun hazinesini bulmak için çıktığı ve kendini keşfettiği yolculuk." },
  { id: 9, title: "Son Dilek (The Witcher 1)", author: "Andrzej Sapkowski", pages: 400, genre: "Fantastik", status: "Okunacak", rating: 0,
    cover: "kapaklar/son-dilek.jpg", summary: "Canavar avcısı Witcher Geralt'ın, kimin gerçek canavar olduğunu sorgulatan birbirine bağlı öyküleri." },
  { id: 10, title: "Kader Kılıcı (The Witcher 2)", author: "Andrzej Sapkowski", pages: 440, genre: "Fantastik", status: "Okunacak", rating: 0,
    cover: "kapaklar/kader-kilici.jpg", summary: "Geralt'ın yeni maceraları sürerken yolu, kaderinin bağlı olduğu küçük prenses Ciri ile kesişir." },
  { id: 11, title: "Tanrıların Gölgesi", author: "John Gwynne", pages: 576, genre: "Fantastik", status: "Okunacak", rating: 0,
    cover: "kapaklar/tanrilarin-golgesi.jpg", summary: "Tanrıların savaşında yıkılmış, Viking esintili bir dünyada üç savaşçının kesişen yolları." },
  { id: 12, title: "Tanrıların Açlığı", author: "John Gwynne", pages: 688, genre: "Fantastik", status: "Okunacak", rating: 0,
    cover: "kapaklar/tanrilarin-acligi.jpg", summary: "Tanrıların Gölgesi'nin devamı: ejderha tanrı Lik-Rifa serbest kalmıştır ve dünya yeni bir savaşa sürüklenir." },
  { id: 13, title: "Yaşamak", author: "Yu Hua", pages: 210, genre: "Roman", status: "Okunacak", rating: 0,
    cover: "kapaklar/yasamak.webp", summary: "Servetini kumarda kaybeden Fugui'nin, Çin'in çalkantılı yıllarında kayıplara rağmen hayata tutunması." },
  { id: 14, title: "Otomatik Portakal", author: "Anthony Burgess", pages: 171, genre: "Distopya", status: "Okunacak", rating: 0,
    cover: "kapaklar/otomatik-portakal.jpg", summary: "Şiddet düşkünü genç Alex'in devlet eliyle zorla iyileştirilmesi üzerinden özgür iradeyi sorgular." }
];
