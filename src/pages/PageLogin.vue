<template>
  <q-page class="full-width full-height">
      <div class="flex column items-center justify-center">
        <h3 class="lt-md">Đăng nhập</h3>
        <h3 class="q-mb-none gt-sm">Đăng nhập</h3>
          <h4 class="q-mt-md gt-sm">Hãy cùng theo dõi thế giới xung quanh</h4>
        <div class="q-pa-md" style="max-width: 400px">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="name"
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

            <q-toggle
              v-model="accept"
              label="Tôi chấp nhận điều khoản và sử dụng"
            />

            <div>
              <q-btn label="Đăng nhập" type="submit" color="primary" />
              <q-btn
                label="Để trống"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </div>
      </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";

export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);

    return {
      name,
      age,
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      },
    };
  },
};
</script>

<style lang="sass">
</style>>
