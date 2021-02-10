
<template>
    <div class="screen">
      <div class="target-box">
        <div class="target shadow" :style="{ width: targetShadowWidth + 'px' }"></div>
        <div class="target" ref="target">{{ targetWord }}</div>
      </div>
    </div>
</template>

<script>
import GameControler from './gameControler.js'
export default {
  data() {
    return {
      targetWord: '回车开始',
      targetShadowWidth: 0,
      targetWidth: null
    }
  },
  created() {
    const onTargetWordChanged = (word) => {
      this.targetWord = word
      this.targetShadowWidth = 0
      this.targetWidth = this.$refs.target.offsetWidth
    }

    const onWordRunning = (time) => {
      const speed = this.targetWidth /  (time / 60)
      this.targetShadowWidth += speed
    }
    
    const gameControler = new GameControler(onTargetWordChanged, onWordRunning)

    window.game = gameControler

    window.document.onkeydown = function (event_e) {
      if(event_e.key === 'Enter') {
        // console.log('status before enter', gameControler.status)
        gameControler.keyEnter()
        // console.log('status after enter', gameControler.status)
      }
    }
  },
  mounted() {
    console.log('this.$refs.target => ', this.$refs.target)
  }

}
</script>

<style>
.screen {
  background: #131333fa;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.target-box {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}
.target {
  padding: 14px 50px;
  display: flex;
  background: rgb(10 252 255 / 54%);
  position: relative;
  border-radius: 20px;
  box-shadow: 0 0 20px #dac2c2c4;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 1px;
  color: #222325;
}

.shadow {
  position: absolute;
  top: 0;
  box-sizing: border-box;
  height: 56px;
  background: rgb(106 205 216 / 81%);
  padding: 0;
}
</style>