const lotto = () => {
    let arr = [];
    while (arr.length < 6) {
        let n = Math.floor(Math.random() * 45) + 1;
        if (arr.includes(n)) continue;
        arr.push(n);
    }
    arr.sort((a, b) => a - b);
    let bonus = [];
    while (bonus.length < 1) {
        let n = Math.floor(Math.random() * 45) + 1;
        if (arr.includes(n)) continue;
        bonus.push(n);
    }
    arr.push(...bonus);
    let tags = arr.map(item => `<span class="sp${Math.floor(item / 10)}">${item}</span>`);
    tags.splice(6, 0, '<span id="spPlus">+</span>');
    document.getElementById("nlist").innerHTML = tags.join('');
}   