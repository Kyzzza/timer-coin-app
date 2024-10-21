let coinCount = 0;
let cooldown = 10; // 10 секунд кулдаун
let timer = cooldown;
let canCollect = true;
let timerElement = document.getElementById('timer');
let coinCountElement = document.getElementById('coinCount');
let totalCoinsElement = document.getElementById('totalCoins');

function updateTimer() {
    if (timer > 0) {
        timer--;
        timerElement.textContent = timer;
    } else {
        canCollect = true;
        timerElement.textContent = 'Нажми!';
    }
}

function collectCoins() {
    if (canCollect) {
        coinCount += 100;
        totalCoinsElement.textContent = coinCount;
        canCollect = false;
        timer = cooldown;
        timerElement.textContent = timer;
    }
}

setInterval(updateTimer, 1000); // Обновление таймера каждую секунду
