<template>
  <UCard>
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <UForm
        :schema
        :state="credentials"
        class="mx-auto mt-10 flex w-full flex-col gap-4 p-2"
        @submit.prevent="handleSubmit($event, signInUser)">
        <UFormGroup label="Email" name="email" required block>
          <UInput
            v-model="credentials.email"
            class="w-full"
            placeholder="ade.olamide@gmail.com" />
        </UFormGroup>

        <UFormGroup name="password" label="Password">
          <UInput
            v-model="credentials.password"
            placeholder="********"
            required
            :type="show ? 'text' : 'password'"
            :ui="{ icon: { trailing: { pointer: '' } } }">
            <template #trailing>
              <UButton
                variant="link"
                size="sm"
                :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                aria-label="show ? 'Hide password' : 'Show password'"
                :aria-pressed="show"
                aria-controls="password"
                @click="show = !show" />
            </template>
          </UInput>
        </UFormGroup>

        <UButton
          type="submit"
          class="flex items-center"
          block
          size="lg"
          font="font-bold"
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
          >Login
        </UButton>
      </UForm>
    </VeeForm>
    <h2 class="w-full text-center text-sm font-medium">
      Not a member ?
      <span class="text-primary" @click="registerUser">Create Account!</span>
    </h2>
  </UCard>
</template>

<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";
import { object, string } from "yup";
import { PH_ROUTES } from "~/constants/routes";
import { useAuthStore } from "~/store/auth.store";

definePageMeta({
  name: PH_ROUTES.LOGIN,
  layout: "auth",
  title: "Login",
  pageHint:
    "Login to continue getting fast services across pharmacies through us!",
});

const authStore = useAuthStore();
const show = ref(false);
const schema = object({
  email: ValidationRules.userDetails.email,
  password: string()
    .min(6, "Must be at least 6 characters")
    .required("Required"),
});

const router = useRouter();

const credentials = ref({
  email: "",
  password: "",
});
const registerUser = () => router.push({ name: PH_ROUTES.REGISTER });

const signInUser = async (field: any) => {
  await authStore.LoginUser(credentials.value);
};
</script>

<style scoped></style>
