import { defineStore } from "pinia";
import { useFetchGet } from "@/composable/httpRequest";
export const useOrdenStore = defineStore("orden", {
  state: () => ({
    listData: [],
    loading: false as boolean,
  }),

  getters: {},

  actions: {
    async getListOrden() {
      this.loading = true;
      let dataJson = [];
      const response = await useFetchGet();

      if (response.ok) {
        dataJson = await response.json();
        this.formatData(dataJson?.orders);
      }

      this.loading = false;
    },

    formatData(data) {
      const format = data.map((orden) => {


        
        console.log(orden);
      });
    },
  },
});
