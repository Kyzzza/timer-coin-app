let coinCount = 0;
let cooldown = 10; // 10 секунд кулдаун
let timer = 0;
let canCollect = true;
let userId = getUserId(); // Получаем или создаем уникальный ID пользователя

// DOM элементы
let coinCountElement = document.getElementById('coinCount');
let timerElement = document.getElementById('timer');
let coinButton = document.getElementById('coinButton');
let userIdElement = document.getElementById('userId');

// Инициализация данных из localStorage
initializeData();

// Отображаем ID пользователя
userIdElement.textContent = userId;

// Получаем или создаем уникальный ID пользователя
function getUserId() {
    let storedId = localStorage.getItem('userId');
    if (storedId) {
        return storedId;
    } else {
        let newId = 'user-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', newId);
        return newId;
    }
}

// Сохранение данных (счетчик монет и таймер) в localStorage
function saveData() {
    localStorage.setItem('coinCount', coinCount);
    localStorage.setItem('timer', timer);
    localStorage.setItem('canCollect', canCollect);
}

// Инициализация данных из localStorage
function initializeData() {
    // Восстанавливаем баланс монет
    let storedCoinCount = localStorage.getItem('coinCount');
    if (storedCoinCount) {
        coinCount = parseInt(storedCoinCount);
        coinCountElement.textContent = coinCount;
    }

    // Восстанавливаем таймер
    let storedTimer = localStorage.getItem('timer');
    if (storedTimer) {
        timer = parseInt(storedTimer);
        if (timer > 0) {
            canCollect = false;
            coinButton.disabled = true;
            resumeTimer();
        }
    }

    // Восстанавливаем состояние кнопки
    let storedCanCollect = localStorage.getItem('canCollect');
    if (storedCanCollect === 'false') {
        canCollect = false;
        coinButton.disabled = true;
    }
}

// Запуск таймера и блокировка кнопки
function startTimer() {
    if (canCollect) {
        // Начисляем 100 монет
        coinCount += 100;
        coinCountElement.textContent = coinCount;

        // Сохранение состояния монет
        saveData();

        // Отключаем кнопку и запускаем таймер
        canCollect = false;
        coinButton.disabled = true;
        timer = cooldown;
        timerElement.textContent = timer;

        // Сохраняем состояние таймера
        saveData();

        resumeTimer();
    }
}

// Продолжение работы таймера (при перезагрузке страницы)
function resumeTimer() {
    let timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        saveData(); // Сохраняем каждое обновление таймера

        if (timer <= 0) {
            clearInterval(timerInterval);
            canCollect = true;
            coinButton.disabled = false;
            timerElement.textContent = '0';
            saveData();
        }
    }, 1000);
}
