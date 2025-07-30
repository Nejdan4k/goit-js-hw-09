// Оголошуємо глобальний об'єкт formData
let formData = { email: "", message: "" };

const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('input[name=email]'),
    message: document.querySelector('textarea[name=message]'),
};

// Додаємо обробник події для вводу в форму
refs.form.addEventListener("input", onInputForm);

// Функція для збереження даних у локальне сховище
function saveToLS(key, value) {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
}

// Функція для завантаження даних з локального сховища
function loadFromLS(key) {
    const body = localStorage.getItem(key);
    try {
        return body ? JSON.parse(body) : null;
    }
    catch (error) {
        console.log('Error parsing data from localStorage:', error);
        return null;
    }
}

// Обробник для вводу в форму
function onInputForm(event) {
    const userEmail = refs.email.value.trim();
    const userMessage = refs.message.value.trim();
    
    // Оновлюємо глобальний об'єкт formData
    formData.email = userEmail;
    formData.message = userMessage;

    // Зберігаємо дані в локальне сховище
    saveToLS("feedback-form-state", formData);
}

// Обробник для відправки форми
refs.form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();

    // Очищаємо пробіли перед перевіркою
    const emailValue = formData.email.trim();
    const messageValue = formData.message.trim();

    // Перевіряємо, чи всі поля заповнені
    if (!emailValue || !messageValue) {
        alert("Fill please all fields");
    }
    else {
        // Виводимо актуальний об'єкт formData в консоль
        console.log(formData);
        
        // Очищаємо форму та локальне сховище
        refs.form.reset();
        localStorage.removeItem("feedback-form-state");
        
        // Очищаємо глобальний об'єкт formData
        formData = { email: "", message: "" };
    }
}

// Функція для ініціалізації даних форми при завантаженні сторінки
function initPage() {
    const formDataFromStorage = loadFromLS("feedback-form-state");

    // Якщо є збережені дані, заповнюємо ними форму
    if (formDataFromStorage) {
        refs.email.value = formDataFromStorage.email || "";
        refs.message.value = formDataFromStorage.message || "";

        // Оновлюємо глобальний об'єкт formData
        formData.email = formDataFromStorage.email || "";
        formData.message = formDataFromStorage.message || "";
    }
    else {
        refs.email.value = "";
        refs.message.value = "";
    }
}

// Ініціалізація сторінки
initPage();
