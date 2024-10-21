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
