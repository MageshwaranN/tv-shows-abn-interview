<template>
  <div class="tv-shows-detailed">
    <span class="tv-shows-detailed__title-container">
      <h2>{{ title }}</h2>
      <a href="/">Back</a>
    </span>
    <section class="tv-shows-detailed__details-container">
      <img :src="showDetails?.image.original" :alt="'cover image of '+ showDetails?.name">
      <section class="tv-shows-detailed__details-container-content">
        <h2>{{showDetails?.name}}</h2>
        <p v-html="showDetails?.summary"></p>
        <section class="tv-shows-detailed__details-container-content-cast">
          <h3>Cast</h3>
          <div class="tv-shows-detailed__details-container-content-cast-container">
            <div v-for="(cast, index) in showDetails?.embedded.cast" :key="index">
              <img :src="cast.person.image.original" :alt="'portrait image of '+ cast.person.name">
              <section>
                <div>{{cast.person.name}} ({{cast.character.name}})</div>
                <div>{{cast.person.gender}}</div>
                <div>{{cast.person.birthday}}</div>
              </section>
            </div>
          </div>
        </section>
      </section>
      <section class="tv-shows-detailed__details-container-others">
        <p>
          <span><b>Language: </b></span>
          <span>{{showDetails?.language}}</span>
        </p>
        <p>
          <span><b>Genres: </b></span>
          <span>{{showDetails?.genres.join(', ')}}</span>
        </p>
        <p>
          <span><b>Status: </b></span>
          <span>{{showDetails?.status}}</span>
        </p>
        <p>
          <span><b>Premiered: </b></span>
          <span>{{showDetails?.premiered}}</span>
        </p>
        <p>
          <span><b>Ended: </b></span>
          <span>{{showDetails?.ended}}</span>
        </p>
        <p>
          <span><b>Rating: </b></span>
          <span>{{showDetails?.rating.average}}</span>
        </p>
      </section>
    </section>
    <TvShowsDetailedSE v-if="route.params.id" :id="route.params.id"></TvShowsDetailedSE>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

import TvShowsDetailedSE from './TvShowsS&EDetailedComponent.vue';

interface Cast {
  person: {
    name: string,
    birthday: string,
    gender: string,
    image: {
      original: string
    },
  },
  character: {
    name: string
  },
}

interface Details {
  name: string,
  language: string,
  genres: Array<string>,
  status: string,
  image: {
    original: string,
  },
  rating: {
    average: number,
  },
  premiered: string,
  ended: string,
  summary: string,
  embedded: {
    cast: Array<Cast>,
  },
}

export default defineComponent({
  name: 'TvShowsDetailed',
  components: {
    TvShowsDetailedSE,
  },
  props: {
    title: String,
  },
  data() {
    return {
      showDetails: null as null | Details,
      route: useRoute(),
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      axios
        .get(`https://api.tvmaze.com/shows/${this.route.params.id}?embed=cast`)
        .then((res) => {
          const {
            name,
            language,
            genres,
            status,
            image,
            rating: {
              average,
            },
            premiered,
            ended,
            summary,
            _embedded: {
              cast,
            },
          } = res.data;

          this.showDetails = {
            name,
            language,
            genres,
            status,
            image,
            rating: {
              average,
            },
            premiered,
            ended,
            summary,
            embedded: {
              cast: cast.map((item: any) => ({
                person: {
                  name: item.person.name,
                  birthday: item.person.birthday,
                  gender: item.person.gender,
                  image: {
                    original: item.person.image.original,
                  },
                },
                character: {
                  name: item.character.name,
                },
              } as Cast)) as Array<Cast>,
            },
          };
        })
        .catch((error) => console.log(error));
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tv-shows-detailed {
    margin: 0 10rem;

    a {
      color: #fff;
      font-weight: 600;
    }

    &__title-container {
      background-image: linear-gradient(-296deg,#005e5d,#00857a);
      color: #fff;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__details-container {
      margin-top: 1rem;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      text-align: start;

      img {
        height: 420px;
        flex: 1 1 0;
      }

      &-content {
        margin: 0 1rem;
        flex: 4 1 0;

        &-cast {
          img {
            height: 80px;
            width: 56px;
          }
          &-container {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            height: 228px;
            overflow: auto;

            & > * {
              background-color: #edf7f7;
              border: 1px solid #c0d1d0;
              padding: 12px;
              border-radius: 12px;
              color: #00716b;
              margin: 12px;
            }
          }
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
</style>
