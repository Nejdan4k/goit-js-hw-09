
const refs = {
    formData: { email: "", message: "" },
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('input[name=email]'),
    message: document.querySelector('textarea[name=message]'),
}

refs.form.addEventListener("input", onInputForm);

function onInputForm(event) {
    const userEmail = event.currentTarget.elements.email.value.trim();
    const userMessage = event.currentTarget.elements.message.value.trim();
    refs.formData.email = userEmail;
    refs.formData.message = userMessage;
    saveToLS("feedback-form-state", refs.formData);
}

function saveToLS(key, value) {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
}
function loadFromLS(key) {
    const body = localStorage.getItem(key);
    try {
        const data = JSON.parse(body);
        return (data);
    }
    catch { console.log('err') };
}

refs.form.addEventListener("submit", onFormSubmit);


function onFormSubmit(event) {
    event.preventDefault();
    const data = loadFromLS("feedback-form-state");
    if (!refs.email.value || !refs.message.value) {
        alert("Fill please all fields");
    }
    else {
        console.log(data);
        refs.form.reset();
        localStorage.removeItem("feedback-form-state");
    };
}


function initPage() {
    const formData = loadFromLS("feedback-form-state");
    refs.email.value = formData?.email || "";
    refs.message.value = formData?.message || "";

}
initPage();
