import { defineStore } from "pinia";
export const useDebounceStore = defineStore("debouncing", {
  state: () => ({
    waiting: false,
  }),
  actions: {
    set_waiting(w){
      this.waiting = w;
    }
  },
});
