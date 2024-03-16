import { defineStore } from "pinia";
import { useFetchGet } from "@/composable/httpRequest";

import type { IReadOrden, IReadItems } from "@/type/orden/order";

export const useOrdenStore = defineStore("orden", {
  state: () => ({
    listData: [] as IReadOrden[],
    loading: false as boolean,
  }),

  getters: {
    getListData: (state) => state.listData,
    getLoading: (state) => state.loading
  },

  actions: {
    async getListOrden() {
      this.loading = true;

      const response = await useFetchGet();

      if (response.ok) {
        const dataJson = await response.json();
        this.listData = this.formatData(dataJson.orders) as IReadOrden[];
      }

      this.loading = false;
    },

    saveItemOrden(payload: IReadItems, index: number) {
      this.listData[index].items.push(payload);
    },

    formatData(data: any): IReadOrden[] {
      const format = data.map((orden: any) => {
        const { id, number, items } = orden;

        return {
          id,
          number,
          items: items.map((detail: any) => ({
            sku: detail.sku,
            name: detail.name,
            quantity: detail.quantity,
            price: detail.price,
          })),
        };
      });

      return format;
    },
  },
});
