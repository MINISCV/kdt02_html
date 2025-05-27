document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelectorAll(".col");
    const bt = document.querySelector("button");
    const result = document.querySelector(".result");
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 1].sort(() => Math.random() - 0.5);
    let flag = false;
    let count = 0;

    for (let [idx, col] of board.entries()) {
        col.innerText = idx + 1;
        col.addEventListener("click", () => {
            if (!flag) result.innerText = "폭탄을 섞어주세요";
            else {
                if (arr[idx]) {
                    result.innerText = "펑";
                    col.innerHTML = `<img src="../img/boom.png" alt="폭탄">`;
                    bt.innerText = "다시하기";
                    flag = false;
                } else {
                    if(col.innerText == idx + 1) count++;
                    col.innerHTML = `<img src="../img/heart.png" alt="하트">`;
                    console.log(count);
                    if (count == 8) {
                        board[arr.indexOf(1)].innerHTML = `<img src="../img/heart.png" alt="하트">`;
                        result.innerText = "성공";
                        bt.innerText = "다시하기";
                        flag = false;
                    }
                }
            }
        });
    }


    bt.addEventListener("click", () => {
        if (!flag) {
            for (let [idx, col] of board.entries())
                col.innerText = idx + 1;
            count = 0;
            arr.sort(() => Math.random() - 0.5);
            console.log(arr);
            flag = true;
            bt.innerText = "게임중";
        }
    });
});