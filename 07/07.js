document.addEventListener('DOMContentLoaded', () => {
    const imgs = document.querySelectorAll(".mdiv img");
    const bts = document.querySelectorAll(".mdiv button");
    const msg = document.querySelector("#msg");
    for (let [idx, bt] of bts.entries()) {
        bt.addEventListener('click', () => {
            const num = Math.floor((Math.random() * 6)) + 1;
            imgs[0].setAttribute('src', `../img/${num}.png`);
            imgs[0].setAttribute('alt', `${num}`);
            imgs[1].setAttribute('src', `../img/${idx + 1}.png`);
            imgs[1].setAttribute('alt', `${idx + 1}`);

            if (num == idx + 1) msg.innerText = "정답";
            else msg.innerText = "오답";
        });
    }
});