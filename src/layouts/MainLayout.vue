<template>
  <q-layout view="lHr lpR fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn
          class="lt-md"
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-weight-bolder">
          <span class="gt-sm">{{ $route.name }}</span>
          <span class="flex lt-md self-center justify-center">
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

        <q-btn
          class="lt-md"
          dense
          flat
          round
          icon="search"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      :width="283"
      bordered
    >
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
        <q-item to="/home/" clickable v-ripple exact>
          <q-item-section avatar>
            <q-avatar color="pink-7" text-color="white" icon="home"/>
          </q-item-section>

          <q-item-section class="text-h6">Trang chủ</q-item-section>
        </q-item>

        <q-item to="/people" clickable v-ripple exact>
          <q-item-section avatar>
            <q-avatar color="pink-7" text-color="white" icon="people"/>
          </q-item-section>

          <q-item-section class="text-h6">Mọi người</q-item-section>
        </q-item>

        <q-item to="/about" clickable v-ripple exact>
          <q-item-section avatar>
            <q-avatar color="pink-7" text-color="white" icon="info"/>
          </q-item-section>

          <q-item-section class="text-h6">Thông tin</q-item-section>
        </q-item>

        <q-item @click="logOut()" clickable v-ripple exact>
          <q-item-section avatar>
            <q-avatar color="pink-7" text-color="white" icon="logout"/>
          </q-item-section>

          <q-item-section class="text-h6">Đăng xuất</q-item-section>
        </q-item>
      </q-list>
      <strong>Developer Mode</strong>
      <p>Current UID: {{ (currentUser != null) ? currentUser.uid : "none" }}</p>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
      <q-input
        placeholder="Tìm kiếm trên Bettr"
        class="q-ma-md"
        color="teal"
        outlined
        rounded
        dense
      >
        <template v-slot:prepend>
          <q-icon name="search"/>
        </template>
      </q-input>

      <q-list separator padding>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline text="text-grey">MẸO</q-item-label>
            <q-item-label class="text-weight-bold"
            >Hãy xem chuyện gì diễn ra xung quanh bạn.
            </q-item-label
            >
            <q-item-label caption>
              Khám phá thế giới xung quanh bạn bằng cách kết nối với bạn bè bạn
              quen biết. Hãy tìm kiếm họ trên Bettr.
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>MỚI</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import auth from "src/boot/auth";
import { ref } from "vue";
import { signOut } from "firebase/auth";

export default {
  data() {
    return {
      currentUser: auth.currentUser,
    };
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },

  methods: {
    async logOut() {
      try {
        const data = await auth.signOut().then(() => {
          this.$router.push("/");
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
.menu-border {
  border-top: 1px solid #42424226;
  border-bottom: 1px solid #42424226;
}
</style>
