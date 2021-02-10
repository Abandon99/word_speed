import { PAUSED, STOP, RUNNGIN } from './gameStatus'
import status from './status'
import timeTheWord from './timeTheWord'
// console.log('import status in game.core', status)

const START = Symbol('start')

const wordsList = ['hello world', 'this is a game', 'component']


export default class Game {
  constructor(handleTargetChange, handleWordRunning) {
    this.wordsList = null
    this._currentWordDelay = null
    this._currentWordDelayed = null
    this.wordTimeout = null
    this.wordRunningInterval = null
    this.tartgetWord = null
    this.status = null
    this.handleTargetChange = handleTargetChange
    this.handleWordRunning  = handleWordRunning
    this.init()
  }

  game_run(lastStatus = STOP) {
    console.log('lastStatus in game_run => ', lastStatus)
    if(lastStatus === STOP) {
      this.status._refreshQueue(RUNNGIN)
      this.showWord()
    }
  }

  game_pause() {
    this._clearTimeout()
    this._clearInterval()
    this.status._refreshQueue(PAUSED)
  }

  fn_timeOut(delayTime) {
    if(this.status.now === STOP) return
    this.wordTimeout = setTimeout(() => {
      this._clearInterval()
      this.showWord()
    }, delayTime)
  }

  fn_interval(time) {
    const runNums = time / 60
    this._currentWordDelayed = 0
    this.wordRunningInterval = setInterval(() => {
      this._currentWordDelayed += 60
      this.handleWordRunning(time)
      if(this._currentWordDelayed >= time) this._clearInterval()
    }, 60)

    
  }

  showWord() {
    const { word, time } = this.selectWord()
    console.log(word, time)
    this.fn_interval(time)
    this.handleTargetChange(word)
    this.fn_timeOut(time)
  }


  selectWord() {
    const length = this.wordsList.length
    const index = Math.floor(Math.random() * length)
    const word = this.wordsList[index]
    this.tartgetWord = word
    return { time: timeTheWord(word), word }
  }

  init() {
    this.wordsList = wordsList
    this._currentWordDelay = null
    this._currentWordDelayed = null
    this.wordTimeout = null
    this.tartgetWord = null
    this.status = status.init()
  }

  _clearTimeout() {
    clearTimeout(this.wordTimeout)
  }

  _clearInterval() {
    clearTimeout(this.wordRunningInterval)
  }

}