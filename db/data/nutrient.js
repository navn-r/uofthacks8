// [
//   ["1008", "Energy", "KCAL"],
//   ["1004", "Total Fat", "G"],
//   ["1258", "Saturated fat", "G"],
//   ["1257", "Trans fat", "G"],
//   ["1253", "Cholesterol", "MG"],
//   ["1093", "Sodium", "MG"],
//   ["1005", "Carbohydrate", "G"],
//   ["1079", "Total Dietary Fiber", "G"],
//   ["2000", "Total Sugar", "G"],
//   ["1235", "Added Sugars", "G"],
//   ["1003", "Protein", "G"],
//   ["1087", "Calcium", "MG"],
//   ["1089", "Iron", "MG"],
//   ["1092", "Potassium", "MG"],
// ].forEach((item) => {
//   db.collection("nutrients")
//     .doc(item[0])
//     .set({
//       name: item[1],
//       unitName: item[2],
//     })
//     .then((res) => console.log("yay"));
// });
