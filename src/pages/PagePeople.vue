<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <q-separator class="divider" size="10px" color="grey-2"/>

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
            <div class="col q-pl-none q-pt-none">
              <q-item
                class="post-element q-py-md"
              >
                <q-item-section avatar top>
                  <q-avatar size="xl">
                    <img src="../img/default.png"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-subtitle1">
                    <strong> username </strong>
                  </q-item-label>
                  <q-item-label class="posts-content text-grey-7">
                    email@adress.com
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col col-shrink">
              <q-btn
                class="q-mb-lg"
                unelevated
                rounded
                color="white"
                text-color="primary"
                label="Theo dõi"
              />
            </div>
          </div>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageHome",
});
</script>

<style lang="sass">

</style>>
