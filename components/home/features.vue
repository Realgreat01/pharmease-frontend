<template>
  <div
    class="flex min-h-[50vh] grid-cols-[160px,1fr] flex-col place-items-start gap-10 p-5 lg:grid lg:min-h-[80vh] lg:p-10">
    <ph-cursive-text class="my-10">Features</ph-cursive-text>
    <div class="relative flex flex-col gap-10 lg:ml-20">
      <div
        class="flex flex-col place-items-center gap-10 lg:flex-row"
        v-for="feature in features">
        <img :src="feature.image" alt="" class="h-60" />
        <div class="flex flex-col gap-2">
          <h2 class="text-2xl font-semibold">{{ feature.title }}</h2>
          <p class="text-neutral-400">{{ feature.description }}</p>
          <p class="flex gap-x-2.5" v-for="step in feature.steps">
            <TickSquareIcon class="h-5 w-5 text-primary" /> {{ step }}
          </p>
          <ph-button class="mt-4 !h-12 !w-60" @click="feature.action"
            ><span class="">{{ feature.buttonText }}</span>
            <ArrowRight1Icon class="h-5 w-5"
          /></ph-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PH_ROUTES } from "~/constants/routes";

const router = useRouter();

const features = ref([
  {
    title: "Get medication seamlessly",
    image: "/drugs.jpg",
    description:
      "We make ordering medication a seamless and quick process. We understand how time-consuming and stressful getting medication can be so we created a better experience for you.",
    buttonText: "Order now",
    action: () => router.push({ name: PH_ROUTES.DASHBOARD.ORDERS }),
    steps: [
      "Sign up to refill your medication & supplements on schedule.",
      "Get reminders and check-ins on your progress.",
    ],
  },
  {
    title: "Virtual consultation",
    image: "/consultant.svg",
    description:
      "Get medication & supplement recommendations, health advice, and our unwavering support.",
    buttonText: "Book a session",
    action: () => router.push({ name: PH_ROUTES.DASHBOARD.CONSULTATIONS }),

    steps: [
      "Book a virtual chat with a licensed pharmacist & other health specialists for free.",
      "Start optimizing your health journey.",
    ],
  },
]);
</script>

<style scoped></style>
