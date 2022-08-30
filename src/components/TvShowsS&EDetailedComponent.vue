<template>
  <div class="tv-shows-detailed-SE">
    <h3>Season & Episodes Details</h3>
    <section>
      <div v-for="(seasons, index) in seasonsWithEpisodes" :key="index">
        <div>{{seasons.season}}</div>
          <div v-for="(episode, episodeIndex) in seasons.episodes" :key="episodeIndex">
            <div>{{episode.episode}}</div>
            <section class="tv-shows-detailed-SE__details-container">
              <img
                :src="episode.details.image.original"
                :alt="'cover image of '+ episode.episode + ' ' + episode.details.name">
              <section class="tv-shows-detailed-SE__details-container-content">
                <h2>{{episode.details.name}}</h2>
                <p v-html="episode.details.summary"></p>
              </section>
              <section class="tv-shows-detailed-SE__details-container-others">
                <p>
                  <span><b>Air Date: </b></span>
                  <span>{{episode.details.airDate}}</span>
                </p>
                <p>
                  <span><b>Air Time: </b></span>
                  <span>{{episode.details.airTime}}</span>
                </p>
                <p>
                  <span><b>Rating: </b></span>
                  <span>{{episode.details.rating.average}}</span>
                </p>
              </section>
            </section>
          </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface Episode {
  name: string;
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

interface EpisodesDetailed {
  episode: string;
  details: Episode;
}

interface SeasonsAndEpisodesDetailed {
  season: string;
  episodes: Array<EpisodesDetailed>;
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
      seasonsWithEpisodes: [] as Array<SeasonsAndEpisodesDetailed>,
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

          this.seasonsWithEpisodes = noOfSeasonsArray.map((item: unknown) => ({
            season: `Season ${item}`,
            episodes: res.data
              .filter((episodeItem: any) => episodeItem.season === item)
              .map((innerItem: any) => ({
                episode: `Episode ${innerItem.number}`,
                details: {
                  name: innerItem.name,
                  airDate: innerItem.airdate,
                  airTime: innerItem.airtime,
                  rating: {
                    average: innerItem.rating.average,
                  },
                  image: {
                    original: innerItem.image.original,
                  },
                  summary: innerItem.summary,
                },
              })),
          }));
        })
        .catch((error) => console.log(error));
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tv-shows-detailed-SE {
    text-align: left;
    margin-top: 2rem;

    &__details-container {
      margin-top: 1rem;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      text-align: start;

      img {
        flex: 1 1 0;
      }

      &-content {
        margin: 0 1rem;
        flex: 4 1 0;
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
</style>
