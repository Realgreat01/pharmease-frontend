<template>
  <div class="grid gap-4">
    <div class="flex items-center justify-between py-8">
      <h2 class="text-2xl font-semibold">Nearby Pharmacy</h2>
    </div>

    <UTable v-model="selected" :rows="pharmacies" :columns="columns">
      <template #id-data="{ row }">
        {{ phHelpers.sliceWords(row.id, 10) }}
      </template>
      <template #description-data="{ row }">
        {{ phHelpers.sliceWords(row.description, 24) }}
      </template>
      <template #services-data="{ row }">
        <UBadge v-for="service in row.services" variant="soft">{{
          service
        }}</UBadge>
      </template>

      <template #action-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { PH_ROUTES } from "~/constants/routes";
import { usePharmacyStore } from "~/store/pharmacy.store";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
  name: PH_ROUTES.DASHBOARD.NEARBY,
});

const selected = ref([]);
const { pharmacies } = storeToRefs(usePharmacyStore());
const items = (row: any) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];
const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "address.address_line",
    label: "Address",
  },
  {
    key: "services",
    label: "Services",
  },
  {
    key: "contact_info.email",
    label: "Email",
  },
  {
    key: "action",
    label: "Action",
  },
];
</script>

<style scoped></style>
