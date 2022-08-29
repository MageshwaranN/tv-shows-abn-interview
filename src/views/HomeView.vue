<template>
  <TvShowsHome title="TV-Maze for ABN-AMRO"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TvShowsHome from '../components/TvShowsHomeComponent.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    TvShowsHome,
  },
});
</script>
