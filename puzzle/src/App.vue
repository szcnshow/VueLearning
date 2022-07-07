<template>
  <div>
    <PuzzlesPanel @puzzle-changed="selectedPuzzleId = $event"/>
    <RecordsPanel />
    <SliderPuzzle :puzzleId="selectedPuzzleId" />
  </div>
</template>

<script>
import SliderPuzzle from "./components/SliderPuzzle.vue"
import PuzzlesPanel from "./components/PuzzlesPanel.vue"
import RecordsPanel from "./components/RecordsPanel.vue"

export default {
  name: 'App',
  components: {
    SliderPuzzle,
    PuzzlesPanel,
    RecordsPanel,
},
  data() {
    return {
      selectedPuzzleId: "cut-leaf",
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
