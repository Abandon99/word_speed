export default function timeTheWord (word) {
  const length = word.length
  return (Math.log(length) + 0.5 * length + 0.8) * 500
}

// console.log(timeTheWord('a'))
// console.log(timeTheWord('hello world'))
// console.log(timeTheWord('ahhh'))


// console.log(timeTheWord(';'))