let coinCount = 0;
let initialTime = 8 * 60 * 60; // 8 часов в секундах
let timerElement = document.getElementById('timer');
let coinCountElement = document.getElementById('coinCount');

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimer() {
    if (initialTime > 0) {
        initialTime--;
        timerElement.textContent = formatTime(initialTime);
    }
}

function addCoin() {
    if (initialTime > 0) {
        coinCount++;
        coinCountElement.textContent = coinCount;
    }
}

setInterval(updateTimer, 1000); // Обновление таймера каждую секунду
// Функция генерации случайного ID
function generateID() {
    // Генерация строки из 10 случайных символов (буквы и цифры)
    let newID = 'id-' + Math.random().toString(36).substr(2, 10);
    document.getElementById('generatedID').textContent = newID;

    // Сохранение ID в localStorage
    storeID(newID);
}

// Функция сохранения ID в localStorage
function storeID(id) {
    // Получаем текущие сохраненные ID
    let storedIDs = JSON.parse(localStorage.getItem('generatedIDs')) || [];
    
    // Добавляем новый ID
    storedIDs.push(id);
    
    // Обновляем localStorage
    localStorage.setItem('generatedIDs', JSON.stringify(storedIDs));
}

// Функция отображения сохраненных ID
function showStoredIDs() {
    let storedIDs = JSON.parse(localStorage.getItem('generatedIDs')) || [];
    let idList = document.getElementById('idList');
    
    // Очистка текущего списка
    idList.innerHTML = '';
    
    // Добавляем каждый ID в список
    storedIDs.forEach(id => {
        let listItem = document.createElement('li');
        listItem.textContent = id;
        idList.appendChild(listItem);
    });
}
