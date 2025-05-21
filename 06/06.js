document.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector(".mdiv>img");
    const bt = document.querySelector(".mdiv>button");

    bt.addEventListener('click', () => {
        let num = Math.floor((Math.random() * 6)) + 1;
        img.setAttribute('src', `../img/${num}.png`);
        img.setAttribute('alt', `${num}`);
    });
});