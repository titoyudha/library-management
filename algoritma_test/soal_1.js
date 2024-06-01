/*

Problem : Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"


*/

//Solution
function reverseAlphabetWithNumberAtEnd(str) {
  let letters = '';
  let numbers = '';
  for (let i = 0; i < str.length; i++) {
    if (isLetter(str[i])) {
      letters = str[i] + letters;
    } else {
      numbers += str[i];
    }
  }
  return letters + numbers;
}

function isLetter(char) {
  return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
}

// Example usage:
console.log(reverseAlphabetWithNumberAtEnd('NEGIE1')); // Output: "EIGEN1"
