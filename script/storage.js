function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getToStorage(key, defaultVal) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : defaultVal;
}
