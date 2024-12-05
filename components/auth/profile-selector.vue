<template>
  <div class="flex gap-5 mt-20 flex-col justify-center items-center">
    <h2 class="text-3xl font-semibold">What do you do ?</h2>
    <p class="">Select the type of user you are !</p>

    <div class="flex gap-6">
      <UButton
        v-for="user in userTypes"
        :variant="selectedType === user ? 'soft' : 'outline'"
        class="h-20 w-40 rounded-lg centralize"
        @click="selectedType = user">
        <h2 class="capitalize">{{ user.type.toLocaleLowerCase() }}</h2>
      </UButton>
    </div>
    <UButton
      label="Proceed"
      icon=""
      @click="router.push({ name: selectedType.route })"
      class="w-40 flex items-center justify-center"
      :ui="{ rounded: 'rounded-full' }" />
  </div>
</template>

<script setup lang="ts">
import { PH_ROUTES } from "~/constants/routes";
import { UserTypes } from "~/types";

const router = useRouter();

const userTypes = ref([
  { type: UserTypes.USER, route: PH_ROUTES.DASHBOARD.HOME },
  { type: UserTypes.PHARMACIST, route: PH_ROUTES.PHARMACIST.DASHBOARD },
  { type: UserTypes.DOCTOR, route: PH_ROUTES.DOCTOR.DASHBOARD },
]);

const selectedType = ref<any>(userTypes.value[0]);
</script>

<style scoped></style>
