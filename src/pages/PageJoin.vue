<template>
  <q-page class="full-width full-height">
    <div class="flex column items-center justify-center">
      <h3>Đăng ký</h3>
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="email"
            label="Địa chỉ email"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Không được để trống ô này',
            ]"
          />

          <q-input
            filled
            v-model="username"
            label="Tên người dùng"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Không được để trống ô này',
            ]"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Mật khẩu"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Không được để trống ô này',
            ]"
          />

          <q-input
            filled
            type="password"
            v-model="reTypePasswd"
            label="Nhập lại mật khẩu"
            lazy-rules
            :rules="[
              // (val) => (val && val.length > 0) || 'Không được để trống ô này', -->
            ]"
          />

          <div class="flex justify-center">
            <q-btn
              class="q-ma-md"
              label="Đăng nhập"
              to="/"
              type="button"
              color="secondary"
            />
            <q-btn
              class="q-ma-md"
              label="Đăng ký"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { defineComponent } from "vue";

const auth = getAuth();

export default defineComponent({
  methods: {
    async onSubmit() {
      // Add Authentication
      createUserWithEmailAndPassword(auth, this.email, this.password);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.uid = user.uid;
          this.$router.push("/home");
        } else {
          // User is signed out
          this.$router.push("/");
        }
      });

      // Save and Initial Users Information
      let newUser = {
        username: this.username,
        followed: [],
        posts: [],
        liked: [],
      };

      await setDoc(doc(db, "users", this.uid), newUser);
    },
  },
  data() {
    return {
      email: "",
      password: "",
      username: "",
    };
  },
});
</script>

<style lang="sass">
</style>>
