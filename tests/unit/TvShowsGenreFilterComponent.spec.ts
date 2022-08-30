import { shallowMount } from '@vue/test-utils';
import TvShowsGenreFilter from '../../src/components/TvShowsGenreFilterComponent.vue';

describe('TvShowsGenreFilterComponent.vue', () => {
  let wrapper: any;
  beforeEach(() => {
    const genres = ['Thriller', 'Drama'];
    wrapper = shallowMount(TvShowsGenreFilter, {
      props: { genres },
    });
  });

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct markup', () => {
    expect(wrapper.findAll('.genre-filter__container-items').length).toEqual(2);
    expect(wrapper.findAll('.genre-filter__container-items').at(0).text()).toEqual('Thriller');
    expect(wrapper.findAll('.genre-filter__container-items').at(1).text()).toEqual('Drama');
  });

  it('trigger emit on calling handleClick', async () => {
    wrapper.vm.handleClick('foo');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().filterGenre).toBeTruthy();
    expect(wrapper.emitted().filterGenre[0]).toEqual([{ genre: 'foo' }]);
  });
});
