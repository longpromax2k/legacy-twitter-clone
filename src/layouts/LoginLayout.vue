<template>
  <q-layout view="lHr lpR lfr">
    <q-header reveal elevated class="lt-md bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="none"/>

        <q-toolbar-title class="text-weight-bolder">
          <span class="gt-sm">{{ $route.name }}</span>
          <span class="flex self-center justify-center">
            <svg
              width="67"
              height="24"
              viewBox="0 0 117 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="79.5" cy="37" rx="37.5" ry="37" fill="#113285"/>
              <circle cx="37" cy="37" r="37" fill="#DB4D6D"/>
            </svg>
          </span>
        </q-toolbar-title>

        <q-btn class="lt-md" dense flat round icon="none"/>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <svg
        width="128"
        height="128"
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="128" height="128" fill="white"/>
        <ellipse cx="77.5" cy="64" rx="23.5" ry="23" fill="#113285"/>
        <circle cx="51" cy="64" r="23" fill="#DB4D6D"/>
      </svg>

      <q-list class="menu-border">
        <q-item to="/" clickable v-ripple exact>
          <q-item-section avatar>
            <q-avatar color="pink-7" text-color="white" icon="login"/>
          </q-item-section>

          <q-item-section class="text-h6">Đăng nhập</q-item-section>
        </q-item>

        <q-item to="/join" clickable v-ripple exact>
          <q-item-section avatar>
            <q-avatar color="pink-7" text-color="white" icon="directions_run"/>
          </q-item-section>

          <q-item-section class="text-h6">Đăng ký</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import auth from "src/boot/auth";

export default {
  data() {
    return {
      currentUser: auth.currentUser
    };
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>

<style lang="scss">
.menu-border {
  border-top: 1px solid #42424226;
  border-bottom: 1px solid #42424226;
}
</style>
