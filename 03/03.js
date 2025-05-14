// function Hello() {
//     alert("안녕하세요!");
// }

//화살표 함수
const Hello = () => {
    // alert("안녕하세요!");
    console.log(name + "님 안녕하세요");
    var name = "PNU";
    console.log(name + "님 안녕하세요");

}

const Hello2 = () => {
    // console.log(name + "님 안녕하세요");
    let name = "PNU";
    console.log(`${name}님 안녕하세요`);
}

const check = () => {
    let s = '123';
    let x = '10rk';

    console.log(s);
    console.log(typeof (s));
    console.log(isNaN(s));
    if (!isNaN(x) && !isNaN(s)) {
        s = parseInt(s);
        x = parseInt(x);
    }
    console.log(s + x);
}

const checkFor = () => {
    let s = "토마토,바나나";

    console.log(s[0]);
    console.log(s.charAt(0));

    console.log(s.split(','));
    console.log(s.indexOf(','));
    console.log(s.includes(','));

    for (let i = 0; i < s.length; i++)
        console.log(s[i]);

    for(let c of s) {
        console.log(c);
    }
}
