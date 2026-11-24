// KİTAP İNCELEMELERİ - detay sayfasında gösterilir.
// Baştaki sayı, kitabın books.js'teki id'sidir.
// Buradaki kişiler ve yorumlar örnek olarak uydurulmuştur.

const reviews = {
  // Kızıl Yükseliş
  1: [
    { name: "Elif", rating: 5, text: "İlk bölümler biraz yavaş ama Enstitü kısmı başlayınca elimden bırakamadım." },
    { name: "Mert", rating: 4.5, text: "Kast sistemi çok iyi düşünülmüş. Darrow'un iki dünya arasında kalması etkileyici." },
    { name: "Zeynep", rating: 4, text: "Temposu yüksek ve sürükleyici. Karakter sayısı fazla olduğu için bazen karıştırdım." }
  ],
  // Pal Sokağı Çocukları
  2: [
    { name: "Ayşe", rating: 5, text: "Çocukken okumuştum, yıllar sonra yine aynı şekilde duygulandım." },
    { name: "Burak", rating: 4.5, text: "Nemeçek edebiyatın en güzel karakterlerinden biri. Kısa ama çok etkili." },
    { name: "Deniz", rating: 4.5, text: "Çocukların ciddiyeti ve dostlukları çok içten anlatılmış." }
  ],
  // 1984
  3: [
    { name: "Kerem", rating: 5, text: "Yazıldığı tarihe inanmak zor, bugün bile çok güncel." },
    { name: "Selin", rating: 5, text: "Okurken rahatsız eden ama mutlaka okunması gereken bir kitap." },
    { name: "Ozan", rating: 4.5, text: "Ortasındaki uzun açıklama bölümü yavaşlatıyor ama sonu sarsıcı." }
  ],
  // Hayvan Çiftliği
  4: [
    { name: "Cem", rating: 5, text: "Bir oturuşta bitti. Boxer'a çok üzüldüm." },
    { name: "Melis", rating: 4.5, text: "Basit bir dille bu kadar çok şey anlatması harika." },
    { name: "Hakan", rating: 4, text: "Mesajı çok net, güçlü bir taşlama. Biraz daha uzun olmasını isterdim." }
  ],
  // Fahrenheit 451
  5: [
    { name: "Naz", rating: 4.5, text: "Kitapları seven herkesin içi acıyarak okuyacağı bir hikâye." },
    { name: "Emre", rating: 4, text: "Fikri çok güçlü, anlatımı yer yer şiir gibi." },
    { name: "İrem", rating: 3.5, text: "Konusunu sevdim ama bazı betimlemeler bana ağır geldi." }
  ],
  // Hababam Sınıfı
  6: [
    { name: "Fatma", rating: 4.5, text: "Filmini ezbere biliyordum, kitabı da en az onun kadar eğlenceli." },
    { name: "Yusuf", rating: 4, text: "Kısa bölümler hâlinde olduğu için çok rahat okunuyor." },
    { name: "Berk", rating: 3.5, text: "Komik ama filmden oldukça farklı, onu bilerek okumak lazım." }
  ],
  // Suç ve Ceza
  7: [
    { name: "Derya", rating: 5, text: "Raskolnikov'un zihninin içindeymiş gibi hissettim. Başyapıt." },
    { name: "Umut", rating: 4.5, text: "Porfiri ile olan konuşmalar kitabın en iyi bölümleri." },
    { name: "Gizem", rating: 4.5, text: "Rus isimlerine alışmak zaman alıyor ama kesinlikle değiyor." }
  ],
  // Simyacı
  8: [
    { name: "Pelin", rating: 4, text: "Doğru zamanda okuyunca insana umut veriyor." },
    { name: "Arda", rating: 2.5, text: "Güzel bir masal ama verdiği mesajları fazla tekrarlıyor." },
    { name: "Sude", rating: 4, text: "Sade ve akıcı. Altını çizdiğim çok cümle oldu." }
  ],
  // Son Dilek
  9: [
    { name: "Kaan", rating: 5, text: "Oyunları oynadıktan sonra okudum, Geralt'ın dünyasına buradan girmek çok keyifliydi." },
    { name: "Ece", rating: 4.5, text: "Masalların karanlık hâlleri harika. En sevdiğim öykü kitaba adını veren Son Dilek oldu." },
    { name: "Tolga", rating: 4.5, text: "Diyaloglar esprili ve zekice, seriye başlamak için doğru kitap." }
  ],
  // Kader Kılıcı
  10: [
    { name: "Onur", rating: 5, text: "Geralt ile Ciri'nin hikâyesi beni çok duygulandırdı." },
    { name: "Buse", rating: 4.5, text: "İlk kitaptan bile daha olgun ve duygusal buldum." },
    { name: "Efe", rating: 4, text: "Bir iki öykü diğerlerine göre zayıf ama finali çok güçlü." }
  ],
  // Tanrıların Gölgesi
  11: [
    { name: "Barış", rating: 5, text: "Orka son yıllarda okuduğum en iyi fantastik karakter." },
    { name: "Aslı", rating: 4, text: "Viking atmosferi müthiş, dövüş sahneleri film gibi." },
    { name: "Serkan", rating: 3, text: "Terimlere alışmak zor, başları yavaş. Son yüz sayfa ise soluksuz." }
  ],
  // Tanrıların Açlığı
  12: [
    { name: "Cansu", rating: 5, text: "İkinci kitap sendromu yok, ilkinden bile iyi." },
    { name: "Doruk", rating: 4.5, text: "Yeni karakterlerin gözünden okumak dünyayı büyütmüş." },
    { name: "Nehir", rating: 4, text: "Biraz uzun ama son bölümler için her sayfasına değer." }
  ],
  // Yaşamak
  13: [
    { name: "Hande", rating: 5, text: "Bitirdikten sonra uzun süre hiçbir şey okuyamadım." },
    { name: "Volkan", rating: 5, text: "Bu kadar sade bir dille bu kadar derin bir acı anlatılabilir mi?" },
    { name: "Tuğçe", rating: 5, text: "Çok hüzünlü, ama tuhaf bir şekilde insana yaşama gücü veriyor." }
  ],
  // Otomatik Portakal
  14: [
    { name: "Alp", rating: 4.5, text: "Dili başta zorluyor ama sonra insanı içine çekiyor." },
    { name: "Yağmur", rating: 2.5, text: "Şiddet sahneleri rahatsız edici, yine de düşündürüyor." },
    { name: "Koray", rating: 3.5, text: "Özgür irade üzerine çarpıcı bir kitap ama herkese göre değil." }
  ]
};
