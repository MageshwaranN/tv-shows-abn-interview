<template>
  <div id="tile" class="tile">
    <div
      class="tile__container-items"
      @click="handleClick"
      @keydown="handleClick">
      <img :src="tvShow?.image.original" alt="" width="240" height="320">
      <div class="tile__container-items-genre">
        {{tvShow?.genres.join(', ')}}
      </div>
      <h3>{{tvShow?.name}}</h3>
      <div>{{tvShow?.rating.average}} | {{tvShow?.premiered}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

interface Tile {
  name: string,
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
    handleClick(event: Event) {
      console.log((event.target as HTMLInputElement).value);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tile {
    &__container-items {
      &-genre {
        display: flex;
        justify-content: flex-start;
        &-item {
          padding-right: 8px;
        }
      }
    }
  }
</style>
