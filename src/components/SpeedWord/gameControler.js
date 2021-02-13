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
      if(this.status.now !== RUNNGIN) {
        this.game_run(this.status.now)
      }
    }
    pause() {
      if(this.status.now === RUNNGIN) {
        this.game_pause()
      }
    }
    stop() {
      if(this.status.now === RUNNGIN) {
        this.status._refreshQueue(STOP)
      }
    }
}