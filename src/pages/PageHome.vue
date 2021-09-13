<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            class="new-post"
            v-model="newBettrContent"
            bottom-slots
            label="Chuyện gì đang diễn ra vậy?"
            counter
            maxlength="280"
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="../img/default.png"/>
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewPost"
            class="q-mb-lg"
            :disable="!newBettrContent"
            unelevated
            rounded
            color="primary"
            label="Đăng"
          />
        </div>
      </div>

      <q-separator class="divider" size="10px" color="grey-2"/>

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-item
            v-for="post in posts"
            :key="post.id"
            class="post-element q-py-md"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="../img/default.png"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong> {{ post.username }} </strong>
              </q-item-label>
              <q-item-label class="posts-content text-body1">
                {{ post.content }}
              </q-item-label>
              <div class="posts-icon row justify-between q-mt-sm">
                <div>
                  <q-btn
                    @click="toggleLiked(post)"
                    flat
                    round
                    :color="post.liked ? 'pink-7' : 'grey'"
                    :icon="post.liked ? 'favorite' : 'favorite_border'"
                    size="sm"
                  />
                  <label class="text-grey-7">Thích</label>
                </div>

                <div>
                  <q-btn
                    @click="toggleComment()"
                    flat
                    round
                    color="grey"
                    icon="chat_bubble_outline"
                    size="sm"
                  />

                  <label class="text-grey-7">Bình luận</label>
                </div>

                <div>
                  <q-btn flat round color="grey" icon="ios_share" size="sm"/>
                  <label class="text-grey-7">Chia sẻ</label>
                </div>
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import auth from "src/boot/auth";
import db from "src/boot/firestore";
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  arrayUnion,
  deleteDoc,
  addDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { defineComponent } from "vue";
import { eventBus } from "src/boot/evtbus";

export default defineComponent({
  name: "PageHome",
  data() {
    return {
      username: "",
      newBettrContent: "",
      posts: [],
    };
  },
  methods: {

    async addNewPost() {
      let newPost = {
        userid: auth.currentUser.uid,
        username: auth.currentUser.displayName,
        content: this.newBettrContent,
        date: Date.now(),
        liked: false,
      };

      const postRef = await addDoc(collection(db, "posts"), newPost);
      const postId = postRef.id;

      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        posts: arrayUnion(postId),
      });

      this.newBettrContent = "";
    },
    async toggleLiked(post) {
      const likeRef = doc(db, "posts", post.id);
      await updateDoc(likeRef, {
        liked: !post.liked,
      });
    },
    toggleComment() {
      this.newBettrContent = `Trả lời @aido:
`;
    },
  },

  filter: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    },
  },

  created() {
    eventBus.on("getUsername", function (username) {
      this.username = username;
    });
  },

  async mounted() {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      // ...
    } else {

      let newUser = {
        username: auth.currentUser.displayName,
        followed: [],
        posts: [],
        liked: [],
      };

      await setDoc(doc(db, "users", auth.currentUser.uid), newUser);
    }

    const mountPost = query(collection(db, "posts"), orderBy("date"));
    const unsubscribe = onSnapshot(mountPost, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let postChange = change.doc.data();
        postChange.id = change.doc.id;
        if (change.type === "added") {
          this.posts.unshift(postChange);
        }
        if (change.type === "modified") {
          let index = this.posts.findIndex((post) => post.id === postChange.id);
          Object.assign(this.posts[index], postChange);
        }
        if (change.type === "removed") {
          let index = this.posts.findIndex((post) => post.id === postChange.id);
          this.posts.splice(index, 1);
        }
      });
    });
  },
});
</script>

<style lang="sass">
.new-post
  textarea
    font-size: 20px
    line-height: 1.4 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.posts-content
  white-space: pre-line

.posts-icons
  margin-left: -5px

.post-element:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)
</style>>
