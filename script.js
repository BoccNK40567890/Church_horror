const counterDisplay = document.getElementById('counter');
const nameInput = document.getElementById('nameInput');
const saveButton = document.getElementById('saveButton');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
const buyRedBackgroundButton = document.getElementById('buyRedBackground');
const buyTitleChangeButton = document.getElementById('buyTitleChange');
let currentCount = 0;

function addPointsOnSomeAction() {
    const secretCodeInput = document.getElementById('secretCodeInput');
    const enteredCode = secretCodeInput.value.trim().toLowerCase();

    if (enteredCode === "cookie") {
        currentCount += 333;
        updatePage();
        messageDisplay.textContent = "Добавлено 333 очков!";
        messageDisplay.style.color = "green";
        secretCodeInput.value = "";
    } else if (enteredCode === "смерть") {
        currentCount += 10000;
        updatePage();
        messageDisplay.textContent = "Веселись!!!";
        messageDisplay.style.color = "green";
        secretCodeInput.value = "";
    }
}

function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams;
}

function updatePage() {
    if (currentCount >= 10000 || document.getElementById('red-overlay').style.display === 'block') {
        document.getElementById('red-overlay').style.display = 'block';
    } else {
        document.getElementById('red-overlay').style.display = 'none';
    }
    counterDisplay.textContent = currentCount;
}

function loadCounter() {
    const savedName = localStorage.getItem('name');
    if (savedName) {
        nameInput.value = savedName;
        const savedCount = localStorage.getItem(`score_${savedName}`);
        if (savedCount) {
            currentCount = parseInt(savedCount);
        }
    } else {
        messageDisplay.textContent = "Пожалуйста, сохраните ваше имя";
        messageDisplay.style.color = "red";
    }
}

function saveCounter() {
    const name = nameInput.value;
    if (name) {
        localStorage.setItem('name', name);
        localStorage.setItem(`score_${name}`, currentCount);
        messageDisplay.textContent = "Сохранено!";
        messageDisplay.style.color = "green";
    } else {
        messageDisplay.textContent = "Введите ваше имя!";
        messageDisplay.style.color = "red";
    }
}

function addPointsIfNeeded() {
    const params = getParams();
        if (params.get('addPoints') === 'true') {
        currentCount += 100;
    }
    if (params.get('addPointsFromDead6') === 'true') {
        currentCount += 50;
    }
    updatePage();
}

function resetCounter() {
    const name = nameInput.value;
    if (name) {
        localStorage.removeItem(`score_${name}`);
        currentCount = 0;
        updatePage();
        messageDisplay.textContent = "Счетчик сброшен!";
        messageDisplay.style.color = "blue";
    } else {
        messageDisplay.textContent = "Сначала сохраните ваше имя!";
        messageDisplay.style.color = "red";
    }
}

function buyItem(event) {
    const button = event.target;
    const cost = parseInt(button.dataset.cost);
    const redOverlay = document.getElementById('red-overlay');

    if (currentCount >= cost) {
        currentCount -= cost;

        if (button.id === 'buyRedBackground') {
            redOverlay.style.display = 'block';
        } else if (button.id === 'buyTitleChange') {
            document.title = "Профи";
        }

        updatePage();
        messageDisplay.textContent = "Покупка совершена!";
        messageDisplay.style.color = "green";
    } else {
        messageDisplay.textContent = "Недостаточно очков!";
        messageDisplay.style.color = "red";
    }
}

loadCounter();
addPointsIfNeeded();
updatePage();
saveButton.addEventListener('click', saveCounter);
resetButton.addEventListener('click', resetCounter);
buyRedBackgroundButton.addEventListener('click', buyItem);
buyTitleChangeButton.addEventListener('click', buyItem);
document.getElementById('secretCodeInput').addEventListener('input', addPointsOnSomeAction);
