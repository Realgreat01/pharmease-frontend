<template>
  <div>
    <u-accordion
      :items="faqs"
      class="rounded-md"
      color="primary"
      size="md"
      rounded="md"
      open-icon="i-heroicons-plus"
      close-icon="i-heroicons-minus"
      :ui="{ rounded: 'rounded-md' }" />
  </div>
</template>

<script setup lang="ts">
const faqs = ref([
  {
    label: "How do I order medication through the app?",
    defaultOpen: true,
    content:
      "To order medication, navigate to the 'Get Medication' section. You can search for specific medications or browse by category. Once you've selected an item, add it to your cart and proceed to checkout. During checkout, you’ll have the option to choose home delivery or pick up from a nearby pharmacy, whichever is most convenient for you.",
  },
  {
    label: "Can I speak to a doctor directly?",
    content:
      "Yes, you can schedule virtual consultations with certified doctors through the app. Start by selecting 'Consultation,' then choose a doctor by specialty or availability. Once you’ve booked an appointment, you’ll receive a secure video link in your upcoming appointments section, making it easy to connect with your doctor at the scheduled time.",
  },
  {
    label: "Are my medical records and consultations secure?",
    content:
      "We take your privacy and security very seriously. All medical records, prescriptions, and consultation details are securely stored using advanced encryption. Our system is compliant with healthcare data regulations, ensuring your information remains private and accessible only to authorized users, such as your healthcare providers.",
  },
  {
    label: "How do I set up reminders for my medications?",
    content:
      "Setting up medication reminders is simple. Go to the 'Reminders' section, select the medication you wish to be reminded about, then set the time and frequency. You’ll receive timely notifications, helping you stay on track with your treatment plan and avoid missed doses.",
  },
  {
    label: "What payment methods are accepted?",
    content:
      "We offer a variety of secure payment options to suit your preferences, including major credit/debit cards and popular e-wallets. Our checkout process is streamlined for quick and safe transactions, giving you peace of mind as you place your order.",
  },
]);
</script>

<style scoped></style>
