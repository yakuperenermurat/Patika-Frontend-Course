// Mevcut listedeki öğelere X butonu ve işaretleme işlevi ekleyelim
document.addEventListener('DOMContentLoaded', function() {
    const listItems = document.querySelectorAll('#list li'); // Mevcut liste elemanlarını seç
    
    listItems.forEach(item => {
        // Mevcut liste elemanlarına X butonu ekle
        const span = document.createElement("span");
        const txt = document.createTextNode("\u00D7"); // X işareti oluştur
        span.className = "close"; // X butonuna class ekle
        span.appendChild(txt);
        item.appendChild(span);

        // Silme işlevi (X butonuna tıklandığında)
        span.onclick = function () {
            const div = this.parentElement; // Butonun bağlı olduğu li öğesini bul
            div.remove(); // Li öğesini sil
        };

        // İşaretleme işlevi (tıkladığında üstünü çiz)
        item.addEventListener('click', function() {
            item.classList.toggle('checked'); // checked sınıfını ekle/kaldır
        });
    });
});

// Yeni yapılacak eleman eklemek
function newElement() {
    const taskInput = document.getElementById("task").value.trim(); // Input alanındaki değeri al ve boşlukları temizle
    const list = document.getElementById("list"); // Listeyi al

    // Boş veya sadece boşluk karakteri kontrolü
    if (taskInput === "") {
        showToast("Listeye boş ekleme yapamazsınız!", "error"); // Toast bildirimi göster
        return;
    }

    // Yeni liste elemanı (li) oluştur
    const li = document.createElement("li");
    const textNode = document.createTextNode(taskInput); // Yazıyı oluştur
    li.appendChild(textNode); // Li'ye yazıyı ekle
    list.appendChild(li); // Listeye yeni elemanı ekle

    // Yeni X butonu ekle
    const span = document.createElement("span");
    const txt = document.createTextNode("\u00D7");
    span.className = "close"; // Class ekle
    span.appendChild(txt);
    li.appendChild(span);

    // Silme işlevi
    span.onclick = function () {
        const div = this.parentElement; // Butonun bağlı olduğu li öğesini bul
        div.remove(); // Li öğesini sil
    };

    // Eleman tıklanınca üstü çizilecek
    li.addEventListener("click", function () {
        li.classList.toggle("checked"); // checked sınıfını ekle/kaldır
    });

    document.getElementById("task").value = ""; // Input alanını temizler
    showToast("Listeye başarıyla eklendi.", "success"); // Başarı toast bildirimi
}

// Toast bildirimini göstermek
function showToast(message, type) {
    const toast = document.getElementById("liveToast"); // Toast elementini bul
    const toastBody = toast.querySelector(".toast-body"); // Toast'un mesaj alanını bul
    toastBody.innerText = message; // Mesajı ayarla

    // Hata veya başarı durumuna göre sınıf ekle
    toast.className = "toast " + (type === "success" ? "bg-success" : "bg-danger");

    // Bootstrap'in toast olayını tetikle
    const toastBootstrap = new bootstrap.Toast(toast);
    toastBootstrap.show(); // Toast'u göster
}
