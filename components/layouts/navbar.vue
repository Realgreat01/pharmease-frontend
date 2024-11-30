<template>
  <div
    class="border-brand-gray flex h-[76px] w-full items-center justify-between border-b p-4">
    <h2 class="font-semibold">
      {{ getGreetings }},
      <span class="block text-xl font-bold text-primary">
        {{ user.firstname }} {{ user.lastname }}
      </span>
    </h2>

    <div class="flex items-start gap-4 px-8">
      <div
        class="h-10 w-10 rounded-full bg-gray-100 p-2.5"
        v-for="nav in NavbarIcons">
        <UIcon :name="nav.icon" @click="nav.click" class="h-6 w-6" />
      </div>
      <USlideover v-model="openNotification" :overlay="false">
        <UCard class="h-full w-full">
          <UButton
            label="Notifications"
            variant="ghost"
            class="w-full justify-center"
            :ui="{ rounded: 'rounded-md' }" />
          <UAccordion
            :items="notifications"
            :ui="{ wrapper: 'flex flex-col  p-4 w-full' }">
            <template #default="{ item, index, open }">
              <UButton
                color="gray"
                variant="ghost"
                class="border-b border-gray-200 dark:border-gray-700"
                :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
                <template #leading>
                  <div
                    class="w-6 h-6 rounded-full flex items-center justify-center -my-1">
                    <UIcon
                      :class="item.isRead ? 'text-primary ' : 'text-gray-900'"
                      name="material-symbols-tips-and-updates"
                      class="w-4 h-4" />
                  </div>
                </template>

                <span class="truncate" @click="item.isRead = true"
                  >{{ index + 1 }}. {{ item.label }}</span
                >

                <template #trailing>
                  <UIcon
                    name="i-heroicons-chevron-right-20-solid"
                    class="w-5 h-5 ms-auto transform transition-transform duration-200"
                    :class="[open && 'rotate-90']" />
                </template>
              </UButton>
            </template>
          </UAccordion>
        </UCard>
      </USlideover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
import { useUtilsStore } from "~/store/utils.store";

const searchedTerm = ref("");
const openNotification = ref(false);

const { user } = storeToRefs(useAuthStore());

const { getGreetings } = storeToRefs(useUtilsStore());
const toggleNotification = () => {
  openNotification.value = true;
};

const openProfile = ref(false);
const toggleProfile = () => {
  openProfile.value = true;
};

const NavbarIcons = ref([
  {
    icon: "mdi-light-bell",
    click: toggleNotification,
  },
  {
    icon: "solar-user-outline",

    click: toggleProfile,
  },
]);

const notifications = ref([
  {
    label: "Prescription Ready for Pickup",
    isRead: false,
    content:
      "Your prescription is ready for pickup at your selected pharmacy. Please collect it at your earliest convenience.",
    timestamp: "2024-11-09 10:15 AM",
  },
  {
    label: "New Message from Dr. Adams",
    isRead: false,
    content:
      "You have a new message from Dr. Adams regarding your recent consultation. Tap to view the message.",
    timestamp: "2024-11-08 3:45 PM",
  },
  {
    label: "Medication Reminder",
    isRead: true,
    content:
      "This is a reminder to take your scheduled medication. Remember to stay consistent for best results.",
    timestamp: "2024-11-08 8:00 AM",
  },
  {
    label: "Consultation Scheduled Successfully",
    isRead: true,
    content:
      "Your consultation with Dr. Lee has been successfully scheduled for November 10, 2024, at 2:00 PM. You can join via the link in your upcoming appointments.",
    timestamp: "2024-11-07 5:30 PM",
  },
  {
    label: "Pharmacy Promotion: 20% Off Vitamins",
    isRead: false,
    content:
      "Special offer! Enjoy 20% off on all vitamins at participating pharmacies. Offer valid until the end of the month.",
    timestamp: "2024-11-06 1:00 PM",
  },
]);
</script>

<style scoped></style>
