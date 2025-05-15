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
    e.preventDefault(); // 阻止表單自動提交

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const alert = document.getElementById("alert");
    alert.style.display="block";
    const con= document.getElementById("login-container");
    con.style.height="52%";
    console.log('帳號：', username.value);
    console.log('密碼：', password.value);
    username.value="";
    password.value="";
    

    // 可以用 fetch 或其他方式送出
});