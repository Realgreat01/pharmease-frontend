<template>
  <UCard class="h-full w-full">
    <UButton
      label="Notifications"
      variant="ghost"
      class="w-full justify-center"
      :ui="{ rounded: 'rounded-md' }"
    />
    <UAccordion
      :items="notifications"
      :ui="{ wrapper: 'flex flex-col  p-4 w-full' }"
    >
      <template #default="{ item, index, open }">
        <UButton
          color="gray"
          variant="ghost"
          class="border-b border-gray-200 dark:border-gray-700"
          :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
        >
          <template #leading>
            <div
              class="-my-1 flex h-6 w-6 items-center justify-center rounded-full"
            >
              <UIcon
                :class="item.isRead ? 'text-primary' : 'text-gray-900'"
                name="material-symbols-tips-and-updates"
                class="h-4 w-4"
              />
            </div>
          </template>

          <span class="truncate" @click="item.isRead = true"
            >{{ index + 1 }}. {{ item.label }}</span
          >

          <template #trailing>
            <UIcon
              name="i-heroicons-chevron-right-20-solid"
              class="ms-auto h-5 w-5 transform transition-transform duration-200"
              :class="[open && 'rotate-90']"
            />
          </template>
        </UButton>
      </template>
    </UAccordion>
  </UCard>
</template>

<script setup lang="ts">
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
