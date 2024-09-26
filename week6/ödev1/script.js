document.addEventListener('DOMContentLoaded', function() {
    loadListFromLocalStorage(); // Sayfa yüklendiğinde listeyi yükle
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
    addCloseButton(li);
    addToggleChecked(li);

    // Local Storage'a ekleyelim
    saveListToLocalStorage();

    document.getElementById("task").value = ""; // Input alanını temizler
    showToast("Listeye başarıyla eklendi.", "success"); // Başarı toast bildirimi
}

// Listeye X butonu eklemek için fonksiyon
function addCloseButton(item) {
    const span = document.createElement("span");
    const txt = document.createTextNode("\u00D7"); // X işareti oluştur
    span.className = "close"; // X butonuna class ekle
    span.appendChild(txt);
    item.appendChild(span);

    // Silme işlevi (X butonuna tıklandığında)
    span.onclick = function () {
        const div = this.parentElement; // Butonun bağlı olduğu li öğesini bul
        div.remove(); // Li öğesini sil
        saveListToLocalStorage(); // Local Storage'ı güncelle
    };
}

// İşaretleme işlevi eklemek için fonksiyon
function addToggleChecked(item) {
    item.addEventListener('click', function() {
        item.classList.toggle('checked'); // checked sınıfını ekle/kaldır
        saveListToLocalStorage(); // İşaretleme durumunu Local Storage'a kaydet
    });
}

// Local Storage'a listeyi kaydetmek
function saveListToLocalStorage() {
    const listItems = document.querySelectorAll('#list li');
    const tasks = [];

    listItems.forEach(item => {
        tasks.push({
            text: item.firstChild.textContent,
            checked: item.classList.contains('checked') // İşaretli olup olmadığını kaydet
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Local Storage'dan listeyi yüklemek
function loadListFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    const list = document.getElementById('list');

    // Mevcut listeyi temizle (sayfa yenilenmesinde yinelenen verileri engellemek için)
    list.innerHTML = "";

    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            const textNode = document.createTextNode(task.text);
            li.appendChild(textNode);

            if (task.checked) {
                li.classList.add('checked');
            }

            addCloseButton(li);
            addToggleChecked(li);

            list.appendChild(li);
        });
    }
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
