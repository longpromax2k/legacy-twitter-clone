<template>
  <q-page class="full-width full-height">
    <div class="flex column items-center justify-center">
      <h3 class="lt-md">Đăng nhập</h3>
      <h3 class="q-mb-none gt-sm">Đăng nhập</h3>
      <h4 class="q-mt-md gt-sm">Hãy cùng theo dõi thế giới xung quanh</h4>
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
              label="Đăng ký"
              to="/join"
              type="button"
              color="secondary"
            />
            <q-btn
              class="q-ma-md"
              label="Đăng nhập"
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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { defineComponent } from "vue";

const auth = getAuth();

export default defineComponent({
  methods: {
    onSubmit() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.$router.push("/home");
        })
        .catch((error) => {
          alert("Sai mật khẩu");

        });
    },
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
});
</script>

<style lang="sass">
</style>>
