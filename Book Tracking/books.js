// ORTAK KİTAP LİSTESİ - bütün sayfalar bu dosyayı kullanır.
// Sabit alanlar: id, title, author, pages, genre, status, rating
// Ana sayfa için eklenen alanlar: cover (kapak resmi yolu), summary (kısa özet)
// Detay sayfası için eklenen alan: description (uzun özet)
// rating: incelemesi olmayan kitaplar için puan (0-5). İncelemesi olanlarda skor ortak.js'te incelemelerden hesaplanır.
// cover boş bırakılırsa ana sayfada kitabın adının yazdığı renkli bir kapak çıkar.
// Ana sayfadaki raflarda 10 yer var; puanı en yüksek 10 kitap görünür.

const books = [
  { id: 1, title: "Kızıl Yükseliş", author: "Pierce Brown", pages: 448, genre: "Bilim Kurgu", status: "Okunacak", rating: 4.5,
    cover: "kapaklar/kizil-yukselis.jpg", summary: "Mars'ta en alt kasttan Darrow, kendi halkını ezen Altınlar'ın arasına sızarak düzeni içeriden yıkmaya çalışır.",
    description: "Gelecekte insanlık renklere göre kastlara ayrılmıştır. En alttaki Kızıllar, Mars'ı yaşanabilir kılmak için yer altında çalıştıklarına inanır. Genç madenci Darrow, eşini kaybettikten sonra bunun bir yalan olduğunu öğrenir: yüzey çoktan şehirlerle doludur. Bir direniş örgütünün yardımıyla yönetici sınıf Altınlar'dan biri gibi değiştirilir ve onların en acımasız eğitim kurumuna girer. Orada ayakta kalmak için hem düşmanlarını hem de kendi öfkesini yönetmeyi öğrenmek zorundadır." },
  { id: 2, title: "Pal Sokağı Çocukları", author: "Ferenc Molnár", pages: 200, genre: "Roman", status: "Okunacak", rating: 4.5,
    cover: "kapaklar/pal-sokagi-cocuklari.jpg", summary: "Budapeşte'de oyun alanlarını korumak için birleşen çocukların Kızıl Gömlekliler'e karşı mücadelesi.",
    description: "Budapeşte'de bir grup çocuk için Pal Sokağı'ndaki boş arsa yalnızca bir oyun alanı değil, korunması gereken bir vatandır. Rakip çete Kızıl Gömlekliler arsayı ele geçirmek isteyince çocuklar, liderleri Boka'nın etrafında toplanır. Grubun tek eri olan ufak tefek Nemeçek, cesareti ve sadakatiyle herkese gerçek kahramanlığın ne olduğunu gösterir. Dostluk, onur ve büyümek üzerine dokunaklı bir klasik." },
  { id: 3, title: "1984", author: "George Orwell", pages: 352, genre: "Distopya", status: "Okunacak", rating: 5,
    cover: "kapaklar/1984.jpg", summary: "Her şeyin Büyük Birader tarafından izlendiği bir dünyada Winston Smith'in özgürlük arayışı.",
    description: "Okyanusya'da Parti, insanların davranışlarını olduğu kadar düşüncelerini de denetler. Tele-ekranlar her an izler, geçmiş sürekli yeniden yazılır. Doğruluk Bakanlığı'nda eski haberleri değiştirmekle görevli Winston Smith, gizlice bir günlük tutmaya ve sistemi sorgulamaya başlar. Julia ile yaşadığı yasak aşk onu daha da tehlikeli bir yola sürükler. Orwell gözetim, propaganda ve gerçeğin çarpıtılması üzerine unutulmaz bir uyarı kaleme almıştır." },
  { id: 4, title: "Hayvan Çiftliği", author: "George Orwell", pages: 152, genre: "Distopya", status: "Okunacak", rating: 4.5,
    cover: "kapaklar/hayvan-ciftligi.jpg", summary: "Sahibini kovan hayvanların kurduğu eşit düzen, domuzların yönetiminde yavaş yavaş yeni bir baskıya dönüşür.",
    description: "Beylik Çiftlik'in hayvanları, kendilerini aç bırakan Bay Jones'u kovarak yönetimi ele geçirir ve bütün hayvanların eşit olduğu bir düzen kurar. Okuma yazma bilen domuzlar zamanla liderliği üstlenir. Napoléon, rakibi Snowball'dan kurtulunca kurallar birer birer değişmeye başlar. Orwell, devrimlerin ve iktidarın nasıl yozlaşabileceğini sade bir masal diliyle anlatır." },
  { id: 5, title: "Fahrenheit 451", author: "Ray Bradbury", pages: 208, genre: "Distopya", status: "Okunacak", rating: 4,
    cover: "kapaklar/fahrenheit-451.jpg", summary: "Kitapların yasak olduğu bir gelecekte, kitap yakmakla görevli itfaiyeci Montag her şeyi sorgulamaya başlar.",
    description: "Evlerin yanmaz olduğu bir gelecekte itfaiyecilerin görevi yangın söndürmek değil, yasaklanmış kitapları yakmaktır. Guy Montag işini sorgulamadan yapar, ta ki meraklı komşusu Clarisse ona mutlu olup olmadığını sorana kadar. Duvar boyu ekranlara bağlanmış bir toplumda gizlice kitap saklamaya başlayan Montag, hem amiri Beatty hem de Mekanik Tazı için bir hedefe dönüşür. Bradbury okumanın ve düşünmenin değerini hatırlatır." },
  { id: 6, title: "Hababam Sınıfı", author: "Rıfat Ilgaz", pages: 216, genre: "Mizah", status: "Okunacak", rating: 4,
    cover: "kapaklar/hababam-sinifi.jpg", summary: "Yatılı bir lisenin yaramaz öğrencileri ile onları yola getirmeye çalışan öğretmenlerinin komik maceraları.",
    description: "Yatılı bir lisenin haylaz sınıfı, derslerden kaytarmak ve kopya çekmek için akla gelmedik yollar bulur. İnek Şaban, Güdük Necmi, Tulum Hayri ve arkadaşları öğretmenlerini çileden çıkarır; ne var ki yaramazlıklarının ardında sağlam bir dostluk vardır. Rıfat Ilgaz, güldürürken eğitim düzenindeki aksaklıkları da eleştirir." },
  { id: 7, title: "Suç ve Ceza", author: "Dostoyevski", pages: 687, genre: "Roman", status: "Okunacak", rating: 4.5,
    cover: "kapaklar/suc-ve-ceza.jpg", summary: "Yoksul bir öğrenci olan Raskolnikov'un işlediği bir cinayetin ardından yaşadığı vicdan azabını anlatır.",
    description: "St. Petersburg'da yoksulluk içinde yaşayan eski öğrenci Raskolnikov, olağanüstü insanların ahlak kurallarını aşabileceğine inanır ve tefeci bir kadını öldürür. Ancak cinayetten sonra korku, suçluluk ve yalnızlık peşini bırakmaz. Zeki sorgu yargıcı Porfiri ona yaklaşırken, zor bir hayat süren Sonya'nın inancı ona başka bir yol gösterir. Dostoyevski suçun asıl cezasının insanın içinde başladığını anlatır." },
  { id: 8, title: "Simyacı", author: "Paulo Coelho", pages: 184, genre: "Roman", status: "Okunacak", rating: 3.5,
    cover: "kapaklar/simyaci.jpg", summary: "Çoban Santiago'nun hazinesini bulmak için çıktığı ve kendini keşfettiği yolculuk.",
    description: "Endülüslü genç çoban Santiago, Mısır piramitlerinin yanında gömülü bir hazineyi rüyasında görür. Sürüsünü satıp yola çıkar; Tanca'da parasını kaybeder, bir billuriye dükkânında çalışır ve çölü geçen bir kervana katılır. Yolda karşılaştığı Fatima ve gizemli simyacı, ona yüreğini dinlemeyi ve kendi Kişisel Menkıbe'sinin peşinden gitmeyi öğretir." },
  { id: 9, title: "Son Dilek (The Witcher 1)", author: "Andrzej Sapkowski", pages: 400, genre: "Fantastik", status: "Okunacak", rating: 4.5,
    cover: "kapaklar/son-dilek.jpg", summary: "Canavar avcısı Witcher Geralt'ın, kimin gerçek canavar olduğunu sorgulatan birbirine bağlı öyküleri.",
    description: "Rivyalı Geralt, para karşılığı canavar avlayan bir Witcher'dır; insanüstü yetenekleri onu hem aranan hem de dışlanan biri yapar. Bu ilk kitap, Geralt bir tapınakta yaralarını iyileştirirken araya giren öykülerden oluşur. Pamuk Prenses ya da Güzel ve Çirkin gibi bilinen masallar karanlık biçimlerde karşımıza çıkar. Geralt ile büyücü Yennefer'in tanışması da kitaba adını veren öyküde anlatılır." },
  { id: 10, title: "Kader Kılıcı (The Witcher 2)", author: "Andrzej Sapkowski", pages: 440, genre: "Fantastik", status: "Okunacak", rating: 4.5,
    cover: "kapaklar/kader-kilici.jpg", summary: "Geralt'ın yeni maceraları sürerken yolu, kaderinin bağlı olduğu küçük prenses Ciri ile kesişir.",
    description: "Serinin ikinci öykü kitabında Geralt, ejderha avından değişen bir dünyada yok olan türlere kadar pek çok ahlaki ikilemle yüzleşir. Yennefer ile ilişkisi onu sınarken, ozan Dandelion yolculuklarına neşe katar. Brokilon Ormanı'nda karşılaştığı küçük Ciri ise Geralt'ın kaçtığı kaderin ta kendisidir. Öyküler, ana romanlarda anlatılacak büyük hikâyenin temelini kurar." },
  { id: 11, title: "Tanrıların Gölgesi", author: "John Gwynne", pages: 576, genre: "Fantastik", status: "Okunacak", rating: 4,
    cover: "kapaklar/tanrilarin-golgesi.jpg", summary: "Tanrıların savaşında yıkılmış, Viking esintili bir dünyada üç savaşçının kesişen yolları.",
    description: "Tanrıların birbirini yok ettiği savaştan yüzyıllar sonra, kemikleri hâlâ güç taşıyan Vigrið topraklarında insanlar ayakta kalmaya çalışır. Oğlu kaçırılan Orka onu geri almak için yola çıkar; ayrıcalıklı hayatını bırakan Elvar paralı savaşçılar arasında ün arar; kaçak köle Varg ise kız kardeşinin ölümünün ardındaki gerçeği öğrenmek ister. İskandinav mitolojisinden beslenen, sert ve görkemli bir destan." },
  { id: 12, title: "Tanrıların Açlığı", author: "John Gwynne", pages: 688, genre: "Fantastik", status: "Okunacak", rating: 4.5,
    cover: "kapaklar/tanrilarin-acligi.jpg", summary: "Tanrıların Gölgesi'nin devamı: ejderha tanrı Lik-Rifa serbest kalmıştır ve dünya yeni bir savaşa sürüklenir.",
    description: "İlk kitabın sonunda zincirlerinden kurtulan ejderha tanrı Lik-Rifa, yandaşlarını etrafına toplayarak dünyayı ele geçirmeye hazırlanır. Orka oğlunu aramayı sürdürür, Elvar verdiği yeminle yüzleşir, Varg ise Kan Yeminliler arasındaki yerini bulur. Yeni bakış açılarıyla genişleyen hikâyede bir tanrıya karşı koymanın yolu, başka bir tanrının gücüne başvurmaktan geçebilir." },
  { id: 13, title: "Yaşamak", author: "Yu Hua", pages: 210, genre: "Roman", status: "Okunacak", rating: 5,
    cover: "kapaklar/yasamak.webp", summary: "Servetini kumarda kaybeden Fugui'nin, Çin'in çalkantılı yıllarında kayıplara rağmen hayata tutunması.",
    description: "Zengin bir ailenin şımarık oğlu Fugui, bütün servetini kumarda kaybeder ve yoksul bir köylü olarak yeniden başlamak zorunda kalır. İç savaş, Büyük İleri Atılım ve Kültür Devrimi yıllarında sevdiklerini birer birer yitirirken yaşamaya devam eder. Yu Hua, yaşlı Fugui'nin bir yabancıya anlattığı bu hikâyede acıyı süssüz ve sakin bir dille aktarır." },
  { id: 14, title: "Otomatik Portakal", author: "Anthony Burgess", pages: 171, genre: "Distopya", status: "Okunacak", rating: 3.5,
    cover: "kapaklar/otomatik-portakal.jpg", summary: "Şiddet düşkünü genç Alex'in devlet eliyle zorla iyileştirilmesi üzerinden özgür iradeyi sorgular.",
    description: "On beş yaşındaki Alex, klasik müziğe tutkundur; geceleri ise çetesiyle birlikte şiddet saçar. Yakalanıp hapse girince, suçluları kısa sürede uslandıracağı söylenen deneysel Ludovico tekniğine gönüllü olur. Artık kötülük yapamaz, ama seçim yapma hakkını da yitirmiştir. Burgess, uydurduğu Nadsat argosuyla iyiliğin zorla öğretilip öğretilemeyeceğini tartışır." }
];
