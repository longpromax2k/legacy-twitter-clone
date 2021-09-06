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
            type="password"
            v-model="password"
            label="Mật khẩu"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Không được để trống ô này',
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { defineComponent } from "vue";

const auth = getAuth();

export default defineComponent({
  methods: {
    onSubmit() {
      createUserWithEmailAndPassword(auth, this.email, this.password);
      this.$router.push("/home");
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
});
</script>

<style lang="sass">
</style>>
