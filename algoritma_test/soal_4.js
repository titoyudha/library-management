/*

Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN Contoh:
Contoh:

Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

diagonal pertama = 1 + 5 + 9 = 15 
diagonal kedua = 0 + 5 + 7 = 12 

maka hasilnya adalah 15 - 12 = 3


*/

//Solution :
function diagonalDifference(matrix) {
  let mainDiagonalSum = 0;
  let antiDiagonalSum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i === j) {
        mainDiagonalSum += matrix[i][j];
      }
      if (i + j === matrix.length - 1) {
        antiDiagonalSum += matrix[i][j];
      }
    }
  }
  return mainDiagonalSum - antiDiagonalSum;
}

// Example usage:
const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(diagonalDifference(matrix)); // Output: 3
