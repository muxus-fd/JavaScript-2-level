let form = document.getElementById('contactform');
let name = document.getElementById('name');
let email = document.getElementById('email');
let telephone = document.getElementById('telephone');

function validEmail() {
    let regexp = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-zа-я]{2,9}$/iu);
    return regexp.test(email.value);
}

function validName() {
    let regexp = new RegExp(/^[a-zA-Zа-яА-яёЁ]{1,20}$/);
    return regexp.test(name.value);
}

function validTelephone() {
    let regexp = new RegExp(/^\+7\(\d{3}\)\d{3}\-\d{4}$/);
    return regexp.test(telephone.value);
}


form.addEventListener("submit", function (event) {
    if (!validEmail()) {
        event.preventDefault();
        email.classList.add('errorinput');
        alert("Введите правильно почту");
    }
    if (!validName()) {
        event.preventDefault();
        name.classList.add('errorinput');
        alert("Введите правильно имя");

    }
    if (!validTelephone()) {
        event.preventDefault();
        telephone.classList.add('errorinput');
        alert("Введите правильно телефон");

    }
}, false);
