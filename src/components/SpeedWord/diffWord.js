export default function (word, targetWord) {
  const length = word.length
  const res = []
  for(let i = 0; i < length; i ++) {
    res.push(word[i] === targetWord[i] ? 1 : 0)
  }
  return res
}