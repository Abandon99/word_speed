
<template>
    <div class="screen">
        <div class="target">{{ targetWord }}</div>
    </div>
</template>

<style>
.screen {
    background: #131333fa;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.target {
    padding: 10px 20px;
    display: flex;
    background: #507f80;
    border-radius: 20px;
    box-shadow: 0 0 18px #ef7979;
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 1px;
    color: #080808e3;
}
</style>

<script>
import Game from './game.js'
export default {

    data() {
        return {
            targetWord: 'asdfsdf'
        }
    },
    created() {
        const game = new Game()
        game.start()
        console.log(game)
    }
}


</script>