<template>
    <div class="screen">
      <div class="score">{{ score }}</div>
      <div class="target-box">
        <div class="target shadow" ref="shadow" :style="{ width: targetShadowWidth + 'px' }"></div>
        <div class="target" ref="target">
          <div 
            class="letter"
            :class="{ 
              bingo: isBingo[idx] === 1,
              unbingo: isBingo[idx] === 0,
              animate__bounceIn: isBingo[idx] === 0,
              nbsp: letter === ' ' 
            }"
            v-for="(letter, idx) in targetWord" 
            :key="idx"
          >
            {{ letter }}
          </div>
        </div>
      </div>
      <input 
        class="input" 
        type="text" 
        ref="input"
        v-model="customInput"
        @input="inputChanged"
      >
    </div>
</template>

<script>
import GameControler from './gameControler.js'
import diffWord from './diffWord.js'

export default {
  data() {
    return {
      targetWord: ['回', '车', '开', '始'],
      targetShadowWidth: 0,
      targetWidth: null,
      customInput: '',
      isBingo: [],
      score: 0,
      gameControler: null
    }
  },
  methods: {
    inputChanged() {
      const diffArr = diffWord(this.customInput, this.targetWord.join(''))
      this.isBingo = diffArr
      if(this.customInput === this.targetWord.join('')) {
        this.changeScore( ++this.score)
        this.gameControler.nextWord()
      }
    },

    changeScore(num) {
      this.score = num
    }
  },
  created() {
    const that = this

    const onTargetWordChanged = (word) => {
      that.isBingo = []
      this.customInput = ''
      this.targetWord = word.split('')
      this.targetShadowWidth = 0
      this.targetWidth = this.$refs.target.offsetWidth
    }

    function onWordRunning (time, isReStart) {
      that.targetWidth = that.$refs.target.offsetWidth
      let speed = null
      speed = that.targetWidth /  (time / 60)
      that.targetShadowWidth += speed
    }

    function onScoreChanged(num) {
      that.score = num
    }
    
    this.gameControler = new GameControler(onTargetWordChanged, onWordRunning, onScoreChanged)

    window.game = this.gameControler

    window.document.onkeydown = function (event_e) {
      if(event_e.key === 'Enter') {
        that.gameControler.keyEnter()
      }
      if(that.gameControler.status.now === 'running') {
        that.$refs.input.focus()
      } else {
        that.$refs.input.blur()
      }
    }
  },

}
</script>

<style>
.screen {
  position: relative;
  background: #131333fa;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.target-box {
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 0 20px #dac2c2c4;
}
.target {
  padding: 21px 46px;
  display: flex;
  background: rgb(10 252 255 / 54%);
  position: relative;
  border-radius: 30px;
  font-size: 25px;
  font-weight: 900;
  letter-spacing: 1px;
  color: black;
}
.nbsp {
  width: 10px;
}
.shadow {
  position: absolute;
  top: 0;
  box-sizing: border-box;
  height: 78px;
  background: rgb(106 205 216 / 81%);
  padding: 0;
  color: rgb(18, 18, 18);
}

.input {
  position: absolute;
  bottom: 0;
  z-index: -9999;
  /* visibility: hidden; */
}

.bingo {
  color: #ffffffe0
}

.unbingo {
  color: rgb(249 34 34 / 84%);
}

.score {
  margin-bottom: 40px;
  color: white;
  font-size: 40px;
}
</style>