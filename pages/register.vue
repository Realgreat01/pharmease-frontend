<template>
  <UCard class="w-full">
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
      <UForm
        :schema
        :state="credentials"
        class="hide-scrollbar mx-auto grid w-full flex-col gap-4 p-2 md:grid-cols-2"
        @submit.prevent="handleSubmit($event, registerUser)"
      >
        <UFormGroup
          label="Email"
          name="email"
          required
          block
          class="sm:col-span-2"
        >
          <UInput v-model="credentials.email" class="w-full" />
        </UFormGroup>
        <UFormGroup label="Username" name="username" required block>
          <UInput v-model="credentials.username" class="w-full" />
        </UFormGroup>
        <UFormGroup name="firstname" label="First Name" required block>
          <UInput v-model="credentials.firstname" class="w-full" />
        </UFormGroup>
        <UFormGroup name="lastname" label="Last Name" required block>
          <UInput v-model="credentials.lastname" class="w-full" />
        </UFormGroup>
        <UFormGroup name="phone_number" label="Phone Number" required block>
          <UInput v-model="credentials.phone_number" class="w-full" />
        </UFormGroup>

        <UFormGroup name="password" label="Password">
          <UInput
            v-model="credentials.password"
            placeholder="Password"
            required
            :type="showPassword ? 'text' : 'password'"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                variant="link"
                size="sm"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                aria-label="show ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                aria-controls="password"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormGroup>
        <UFormGroup name="confirmPassword" label="Confirm Password">
          <UInput
            v-model="credentials.confirmPassword"
            placeholder="Password"
            required
            :type="showConfirmPassword ? 'text' : 'password'"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                variant="link"
                size="sm"
                :icon="
                  showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'
                "
                aria-label="show ? 'Hide password' : 'Show password'"
                :aria-pressed="showConfirmPassword"
                aria-controls="password"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </UInput>
        </UFormGroup>
        <UButton
          class="col-span-2 justify-center"
          type="submit"
          block
          :loading="isSubmitting"
          :disabled="Object.keys(errors).length !== 0 || isSubmitting"
          >Create Account</UButton
        >
      </UForm>
    </VeeForm>
    <h2 class="w-full text-center text-sm font-medium">
      Already a member ?
      <span class="text-primary" @click="loginUser">Login</span>
    </h2>
  </UCard>
</template>

<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";
import * as Yup from "yup";
import { PH_ROUTES } from "~/constants/routes";
import { useAuthStore } from "~/store/auth.store";

definePageMeta({
  name: PH_ROUTES.REGISTER,
  layout: "auth",
  title: "Create Account",
  pageHint:
    "Create an account to start getting fast services across pharmacies through us!",
});

const authStore = useAuthStore();
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const credentials = ref({
  password: "Real4great",
  confirmPassword: "Real4great",
  firstname: "Samson",
  lastname: "Ikuomenisan",
  email: "samsonrealgreat@gmail.com",
  phone_number: "+2347062215229",
  username: "realgreat",
});

const schema = Yup.object({
  email: ValidationRules.userDetails.email,
  firstname: ValidationRules.userDetails.firstname,
  lastname: ValidationRules.userDetails.lastname,
  username: ValidationRules.userDetails.username,
  phone_number: ValidationRules.userDetails.phone_number,

  password: Yup.string()
    .required("password is required")
    .min(6, "password must be at least 6 characters long")
    .matches(
      /(?=.*[a-z])/,
      "password must contain at least one lowercase letter",
    )
    .matches(
      /(?=.*[A-Z])/,
      "password must contain at least one uppercase letter",
    )
    .matches(/(?=.*[0-9])/, "password must contain at least one number"),
  confirmPassword: Yup.string()
    .required("please confirm your password")
    .test("passwords-match", "passwords does not match", function (value) {
      return credentials.value.password === value;
    }),
});

const router = useRouter();
const loginUser = () => router.push({ name: PH_ROUTES.LOGIN });

const registerUser = async (field: any) => {
  await authStore.register(credentials.value);
};
</script>

<style scoped></style>
