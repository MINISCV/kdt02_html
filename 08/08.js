const selHandler = (sel1, sel2, label1, label2, txt1) => {
    if (sel1.value == '℃') {
        label1.textContent = '℃';
        sel2.value = '℉';
        label2.textContent = '℉';
    } else {
        label1.textContent = '℉';
        sel2.value = '℃';
        label2.textContent = '℃';
    }
    txt1.dispatchEvent(new Event('input'));
}

document.addEventListener("DOMContentLoaded", () => {
    const sel1 = document.querySelector("#sel1");
    const sel2 = document.querySelector("#sel2");
    const txt1 = document.querySelector("input");
    const txt2 = document.querySelector("[readonly]");
    const label1 = document.querySelector("label[for='txt1']");
    const label2 = document.querySelector("label[for='txt2']");
    txt1.focus();

    sel1.addEventListener("change", () => selHandler(sel1, sel2, label1, label2, txt1));

    sel2.addEventListener("change", () => selHandler(sel2, sel1, label2, label1, txt2));

    txt1.addEventListener("input", () => {
        if (sel1.value == '℃') txt2.value = parseFloat((txt1.value * 9 / 5) + 32).toFixed(4);
        else txt2.value = parseFloat((txt1.value - 32) * 5 / 9).toFixed(4);
    });
});

