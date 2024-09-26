// Tuş basımı olayını dinlemek
window.addEventListener('keydown', playSound);

// Fare tıklama olayını dinlemek için ekleme
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', playClickSound));

// Fare tıklama ile ses çalma fonksiyonu
function playClickSound(e) {
    const key = e.currentTarget; // Tıklanan element
    const keyCode = key.getAttribute('data-key'); // Elementin data-key özelliğini al
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`); // Ses dosyasını bul
    
    if (!audio) return; // Eğer ses dosyası yoksa çık
    
    audio.currentTime = 0; // Sesin baştan başlamasını sağlar
    audio.play(); // Ses çalar
    
    key.classList.add('playing'); // Tuşa animasyon ekler
}

// Klavyeden basılan tuş için ses çalma fonksiyonu
function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); // Basılan tuşa göre ses dosyasını bul
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); // İlgili tuş elementini bul
    
    if (!audio) return; // Eğer ses dosyası yoksa fonksiyondan çık
    
    audio.currentTime = 0; // Sesin baştan başlamasını sağlar
    audio.play(); // Ses çalar
    
    key.classList.add('playing'); // Tuşa animasyon ekler
}

// Animasyonun bitmesini dinleyip sınıfı kaldırmak
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

// Animasyonun bittiği anda "playing" sınıfını kaldırır
function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // Sadece transform özelliği için tetiklenir
    this.classList.remove('playing'); // Animasyon bitince "playing" sınıfını kaldırır
}
