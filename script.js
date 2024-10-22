// Firebase конфигурация (замените на свои данные)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Инициализация Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let userId = getUserId();
let coinCount = 0;
let canClick = true;
let cooldown = 10; // 10 секунд

// DOM элементы
const coinCountElement = document.getElementById('coinCount');
const coinButton = document.getElementById('coinButton');

// Получаем ID пользователя или создаем новый
function getUserId() {
    let storedId = localStorage.getItem('userId');
    if (storedId) return storedId;

    const newId = 'user-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', newId);
    return newId;
}

// Загружаем прогресс пользователя из Firebase
function loadUserProgress() {
    database.ref('users/' + userId).once('value').then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            coinCount = data.coinCount || 0;
            coinCountElement.textContent = coinCount;
        }
    });
}

// Сохраняем прогресс пользователя в Firebase
function saveUserProgress() {
    database.ref('users/' + userId).set({
        coinCount: coinCount
    });
}

// Обработка нажатия на кнопку
function handleButtonClick() {
    if (canClick) {
        coinCount += 100;
        coinCountElement.textContent = coinCount;
        saveUserProgress();

        canClick = false;
        coinButton.disabled = true;
        startCooldown();
    }
}

// Запуск кулдауна
function startCooldown() {
    let timer = cooldown;
    const interval = setInterval(() => {
        timer--;
        if (timer <= 0) {
            clearInterval(interval);
            canClick = true;
            coinButton.disabled = false;
        }
    }, 1000);
}

// Загрузка прогресса при открытии страницы
loadUserProgress();

