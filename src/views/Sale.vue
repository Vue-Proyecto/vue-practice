<template>

    <!-- <div class="text-subtitle-1 text-medium-emphasis">Account *</div>
    <v-text-field density="compact" placeholder="Email address" color="primary" prepend-inner-icon="mdi-email-outline"
        variant="outlined"></v-text-field>
 -->

    <v-alert class="mb-3" border="start" close-label="Close Alert" color="primary" variant="tonal" density="compact">
        <div class="text-h6 ">Ordenes de compra</div>
    </v-alert>


    <div class="container__list">
        <v-table density="compact" hover height="500" fixed-header>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Orden</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in storeOrden.getListData" @click="openDetail(item.id)" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.number }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>



    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
        <v-card>
            <v-toolbar color="primary">
                <v-toolbar-title class="text-uppercase">Orden: #676</v-toolbar-title>
                <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
            </v-toolbar>


            <v-card-text>
                <v-btn color="pink" class="mb-5" icon="mdi-plus" />
                <v-table density="compact" hover height="500" fixed-header>
                    <thead>
                        <tr>
                            <th>Sku</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="detail in ordenDetail">
                            <td>{{ detail.sku }}</td>
                            <td>{{ detail.name }}</td>
                            <td>{{ detail.quantity }}</td>
                            <td>$ {{ detail.price }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
    </v-dialog>

</template>

<style scoped>
.container__list {
    width: 100%;
    max-width: 60%;
}
</style>




<script lang="ts" setup>
import { useOrdenStore } from '@/stores/orden';
import { onMounted, ref } from 'vue';
import type { IReadItems } from '@/type/orden/order';

const storeOrden = useOrdenStore();
const dialog = ref<Boolean>(false);

const ordenDetail = ref<IReadItmes[]>([]);



onMounted(async () => {
    await storeOrden.getListOrden();
})

const openDetail = (id: String) => {
    ordenDetail.value = storeOrden.getListData.find(order => order.id === id).items;
    dialog.value = true;
}
</script>
