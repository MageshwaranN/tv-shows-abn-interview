<template>
  <div class="tv-shows-detailed">
    <span class="tv-shows-detailed__title-container">
      <h2>{{ title }}</h2>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'TvShowsDetailed',
  components: {
  },
  props: {
    title: String,
  },
  data() {
    return { };
  },
  created() {
    const route = useRoute();
    axios
      .get(`https://api.tvmaze.com/shows/${route.params.id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  },
  methods: {
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tv-shows-detailed {
    margin: 0 10rem;

    &__title-container {
      background-image: linear-gradient(-296deg,#005e5d,#00857a);
      color: #fff;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
