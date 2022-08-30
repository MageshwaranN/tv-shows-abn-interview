<template>
  <div id="tv-shows-search" class="tv-shows-search">
    <input
    type="text"
    class="tv-shows-search__input"
    placeholder="Search"
    aria-label="Search"
    @keyup="handleChange">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TvShowsSearch',
  data() {
    return {
      debounce: undefined as number | undefined,
    };
  },
  emits: {
    triggerSearch(payload: {searchText: string}) {
      return payload.searchText !== '';
    },
  },
  methods: {
    handleChange(event: Event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$emit('triggerSearch', {
          searchText: (event.target as HTMLInputElement).value as string,
        });
      }, 500);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tv-shows-search {
    &__input {
      border: 1px solid #eee;
      border-radius: 8px;
      width: 100%;
      padding: 12px 12px 12px 48px;
      box-sizing: border-box;
      position: relative;
      font-size: 16px;
      line-height: 1.5;
      flex: 1;
      background-color: #eee;
      background-image: url(../assets/icons8-search-32.png);
      background-repeat: no-repeat;
      background-position: 12px;
    }
}
</style>
