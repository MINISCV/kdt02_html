let obj1 = {};
let obj2 = new Object();

obj1 = {'a' : 1, 'b' : 2};
console.log(obj1);

obj1['a'] = 10;
console.log(obj1);

obj1['c'] = 30;
console.log(obj1);

delete obj1['b'];
console.log(obj1);

console.log(Object.keys(obj1));
console.log(Object.values(obj1));
console.log(Object.entries(obj1));

for(let k of Object.keys(obj1))
    console.log(obj1[k])
for(let v of Object.values(obj1))
    console.log(v)
for(let item of Object.entries(obj1))
    console.log(item)
for(let [k, v] of Object.entries(obj1))
    console.log(k, v)

obj2 = {'apple' : '🍎', 'banana' : '🍌'};
obj1 = {...obj1, ...obj2};
console.log(obj1);