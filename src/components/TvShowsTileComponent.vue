<template>
  <div id="tile" class="tile">
    <div
      class="tile__container-items"
      @click="handleClick(tvShow?.id)"
      @keydown="handleClick(tvShow?.id)">
      <img :src="tvShow?.image.original" alt="" width="240" height="320">
      <h3>{{tvShow?.name}}</h3>
      <div class="tile__container-items-rating"><b>Rating: </b>{{tvShow?.rating.average}}</div>
      <div class="tile__container-items-premiered"><b>Premiered: </b>{{tvShow?.premiered}}</div>
      <div class="tile__container-items-genre">
        <div
          class="tile__container-items-genre-item"
          v-for="(genre, index) in tvShow?.genres" :key="index">
          {{genre}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

interface Tile {
  name: string,
  id: number,
  genres: Array<string>,
  image: {
    original: string,
  },
  rating: {
    average: number,
  },
  premiered: string,
}

export default defineComponent({
  name: 'TvShowsTile',
  props: {
    tvShow: {
      type: Object as PropType<Tile>,
      validator: (tile: Tile) => !!(tile.name),
    },
  },
  methods: {
    handleClick(id: number | undefined) {
      this.$router.push(`/shows/${id}`);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tile {
    padding: 18px;
    background: #fff;
    box-shadow: 0px 0px 0px #005e5d;
    transition:  box-shadow .6s ease-out;
    box-shadow: .8px .9px 3px #005e5d;
    cursor: pointer;

    &:hover{
      box-shadow: 1px 8px 20px #005e5d;
      transition:  box-shadow .6s ease-in;
    }

    &__container-items {

      &-premiered {
        margin: 8px 0;
      }

      &-genre {
        display: flex;
        justify-content: space-evenly;

        &-item {
          background-color: #edf7f7;
          border: 1px solid #c0d1d0;
          border-radius: 24px;
          padding: 4px;
          color: #00716b;
        }
      }
    }
  }
</style>
