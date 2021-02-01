
import { PAUSED, STOP, RUNNGIN } from './gameStatus'

export default class SwtichMachine {
    constructor() {
        this.statusQueue = [STOP, STOP]
        this.status = STOP
    }
    start() {
        this.status = RUNNGIN
        this._refreshQueue(RUNNGIN)    
    }
    pause() {
        this.status = PAUSED
        this._refreshQueue(PAUSED)    
    }
    stop() {
        this.status = STOP
        this._refreshQueue(STOP)
    }
    _refreshQueue(newStatus) {
        this.statusQueue.push(newStatus)
        this.statusQueue.shift()
    }
}