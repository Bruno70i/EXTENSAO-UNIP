const pwd = document.getElementById('password');
const toggle = document.querySelector('.toggle');
const eye = document.getElementById('eye');
toggle.addEventListener('click', () => {
const isPwd = pwd.getAttribute('type') === 'password';
pwd.setAttribute('type', isPwd ? 'text' : 'password');
// alterna ícone (olho / olho cortado)
eye.innerHTML = isPwd
? '<path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.81 21.81 0 0 1 5.06-6.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.83 21.83 0 0 1-5.06 6.94"/><line x1="1" y1="1" x2="23" y2="23" />'
: '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path><circle cx="12" cy="12" r="3"></circle>';
});


// Validação simples de formulário
const form = document.getElementById('login');
const email = document.getElementById('email');
const status = document.getElementById('status');


function setInvalid(el, flag) {
el.setAttribute('aria-invalid', flag ? 'true' : 'false');
}


form.addEventListener('submit', (e) => {
e.preventDefault();


let ok = true;
status.textContent = '';
status.className = 'status';


if (!email.value || !email.checkValidity()) {
setInvalid(email, true);
ok = false;
} else { setInvalid(email, false); }


if (!pwd.value || !pwd.checkValidity()) {
setInvalid(pwd, true);
ok = false;
} else { setInvalid(pwd, false); }


if (!ok) {
status.textContent = 'Confira os campos destacados.';
status.classList.add('error');
return;
}


// Exemplo: aqui você faria fetch('/login', { method: 'POST', body: new FormData(form) })
status.textContent = 'Validado! Pronto para enviar ao servidor.';
status.classList.add('ok');
});