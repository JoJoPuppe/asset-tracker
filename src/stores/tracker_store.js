import { defineStore } from "pinia";
export const useTrackerStore = defineStore("tracker", {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    list: [
      {
        name: "task 1",
        type: "folder",
        tasks: [
          {
            name: "task 2",
            type: "item",
            tasks: [],
          },
        ],
      },
      {
        name: "task 3",
        type: "folder",
        tasks: [
          {
            name: "task 4",
            type: "item",
            tasks: [],
          },
        ],
      },
      {
        name: "task 5",
        type: "item",
        tasks: [],
      },
      {
        name: "task 6",
        type: "item",
        tasks: [],
      },
      {
        name: "task 7",
        type: "item",
        tasks: [],
      },
      {
        name: "task 8",
        type: "item",
        tasks: [],
      },
      {
        name: "task 9",
        type: "item",
        tasks: [],
      },
    ],
  }),
  actions: {
    add_item(data){
      this.list.push({name: data.name, type: "item", id: data._id, tasks: []})
    }

  },
});
