<template>
  <div>
    <h1>Select a Puzzle</h1>
    <div v-for="p of puzzles" :key="p.id" class="row">
      <div>
        <img :src="require(`../assets/${p.image}`)" />        
      </div>
      <div>
        <h2>{{p.title}}</h2>
      </div>
      <div class="play-button">
        <button @click="selectPuzzle(p)">Play</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        puzzles: [
          {id: 'cut-leaf', image: "leaf.jpg", title: "leaf"},
          {id: 'cut-mountain', image: "mountain.jpg", title: "mountain"},
          {id: 'cut-rock', image: "rock.jpg", title: "rock"},
          {id: 'cut-sea', image: "sea.jpg", title: "sea"},
        ]
      }
    },
    methods: {
      selectPuzzle(puzzle) {
        this.$emit('puzzle-changed', puzzle.id);
      }
    },
  }
</script>

<style scoped>
.row{
  display:flex;
  max-width: 90vw;
  flex-wrap: wrap;
  justify-content: space-between;
}

.row img{
  width: 100px;
}

.row .play-butotn{
  padding-top: 25px;
}
</style>