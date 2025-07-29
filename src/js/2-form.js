const form = document.querySelector('.feedback-form');
form.addEventListener('input', e => {
  console.log(e.target.name);
  console.log(form.elements);
  const mail = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  // console.log(mail);
  // console.log(message);
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({ mail, message })
  );
});

let data = localStorage.getItem('feedback-form-state');
data = JSON.parse(data);
if (data !== null) {
  form.elements.email.value = data.mail;
  form.elements.message.value = data.message;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(e);
  localStorage.removeItem('feedback-form-state');
  e.target.reset();
});