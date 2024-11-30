<template>
  <div class="form-box">
    <label
      :for="name"
      :class="labelClass"
      class="!text-brand flex gap-x-1 !text-sm !font-semibold !capitalize">
      <slot v-if="$slots.default"></slot>
      <template v-else>
        <span>{{ label }} </span>
      </template>

      <span class="text-error !font-normal" v-if="required">*</span>
    </label>
    <div class="">
      <div class="relative">
        <Field
          :name="name"
          :rules="rules"
          v-if="type === 'number'"
          :class="errorAvailable ? 'error-box' : 'normal-box'"
          class="relative w-full"
          v-model="model"
          v-bind="$attrs"
          :placeholder="placeholder"
          @focus="handleFocus($event.target.value)"
          @change="handleNumbers($event.target.value)" />

        <Field
          :name="name"
          :rules="rules"
          v-else-if="type === 'currency'"
          :class="errorAvailable ? 'error-box' : 'normal-box'"
          class="relative w-full"
          v-model="model"
          v-bind="$attrs"
          :placeholder="placeholder"
          @focus="handleFocus($event.target.value)"
          @change="handleCurrency($event.target.value)" />

        <Field
          :name="name"
          :rules="rules"
          :type="passwordType"
          v-model="modelValue"
          v-bind="$attrs"
          :placeholder="placeholder"
          v-else-if="type === 'password'"
          :class="errorAvailable ? 'error-box' : 'normal-box'"
          class="relative w-full"
          @input="handleInput($event.target.value)" />

        <Field
          v-else
          :name="name"
          :rules="rules"
          :as="as"
          :type="type"
          :class="errorAvailable ? 'error-box' : 'normal-box'"
          v-bind="$attrs"
          v-model="model"
          :placeholder="placeholder"
          class="relative w-full"
          @input="handleInput($event.target.value)"
          @change="handleChange($event.target.value)" />

        <ph-button
          :label="buttonText"
          v-if="buttonText"
          type="button"
          @click="actionButtonClick"
          class="center-box !right-0 !h-full !rounded-lg">
          <slot name="buttonText">{{ buttonText }}</slot>
        </ph-button>

        <EyeSlashIcon
          v-if="type === 'password' && passwordType === 'password'"
          @click="showPassword()"
          class="center-box text-dark-400 h-6 w-6 cursor-pointer" />

        <EyeIcon
          v-if="type === 'password' && passwordType === 'text'"
          @click="hidePassword()"
          class="center-box text-dark-400 h-6 w-6 cursor-pointer" />
      </div>

      <p class="text-dark-300 mr-4 max-w-[96%] text-sm" v-if="hint">
        {{ hint }}
      </p>
      <ErrorMessage :name="name" v-slot="{ message }" v-if="!hideErrorMessage">
        <span
          class="ml-1 text-sm text-secondary-magenta first-letter:!capitalize"
          >{{ message }}</span
        >
      </ErrorMessage>
      <p v-if="serverErrors && serverErrors[name]">
        <span class="ml-1 !text-sm first-letter:!capitalize">{{
          serverErrors[name]
        }}</span>
      </p>
      <div class="ml-2 mt-1 flex items-center gap-x-2" v-if="hasCheckbox">
        <input
          type="checkbox"
          v-model="checkBox"
          class="accent-brand block h-4 w-4"
          @input="handleCheckbox" />
        <span class="qh-text-4 text-dark-400 block">{{ checkboxText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate";

import type { PropType } from "vue";

const props = defineProps({
  name: { type: String, required: true },
  label: { type: [String, Boolean], default: "" },
  rules: Object,
  required: Boolean,
  as: { type: String, default: "input" },
  type: { type: String, default: "text" },
  errors: Object,
  serverErrors: Object,
  hint: String,
  buttonText: String,
  labelClass: String,
  labelName: String,
  suffix: String,
  options: { type: Array as PropType<any[]>, default: [] },
  noDataMessage: String,
  placeholder: String,
  hasCheckbox: Boolean,
  hideErrorMessage: Boolean,
  checkboxText: { type: String, default: "This should be a chekbox content" },
});

const model = defineModel<any>({ default: null });
const modelValue = ref<any>(model.value);
const checkBox = ref(false);

const emit = defineEmits([
  "update:modelValue",
  "update:checkbox",
  "input",
  "change",
  "button-click",
]);

const passwordType = ref("password");

const handleInput = (value: any) => {
  emit("update:modelValue", value);
  emit("input", value);
};

const handleCheckbox = async (value: any) => {
  await nextTick();
  setTimeout(() => emit("update:checkbox", checkBox.value), 100);
};

const handleChange = (value: any) => {
  emit("update:modelValue", value);
  emit("change", value);
};

const actionButtonClick = () => {
  return emit("button-click");
};

const handleTag = (value: any) => {
  if (Array.isArray(model.value)) {
    model.value.push(value);
  } else model.value = value;
};

const showPassword = () => {
  passwordType.value = "text";
};

const hidePassword = () => {
  passwordType.value = "password";
};

const handleCurrency = async (value: string) => {
  await nextTick();
  //   const currency = qhNumbers.formatCurrency(value) as string;
  //   emit('update:modelValue', qhNumbers.convertCurrencyToNumber(currency));
  //   modelValue.value = currency;
};

const handleNumbers = async (value: string) => {
  await nextTick();
  //   const number = qhNumbers.formatNumber(value) as string;
  //   emit('update:modelValue', qhNumbers.convertCurrencyToNumber(number));
  //   modelValue.value = number;
};

const handleFocus = async (value: string) => {
  //   modelValue.value = qhNumbers.convertCurrencyToNumber(value);
};

const errorAvailable = ref(false);

watch(
  () => props.errors,
  (errors: any) => {
    if (errors[props.name]) errorAvailable.value = true;
    else errorAvailable.value = false;
  }
);

watch(
  () => props.serverErrors,
  (errors: any) => {
    if (errors[props.name]) errorAvailable.value = true;
    else errorAvailable.value = false;
  }
);

watch(
  () => model.value,
  (errors: any) => {
    errorAvailable.value = false;
    if (props.serverErrors) props.serverErrors[props.name] = null;
    if (props.errors) props.errors[props.name] = null;
  }
);
</script>

<style scoped>
.center-box {
  @apply absolute right-2 top-1/2 -translate-y-1/2 transform;
}

input,
textarea {
  @apply border border-slate-200 bg-white text-slate-400;
  outline: none;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 8px;

  :disabled {
    color: #a0bdba;
  }

  &:focus {
    @apply ring-[1px] ring-primary;
  }

  /* // @apply block w-full border ansparent  focus:border-2 focus:border-green-400 focus:outline-none; */
}
</style>
