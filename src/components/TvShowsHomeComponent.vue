<template>
  <div class="tv-shows-home">
    <span class="tv-shows-home__title-container">
      <h2>{{ title }}</h2>
      <TvShowsSearch @triggerSearch="triggerSearch"/>
    </span>
    <TvShowsGenreFilter
      v-if="!!(tvShowsGenreList.length)"
      :genres="tvShowsGenreList"
      @filterGenre="filterGenreList"/>
    <div
    class="tv-shows-home__tiles-container">
      <span v-for="(tvShow, index) in tvShowsList" :key="index">
        <TvShowsTile :tvShow="tvShow" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

import TvShowsGenreFilter from './TvShowsGenreFilterComponent.vue';
import TvShowsSearch from './TvShowsSearchComponent.vue';
import TvShowsTile from './TvShowsTileComponent.vue';

export default defineComponent({
  name: 'TvShowsHome',
  components: {
    TvShowsGenreFilter,
    TvShowsSearch,
    TvShowsTile,
  },
  props: {
    title: String,
  },
  data() {
    return {
      tvShowsList: [] as Array<unknown>,
      tvShowsGenreList: [] as Array<string>,
    };
  },
  created() {
    axios
      .get('https://api.tvmaze.com/shows')
      .then((res) => {
        this.tvShowsList = res.data.map((showDetails: any) => {
          const {
            name,
            genres,
            image,
            rating,
            premiered,
          } = showDetails;
          return {
            name,
            genres,
            image,
            rating,
            premiered,
          };
        });

        this.tvShowsGenreList = Array
          .from(new Set<string>([]
            .concat([], ...(this.tvShowsList.map((tvShow: any) => tvShow.genres)))));
      })
      .catch((error) => console.log(error));
  },
  methods: {
    triggerSearch(payload: {searchText: string}) {
      console.log(payload);
    },
    filterGenreList(payload: {genre: unknown}) {
      console.log(payload);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tv-shows-home {
    margin: 0 10rem;

    &__title-container {
      background-image: linear-gradient(-296deg,#005e5d,#00857a);
      color: #fff;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__tiles-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
</style>
