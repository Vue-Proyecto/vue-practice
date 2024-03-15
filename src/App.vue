<script type="ts" setup>

import Menu from './components/Menu.vue';
import Sale from './views/Sale.vue';

</script>

<template>
  <v-layout>
    <Menu />
    <v-main>
      <v-container>
        <Sale />
      </v-container>
    </v-main>
  </v-layout>
</template>
