<template>
  <div class="tv-shows-detailed-SE">
    <h3>Season & Episodes Details</h3>
    <section class="tv-shows-detailed-SE__main">
      <section class="tv-shows-detailed-SE__main-seasons">
        <div v-for="(season, index) in seasons" :key="index">
          <button
            class="tv-shows-detailed-SE__main-btn"
            @click="handleSeasons(season)">
              Season {{season}}
          </button>
        </div>
      </section>
      <section class="tv-shows-detailed-SE__main-episodes">
        <div v-for="(episode, index) in episodes" :key="index">
          <button
            class="tv-shows-detailed-SE__main-btn"
            @click="handleEpisodes(episode.season, episode.episode)">
              Episode {{episode.episode}}
          </button>
        </div>
      </section>
      <section class="tv-shows-detailed-SE__main-details">
        <div v-if="episode.name">
          <img
          class="tv-shows-detailed-SE__main-details-img"
          :src="episode.image?.original"
          :alt="'cover image of season '+ episode.season
            + ' episode ' +  episode.episode + ' ' + episode.name">
        <section class="tv-shows-detailed-SE__main-details-content">
          <h2>{{episode.name}}</h2>
          <p v-html="episode.summary"></p>
        </section>
        <section class="tv-shows-detailed-SE__main-details-others">
          <p>
            <span><b>Air Date: </b></span>
            <span>{{episode.airDate}}</span>
          </p>
          <p>
            <span><b>Air Time: </b></span>
            <span>{{episode.airTime}}</span>
          </p>
          <p>
            <span><b>Rating: </b></span>
            <span>{{episode.rating?.average}}</span>
          </p>
        </section>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface Episode {
  name: string;
  season: number;
  episode: number;
  airDate: string;
  airTime: string;
  rating: {
    average: string;
  },
  image: {
    original: string;
  },
  summary: string;
}

export default defineComponent({
  name: 'TvShowsDetailedSE',
  components: {
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      tvShowsEpisodesListAPIResponse: [] as Array<any>,
      seasons: [] as Array<string>,
      episodes: [] as Array<any>,
      episode: {} as Episode,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      axios
        .get(`https://api.tvmaze.com/shows/${this.id}/episodes`)
        .then((res: any) => {
          const noOfSeasonsArray = Array.from(new Set(res.data.map((item: any) => item.season)));
          this.tvShowsEpisodesListAPIResponse = res.data;
          this.seasons = noOfSeasonsArray as Array<string>;
        })
        .catch((error) => console.log(error));
    },
    handleSeasons(seasonId: string) {
      this.episodes = this.tvShowsEpisodesListAPIResponse
        .filter((item: any) => item.season === seasonId)
        .map((item: any) => ({
          season: seasonId,
          episode: item.number,
        }));
      this.episode = {} as Episode;
    },
    handleEpisodes(seasonId: string, episodeId: string) {
      [this.episode] = (this.tvShowsEpisodesListAPIResponse
        .filter((item: any) => (item.season === seasonId && item.number === episodeId))
        .map((innerItem: any) => ({
          season: innerItem.season,
          episode: innerItem.number,
          name: innerItem.name,
          airDate: innerItem.airdate,
          airTime: innerItem.airtime,
          rating: {
            average: innerItem.rating?.average,
          },
          image: {
            original: innerItem.image?.original,
          },
          summary: innerItem.summary,
        })));
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tv-shows-detailed-SE {
    text-align: left;
    margin-top: 2rem;

    &__main {
      display: flex;

      &-seasons {
        flex: 1 1 0;
      }
      &-episodes {
        flex: 1 1 0;
      }
      &-details {
        flex: 4 1 0;
      }

      &-btn {
        background-color: #00716b;
        color: #fff;
        height: 40px;
        font-size: 16px;
        padding: 8px 16px;
        margin: 6px 0;
        letter-spacing: normal;
        word-spacing: normal;
        line-height: 24px;
        border-radius: 12px;
        min-width: 148px;
        border: none;
        cursor: pointer;
      }

      &-details {
      & > div {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        text-align: start;
      }

      &-img {
        align-items: center;
        width: 56px;
        flex: 1 1 0;
      }

      &-content {
        flex: 4 1 0;
        margin: 0 12px;

        h2 {
          margin: 0 0;
        }

        p {
          margin-block-start: 0;
          margin-block-end: 0;
        }
      }

      &-others {
        flex: 1.75 1 0;

        p {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    }
  }
</style>
