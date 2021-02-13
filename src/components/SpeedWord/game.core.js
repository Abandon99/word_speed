import { PAUSED, STOP, RUNNGIN } from './gameStatus'
import status from './status'
import timeTheWord from './timeTheWord'
import wordsList from './wordsList'


export default class Game {
  constructor(handleTargetChange, handleWordRunning, handleScoreChange, handleInputChange) {
    this.wordsList = null
    this._currentWordDelay = null
    this._currentWordDelayed = null
    this.wordTimeout = null
    this.wordRunningInterval = null
    this.tartgetWord = null
    this.status = null
    this.handleTargetChange = handleTargetChange
    this.handleWordRunning  = handleWordRunning
    this.handleScoreChange  = handleScoreChange
    this.handleInputChange  = handleInputChange
    this.isReStart = false
    this.init()
  }

  game_run(lastStatus = STOP) {
    if(lastStatus === STOP) {
      this.status._refreshQueue(RUNNGIN)
      this.showWord()
    } else { // PAUSED
      this.status._refreshQueue(RUNNGIN)
      this.showWord(lastStatus)
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
      console.log('---another word---')
      this._clearInterval()
      this.showWord()
    }, delayTime)
  }

  fn_interval(time, lastStatus) {
    if(lastStatus && lastStatus === PAUSED) {
      this.isReStart = true
      this.wordRunningInterval = setInterval(() => {
        this._currentWordDelayed += 60
        this.handleWordRunning(time, this.isReStart)
        this.isReStart = false
      }, 60)
    } else {
      this._currentWordDelayed = 0
      this.wordRunningInterval = setInterval(() => {
        this._currentWordDelayed += 60
        this.handleWordRunning(time)
      }, 60)
    }
  }

  showWord(lastStatus) {
    if(lastStatus === PAUSED) {
      const remainderTime = this._currentWordDelay - this._currentWordDelayed
      const { word, time } = this.selectWord()
      this.fn_interval(this._currentWordDelay, lastStatus)
      this.fn_timeOut(time)
    } else {
      const { word, time } = this.selectWord()
      this._currentWordDelay = time
      this.fn_interval(time)
      this.handleTargetChange(word)
      this.fn_timeOut(time)
    }
  }


  selectWord() {
    const length = this.wordsList.length
    const index = Math.floor(Math.random() * length)
    const word = this.wordsList[index]
    this.tartgetWord = word
    return { time: timeTheWord(word), word }
  }

  nextWord() {
    this._clearTimeout()
    this._clearInterval()
    this.showWord()
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