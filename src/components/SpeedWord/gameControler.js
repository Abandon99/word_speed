import { PAUSED, STOP, RUNNGIN } from './gameStatus'
import Game from './game.core'

export default class GameControler extends Game {
    constructor(handleTargetChange, handleWordRunning) {
      super(handleTargetChange, handleWordRunning)
    }
    keyEnter() {
      if(this.status.now === STOP) { 
        this.start(); 
        return;
       }
      if(this.status.now === PAUSED)   { this.start(); return }
      if(this.status.now === RUNNGIN)  { this.pause(); return }
    }
    start() {
      console.log('GameControler start')      
      if(this.status.now === RUNNGIN) {
        console.log('已经在运行 不能重复开始')
      } else {
        this.game_run(this.status.now)
        // return Promise.resolve({ lastStatus: this.statusQueue[0] })
      }
    }
    pause() {
      if(this.status.now === RUNNGIN) {
        console.log('GameControler paused')
        this.game_pause()
      }
    }
    stop() {
      if(this.status.now === RUNNGIN) {
        this.status._refreshQueue(STOP)
      }
    }
}