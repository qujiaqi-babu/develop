import { createStore } from 'vuex';

interface StateType {
  name: string;
  time: string;
}
const defaultState: StateType = {
  name: '',
  time: ''
};

export default createStore({
  state() {
    return defaultState;
  },
  mutations: {
    setName(state: typeof defaultState, data) {
      return (state.name= data);
    },
    setTime(state: typeof defaultState, data) {
      return (state.time= data);
    },
  },
  actions: {},
  getters: {},
});
