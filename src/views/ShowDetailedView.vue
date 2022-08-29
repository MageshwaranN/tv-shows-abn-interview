<template>
  <TvShowsDetailed  title="TV-Maze for ABN-AMRO"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TvShowsDetailed from '../components/TvShowsDetailedComponent.vue';

export default defineComponent({
  name: 'ShowDetailedView',
  components: {
    TvShowsDetailed,
  },
});
</script>
