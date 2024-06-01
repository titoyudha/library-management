/*

Problem : Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu

Contoh:

const sentence = "Saya sangat senang mengerjakan soal algoritma"

longest(sentence) mengerjakan: 11 character


*/

//Solution
function longestWord(sentence) {
  let words = sentence.split('');
  let longest = '';
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longest.length) {
      longest = words[i];
    }
  }
  return longest;
}

// Example usage:
const sentence = 'Saya sangat senang mengerjakan soal algoritma';
console.log(longestWord(sentence)); // Output: "mengerjakan"
