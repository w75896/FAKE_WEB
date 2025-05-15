const selector = document.getElementById("langSelector");
const selected = selector.querySelector(".selected");
const dropdown = selector.querySelector(".dropdown");

selector.addEventListener("click", () => {
    selector.classList.toggle("open");
});

dropdown.addEventListener("click", (e) => {
    if (e.target.dataset.lang) {
        const lang = e.target.dataset.lang;
        selected.innerHTML = e.target.innerText + ' <i class="arrow"></i>';
        selector.classList.remove("open");
        console.log("語言切換為:", lang);
    }
    e.stopPropagation();
});

document.addEventListener("click", (e) => {
    if (!selector.contains(e.target)) {
        selector.classList.remove("open");
    }
});

function closeBox() {
    const box = document.querySelector(".ba");
    box.style.display = "none";
    console.log("close");
}

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const alert = document.getElementById("alert");
    alert.style.display = "block";
    const con = document.getElementById("login-container");
    con.style.height = "52%";
    console.log('帳號：', username.value);
    console.log('密碼：', password.value);


    fetch('/submit', {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    username.value = "";
    password.value = "";

});