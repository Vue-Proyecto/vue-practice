<template>
    <v-alert class="mb-3" border="start" close-label="Close Alert" color="primary" variant="tonal" density="compact">
        <div class="text-h6 ">Ordenes de compra</div>
    </v-alert>

    <div class="container__list">

        <div class="load__content" v-if="storeOrden.getLoading">
            <v-progress-circular color="primary" class="mb-1" indeterminate :size="54" :width="6" />
            <div class="text-subtitle-1">Cargando ...</div>
        </div>

        <v-table v-else density="compact" hover height="500" fixed-header>
            <thead>
                <tr>
                    <th class="bg-grey-lighten-3">ID</th>
                    <th class="bg-grey-lighten-3">Orden</th>
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
                <v-btn color="teal-darken-2" class="mb-5" icon="mdi-plus" @click="modalFrom = true" />
                <v-table density="compact" hover height="400" fixed-header>
                    <thead>
                        <tr>
                            <th class="bg-grey-lighten-3">Sku</th>
                            <th class="bg-grey-lighten-3">Nombre</th>
                            <th class="bg-grey-lighten-3 text-end">Cantidad</th>
                            <th class="bg-grey-lighten-3 text-end">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="detail in ordenDetail">
                            <td>{{ detail.sku }}</td>
                            <td>{{ detail.name }}</td>
                            <td class="text-end">{{ detail.quantity }}</td>
                            <td class="text-end">$ {{ detail.price }}</td>
                        </tr>
                    </tbody>
                </v-table>
                <article class="d-flex justify-end">
                    <v-alert max-width="320" border="top" border-color="teal-darken-2" color="white">
                        <div class="text-body-1 text-uppercase text-end mb-2">Total de compra</div>
                        <div class="text-h5 text-uppercase text-end mb-4">$ {{ buyTotal }}</div>

                        <v-btn class="d-block ml-auto mb-1" color="primary" @click="payOrden()">Pagar</v-btn>
                    </v-alert>
                </article>
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
                <v-form>
                    <section>
                        <div class="text-subtitle-1 text-medium-emphasis">Sku *</div>
                        <v-text-field maxlength="25" :rules="validateForm" v-model="form.sku" density="compact"
                            placeholder="Escriba qui..." color="primary" variant="outlined"></v-text-field>
                    </section>
                    <section>
                        <div class="text-subtitle-1 text-medium-emphasis">Nombre *</div>
                        <v-text-field maxlength="250" :rules="validateForm" v-model="form.name" density="compact"
                            placeholder="Escriba qui..." color="primary" variant="outlined"></v-text-field>
                    </section>
                    <section>
                        <div class="text-subtitle-1 text-medium-emphasis">Cantidad *</div>
                        <v-text-field type="number" :rules="validateForm" v-model="form.quantity" density="compact"
                            placeholder="Escriba qui..." color="primary" variant="outlined"></v-text-field>
                    </section>
                    <section>
                        <div class="text-subtitle-1 text-medium-emphasis">Precio *</div>
                        <v-text-field :rules="validateForm" v-model="form.price" density="compact"
                            placeholder="Escriba qui..." color="primary" variant="outlined"></v-text-field>
                    </section>
                </v-form>
            </v-card-text>


            <v-card-actions class="my-2 d-flex justify-end">
                <v-btn :disabled="validateSave" color="primary" variant="flat" @click="saveProducto()">
                    <v-icon class="me-1">mdi-content-save</v-icon>
                    Guardar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<style scoped>
.container__list {
    width: 100%;
    height: calc(100vh - 300px);
    max-width: 60%;

}

.load__content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
</style>




<script lang="ts" setup>
import Swal from 'sweetalert2'

import { computed, inject, onMounted, reactive, ref } from 'vue';
import { useOrdenStore } from '@/stores/orden';
import type { IReadItems } from '@/type/orden/order';
import { version } from 'punycode';

const storeOrden = useOrdenStore();
const dialog = ref<Boolean>(false);
const modalFrom = ref<Boolean>(false);
const noOrden = ref<string>('');
const indexOrden = ref<number | null>(null);
const ordenDetail = ref<IReadItmes[]>([]);


const validateForm = ref([v => !!v || 'Es requerido'])


const form = reactive<IReadItems>({
    sku: '',
    name: '',
    quantity: '',
    price: '',
})


onMounted(async () => {
    await storeOrden.getListOrden();
})


const validateSave = computed(() => {
    const status = Object.values(form).includes("");
    return status;
});

const buyTotal = computed(() => {
    const total = ordenDetail.value.reduce((acc, produc) => acc + parseFloat(produc.price), 0);
    return new Intl.NumberFormat({ style: 'currency', currency: 'MX' }).format(total)
})

const openDetail = (id: String, index: number) => {
    noOrden.value = id;
    indexOrden.value = index;
    ordenDetail.value = storeOrden.getListData.find(order => order.id === id).items;
    dialog.value = true;
}

const saveProducto = async () => {
    storeOrden.saveItemOrden(JSON.parse(JSON.stringify(form)), indexOrden.value);
    modalFrom.value = false;
    clearForm();
}

const payOrden = () => {
    dialog.value = false;
    setTimeout(() => {
        Swal.fire({
            title: '¡Gracias por tu compra!',
            text: 'Si necesitas algo más o tienes alguna pregunta, no dudes en ponerte en contacto con nosotros. ',
            icon: 'success',
        });
    }, 400);
}

const clearForm = () => {
    form.name = "";
    form.price = "";
    form.quantity = "";
    form.sku = "";
}

</script>
