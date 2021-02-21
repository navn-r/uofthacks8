const data = require('./test.json');
let foods = [];

data.map((r, i) => {
  foods = foods.concat(r.ingredients);
});

foods = new Set(foods);

console.log('export const foods1 =');
console.log(JSON.stringify(Array.from(foods)));
console.log(';');