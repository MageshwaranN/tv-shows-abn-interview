<template>
  <div class="genre-filter">
    <span class="genre-filter__container">
      <div v-for="(genre, index) in genres" :key="index">
        <div
          class="genre-filter__container-items"
          @click="handleClick(genre)"
          @keydown="handleClick(genre)">
          {{ genre }}
        </div>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TvShowsGenreFilter',
  props: {
    genres: {
      required: true,
      type: Array,
      validator: (value: Array<string>) => !!(value.length),
    },
  },
  emits: {
    filterGenre(payload: {genre: unknown}) {
      return payload.genre !== '';
    },
  },
  methods: {
    handleClick(genre: unknown) {
      this.$emit('filterGenre', {
        genre,
      });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .genre-filter {
    background-image: linear-gradient(-296deg,#005e5d,#00857a);
    color: #fff;
    margin: .5rem 0;
    padding: 1rem 1rem;
    &__container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: auto;
      &-items {
        border: 1px solid;
        margin: 8px;
        width: max-content;
        padding: 12px;
        box-shadow: 2px 2px #fff;
        cursor: pointer;
      }
    }
  }

</style>
