<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <q-input
        v-model="searchInput"
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

      <q-separator class="divider" size="10px" color="grey-2"/>


      <q-list separator>
        <q-item
          v-for="user in users"
          :key="user.id"
          class="post-element q-py-md">
          <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
            <div class="col q-pt-none q-pl-none">
              <div class="row">
                <q-item-section avatar center>
                  <q-avatar size="xl">
                    <img src="../img/default.png"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-subtitle1">
                    <strong> {{ user.username }} </strong>
                  </q-item-label>
                  <q-btn
                    class="q-mb-lg"
                    unelevated
                    rounded
                    color="primary"
                    label="Theo dõi"
                  />
                </q-item-section>
              </div>
            </div>
          </div>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import db from "src/boot/firestore";
import { collection, query, onSnapshot, orderBy, where } from "firebase/firestore";

export default defineComponent({
  name: "PageSearch",

  data() {
    return {
      users: [],
      searchInput: ""
    };
  },

  mounted() {
    const mountUser = query(collection(db, "users"), where("username", "==", this.searchInput));
    const unsubscribe = onSnapshot(mountUser, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let userChange = change.doc.data();
        userChange.id = change.doc.id;
        if (change.type === "added") {
          this.users.unshift(userChange);
        }
        if (change.type === "modified") {
          let index = this.users.findIndex((user) => user.id === userChange.id);
          Object.assign(this.users[index], userChange);
        }
        if (change.type === "removed") {
          let index = this.users.findIndex((user) => user.id === userChange.id);
          this.users.splice(index, 1);
        }
      });
    });
  }
});
</script>

<style lang="sass">

</style>>
