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

function handleSubmit(event) {
    event.preventDefault(); // 防止表單真正提交，讓我們能先處理資料

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log('帳號:', username);
    console.log('密碼:', password);
    
    
}