// Kullanıcıdan isim almak için prompt fonksiyonu kullanılıyor
let userName = prompt("Adınız nedir?");

// Kullanıcının girdiği ismi HTML'deki <span> etiketine yazdırır
document.getElementById("myName").innerText = userName;

// Saat ve tarihi göstermek için bir fonksiyon tanımlanıyor
function showTime() {
  // Şu anki tarih ve saat bilgilerini almak için Date objesi oluşturuluyor
  let date = new Date();
  
  // Saat, dakika ve saniye bilgilerini alır
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Saat, dakika ve saniye değerleri 10'dan küçükse başlarına 0 eklenir (örneğin 09:05:03)
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Saat, dakika ve saniyeyi birleştirerek bir zaman formatı oluşturur
  let currentTime = hours + ":" + minutes + ":" + seconds;

  // Gün bilgisi için günlerin dizisi oluşturuluyor
  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi"
  ];
  
  // Şu anki günü alır (0 Pazar, 1 Pazartesi, vs.)
  let currentDay = days[date.getDay()];

  // Saat ve gün bilgilerini birleştirip HTML'deki <div> etiketine yazar
  document.getElementById("myClock").innerText = `${currentTime} ${currentDay}`;

  // showTime fonksiyonu 1 saniye (1000 milisaniye) sonra tekrar çalışır
  setTimeout(showTime, 1000);
}

// Sayfa yüklendiğinde saati göstermeye başlar
showTime();
