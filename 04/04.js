const check1 = (e) => {
    e.preventDefault();
    let txt1 = document.getElementById("txt1").value;
    txt1 = txt1.replaceAll(' ', '');
    // let s = '';
    // for (let i = txt1.length - 1; i >= 0; i--)
    //     s += txt1[i];
    if (txt1.split('').reverse().join('') == txt1)
        document.getElementById("txt2").value = "회문";
    else
        document.getElementById("txt2").value = "회문아님";

}


const check2 = (e) => {
    e.preventDefault();
    let txt1 = document.getElementById("txt1").value;
    let sum = 0;
    let s = '';
    for (let c of txt1) {
        if (!isNaN(c)) {
            s += c;
        } else {
            if (s != '') {
                sum += parseInt(s);
                s = '';
            }
        }
    }
    document.getElementById("txt2").value = sum;
}

const check3 = (e) => {
    document.getElementById("txt2").value = "";
    document.getElementById("txt2").value = "";
}