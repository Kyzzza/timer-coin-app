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

// Запуск таймера и блокировка кнопки
function startTimer() {
    if (canCollect) {
        // Начисляем 100 монет
        coinCount += 100;
        coinCountElement.textContent = coinCount;

        // Отключаем кнопку и запускаем таймер
        canCollect = false;
        coinButton.disabled = true;
        timer = cooldown;
        timerElement.textContent = timer;

        // Интервал для обновления таймера
        let timerInterval = setInterval(() => {
            timer--;
            timerElement.textContent = timer;

            if (timer <= 0) {
                clearInterval(timerInterval);
                canCollect = true;
                coinButton.disabled = false;
                timerElement.textContent = '0';
            }
        }, 1000);
    }
}
