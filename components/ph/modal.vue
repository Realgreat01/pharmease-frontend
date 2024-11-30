<template>
  <Teleport to="body">
    <Transition mode="out-in" appear>
      <div
        @click.self="closeModal"
        class="fixed left-0 top-0 z-[100] flex h-screen w-full flex-col items-center justify-center bg-[#00000080] bg-opacity-70">
        <Transition
          name="slideIn"
          enter-active-class="animate__animated animate__zoomIn"
          leave-active-class="animate__animated animate__zoomOut">
          <div
            v-if="showModal"
            class="scroll modal-content relative max-h-screen bg-white px-2 pb-4 md:justify-normal md:rounded-lg md:px-4"
            :class="class">
            <div
              class="sticky top-0 z-50 flex w-full items-center justify-center bg-white pb-2 pt-4">
              <h2
                class="qh-text-2 text-brand ml-4 mt-4 w-fit justify-self-center text-center font-black capitalize"
                v-if="title">
                {{ title }}
              </h2>

              <UButton
                class="border-brand text-brand fixed right-0 m-4 block h-8 w-8 cursor-pointer justify-self-end rounded-full border md:absolute md:top-0"
                @click="closeModal" />
            </div>
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const emits = defineEmits(["close"]);
const props = defineProps({ class: String, title: String });

const showModal = ref(false);

const closeModal = () => {
  showModal.value = false;
  setTimeout(() => {
    emits("close");
  }, 500);
};

onMounted(() => {
  document.body.style.overflow = "hidden";
  showModal.value = true;
});

onUnmounted(() => {
  document.body.style.overflow = "visible";
});
</script>

<style scoped>
.modal-content {
  max-height: 96%;
  min-height: 60%;
  width: 50vw;
  overflow-y: auto;
  padding-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 700px) {
  .modal-content {
    width: 100% !important;
    max-width: none;
    max-height: 100%;
    min-height: 100%;
  }
}
</style>
