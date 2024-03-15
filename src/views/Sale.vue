<template>



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
                <tr v-for="(item, index) in storeOrden.getListData" @click="openDetail(item.id, index)" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.number }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>


    <!-- detalle orden -->
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
        <v-card>
            <v-toolbar color="primary">
                <v-toolbar-title class="text-uppercase">Orden: # {{ noOrden }}</v-toolbar-title>
                <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
            </v-toolbar>


            <v-card-text>
                <v-btn color="pink" class="mb-5" icon="mdi-plus" @click="modalFrom = true" />
                <v-table density="compact" hover height="500" fixed-header>
                    <thead>
                        <tr>
                            <th>Sku</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
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

    <!-- fomrularios -->

    <v-dialog v-model="modalFrom" max-width="500">
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">
                    Nuevo Producto
                </div>
                <v-btn icon="mdi-close" color="error" variant="text" @click="modalFrom = false"></v-btn>
            </v-card-title>
            <v-divider class="mb-1"></v-divider>

            <v-card-text>
                <section>
                    <div class="text-subtitle-1 text-medium-emphasis">Sku *</div>
                    <v-text-field v-model="form.sku" density="compact" placeholder="Escriba qui..." color="primary"
                        variant="outlined"></v-text-field>
                </section>
                <section>
                    <div class="text-subtitle-1 text-medium-emphasis">Nombre *</div>
                    <v-text-field v-model="form.name" density="compact" placeholder="Escriba qui..." color="primary"
                        variant="outlined"></v-text-field>
                </section>
                <section>
                    <div class="text-subtitle-1 text-medium-emphasis">Cantidad *</div>
                    <v-text-field v-model="form.quantity" density="compact" placeholder="Escriba qui..." color="primary"
                        variant="outlined"></v-text-field>
                </section>
                <section>
                    <div class="text-subtitle-1 text-medium-emphasis">Precio *</div>
                    <v-text-field v-model="form.price" density="compact" placeholder="Escriba qui..." color="primary"
                        variant="outlined"></v-text-field>
                </section>
            </v-card-text>


            <v-card-actions class="my-2 d-flex justify-end">
                <v-btn color="primary" variant="flat" @click="saveProducto()">Guardar</v-btn>
            </v-card-actions>
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
import { onMounted, reactive, ref } from 'vue';
import type { IReadItems } from '@/type/orden/order';

const storeOrden = useOrdenStore();

const dialog = ref<Boolean>(false);
const modalFrom = ref<Boolean>(false);
const noOrden = ref<string>('');
const indexOrden = ref<number | null>(null);
const ordenDetail = ref<IReadItmes[]>([]);

const form = reactive<IReadItems>({
    sku: '243232',
    name: 'sdsds',
    quantity: '',
    price: '',
})


onMounted(async () => {
    await storeOrden.getListOrden();
})

const openDetail = (id: String, index: number) => {
    noOrden.value = id;
    indexOrden.value = index;
    ordenDetail.value = storeOrden.getListData.find(order => order.id === id).items;
    dialog.value = true;
}

const saveProducto = () => {
    storeOrden.saveItemOrden(JSON.parse(JSON.stringify(form)), indexOrden.value);
    modalFrom.value = false;
    clearForm();
}

const clearForm = () => {
    form.name = "";
    form.price = "";
    form.quantity = "";
    form.sku = "";
}

</script>
