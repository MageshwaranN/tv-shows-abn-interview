import { shallowMount } from '@vue/test-utils';
import TvShowsSearch from '../../src/components/TvShowsSearchComponent.vue';

describe('TvShowsSearchComponent.vue', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallowMount(TvShowsSearch, { });
  });

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct markup', () => {
    expect(wrapper.find('.tv-shows-search__input').isVisible()).toBe(true);
    expect(wrapper.findAll('.tv-shows-search__input').length).toEqual(1);
  });
});
