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
                <tr  v-for="item in storeOrden.getListData" @click="openDetail(item.id)" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.number }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>









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
const storeOrden = useOrdenStore();


onMounted(async () => {
    await storeOrden.getListOrden();
})

const openDetail = (id) => {
    console.log(id);
}





</script>
