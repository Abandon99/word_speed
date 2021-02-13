import { PAUSED, STOP, RUNNGIN } from './gameStatus'

class Status {
  constructor() {
    this.statusQueue = [STOP, STOP]
    this.now = this.statusQueue[1]
    this.last = this.statusQueue[0]
  }
  _refreshQueue(newStatus) {
    this.statusQueue.push(newStatus)
    this.statusQueue.shift()
    // console.log(this.statusQueue)
    this.now = this.statusQueue[1]
    this.last = this.statusQueue[0]
  }
  init() {
    this.statusQueue = [STOP, STOP]
    this.now = this.statusQueue[1]
    this.last = this.statusQueue[0]
    return this
  }
}

const status = new Status()

export default status