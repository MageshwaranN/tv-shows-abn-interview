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
    <div class="tv-shows-home__tiles-container">
      <div v-for="(tvShow, index) in tvShowsList" :key="index">
        <TvShowsTile :tvShow="tvShow" />
      </div>
    </div>
    <div class="tv-shows-home__footer-container">
      <button
        v-if="tvShowsList.length !== tvShowsListFull.length"
        class="tv-shows-home__footer-container-btn"
        @click="showMore()">Show more</button>
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
      tvShowsList: [] as Array<any>,
      tvShowsListAPIResponse: [] as Array<any>,
      tvShowsListAPIResponseSearch: [] as Array<any>,
      tvShowsListFull: [] as Array<any>,
      tvShowsGenreList: [] as Array<string>,
      defaultNoOfTilesToShow: 30,
      currentStartIndex: 0,
      isSearchActive: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      axios
        .get('https://api.tvmaze.com/shows')
        .then((res: any) => {
          this.tvShowsListAPIResponse = res.data.map((showDetails: any) => {
            const {
              name,
              id,
              genres,
              image,
              rating,
              premiered,
            } = showDetails;
            return {
              id,
              name,
              genres,
              image,
              rating,
              premiered,
            };
          });

          Object.assign(this.tvShowsListFull, this.tvShowsListAPIResponse);

          Object.assign(this.tvShowsList, this.tvShowsListFull
            .slice(this.currentStartIndex, this.defaultNoOfTilesToShow));

          this.currentStartIndex += 30;

          this.tvShowsGenreList = Array
            .from(new Set<string>([]
              .concat([], ...(this.tvShowsListAPIResponse.map((tvShow: any) => tvShow.genres)))));

          this.isSearchActive = false;
        })
        .catch((error) => console.log(error));
    },
    triggerSearch(payload: {searchText: string}) {
      this.currentStartIndex = 0;
      this.tvShowsListFull = [];
      this.tvShowsList = [];
      this.tvShowsGenreList = [];
      if (payload.searchText !== '') {
        axios
          .get(`https://api.tvmaze.com/search/shows?q=${payload.searchText}`)
          .then((res: any) => {
            this.tvShowsListAPIResponseSearch = res.data.map((showDetails: any) => {
              const {
                name,
                id,
                genres,
                image,
                rating,
                premiered,
              } = showDetails.show;
              return {
                id,
                name,
                genres,
                image,
                rating,
                premiered,
              };
            });

            Object.assign(this.tvShowsListFull, this.tvShowsListAPIResponseSearch);

            Object.assign(this.tvShowsList, this.tvShowsListFull
              .slice(this.currentStartIndex, this.defaultNoOfTilesToShow));

            this.currentStartIndex += 30;

            this.tvShowsGenreList = Array
              .from(new Set<string>([].concat([], ...(this.tvShowsListAPIResponseSearch
                .map((tvShow: any) => tvShow.genres)))));

            this.isSearchActive = true;
          })
          .catch((error) => console.log(error));
      } else {
        this.init();
      }
    },
    filterGenreList(payload: {genre: string}) {
      this.currentStartIndex = 0;
      this.tvShowsList = [];
      this.tvShowsListFull = (this.isSearchActive
        ? this.tvShowsListAPIResponseSearch : this.tvShowsListAPIResponse)
        .filter((item: any) => item.genres.indexOf(payload.genre) !== -1);

      Object.assign(this.tvShowsList, this.tvShowsListFull
        .slice(this.currentStartIndex, this.defaultNoOfTilesToShow));
      this.currentStartIndex += 30;
    },
    showMore() {
      this.tvShowsList = this.tvShowsList.concat(this.tvShowsListFull
        .slice(this.currentStartIndex, this.defaultNoOfTilesToShow + this.currentStartIndex));
      this.currentStartIndex += 30;
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
      flex-wrap: wrap;

      & > * {
        flex: 1 1 0;
        margin: 6px;
      }
    }

    &__footer-container {
      padding: 24px;

      &-btn {
        background-color: #00716b;
        color: #fff;
        height: 40px;
        font-size: 16px;
        padding: 8px 16px;
        letter-spacing: normal;
        word-spacing: normal;
        line-height: 24px;
        border-radius: 12px;
        min-width: 148px;
        border: none;
        cursor: pointer;
      }
    }
  }
</style>
