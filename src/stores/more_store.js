import { defineStore } from "pinia";
export const useMoreStore = defineStore("more", {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    id: 0,
    item_name: "",
    more: false,
  }),
});
