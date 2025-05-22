document.addEventListener("DOMContentLoaded", () => {
    const img = document.querySelector(".mdiv>img");
    const input = document.querySelector("input[placeholder='숫자를 입력하세요']");
    const button = document.querySelector("#inputArea>button");
    const restart = document.querySelector("#btArea>button");
    const inputArea = document.querySelector("#inputArea");
    const btArea = document.querySelector("#btArea");

    let n = Math.floor(Math.random() * 100) + 1;
    console.log(n);
    // let flag = false;
    btArea.style.display = "none";

    button.addEventListener("click", (e) => {
        // e.preventDefault();

        if (input.value == "") {
            alert("숫자를 입력하세요");
            input.focus();
            return;
        }

        if (input.value < 1 || input.value > 100) {
            alert("1~100 사이의 숫자를 입력하세요");
            input.focus();
            return;
        }

        // if (!flag) {
        //     n = Math.floor(Math.random() * 100) + 1;
        //     flag = true;
        // }

        if (input.value == n) {
            img.src = "../img/good.png";
            inputArea.style.display = "none";
            btArea.style.display = "flex";
        } else if (input.value < n) {
            img.src = "../img/up.png";
            input.value = "";
            input.focus();
        } else {
            img.src = "../img/down.png";
            input.value = "";
            input.focus();
        }
    });

    restart.addEventListener("click", () => {
        img.src = "../img/what.png";
        btArea.style.display = "none";
        inputArea.style.display = "flex";
        // flag = true;
        input.value = "";
        input.focus();
        n = Math.floor(Math.random() * 100) + 1;
        console.log(n);
    });
});
