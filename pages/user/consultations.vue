<template>
  <div class="grid gap-4">
    <div class="flex items-center justify-between py-4">
      <h2 class="text-2xl font-semibold">Consultant Sessions</h2>
      <UButton
        @click="
          router.replace({
            query: { action: PH_ROUTES.DASHBOARD.CONSULTATIONS },
          })
        "
        >Book Session</UButton
      >
    </div>

    <UTable :rows="consultations" :columns="columns">
      <!-- <template #id-data="{ row }">
         {{ phHelpers.sliceWords(row.id, 10) }} 
       </template> -->

      <template #cost-data="{ row }">
        {{ row.cost }}
      </template>
      <template #last_session-data="{ row }">
        {{ phDates.formatDate(row.last_session) }}
      </template>

      <template #comments-data="{ row }">
        {{ phHelpers.sliceWords(row.comments, 24) }}
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { PH_ROUTES } from "~/constants/routes";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
  name: PH_ROUTES.DASHBOARD.CONSULTATIONS,
});

const router = useRouter();

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "doctor_name",
    label: "Doctors Name",
  },
  {
    key: "diagnosis",
    label: "Diagnosis",
  },
  {
    key: "prescribed_drugs",
    label: "Prescribed Drugs",
  },
  {
    key: "cost",
    label: "Cost",
  },
  {
    key: "last_session",
    label: "Last Session",
  },
  {
    key: "comments",
    label: "Comments",
  },
  {
    key: "action",
    label: "Action",
  },
];

const consultations = ref([
  {
    doctor_name: "Dr. James Markrel",
    diagnosis: "Diabetes",
    prescribed_drugs: "Metformin, Insulin",
    cost: 5600,
    total_session: 1,
    last_session: "2024-08-20T10:30:00Z",
    // next_session: '2024-09-15T09:00:00Z',
    comments:
      "Patient has been improving gradually. Blood sugar levels are stabilizing.",
  },
  {
    doctor_name: "Dr. James Markrel",
    diagnosis: "Diabetes",
    prescribed_drugs: "Metformin, Insulin",
    cost: 5500,
    total_session: 2,
    last_session: "2024-07-15T11:00:00Z",
    // next_session: '2024-08-20T09:00:00Z',
    comments:
      "Initial consultation, recommended lifestyle changes and medication.",
  },
  {
    doctor_name: "Dr. Anna Smith",
    diagnosis: "Hypertension",
    prescribed_drugs: "Amlodipine",
    cost: 3200,
    total_session: 1,
    last_session: "2024-06-25T14:00:00Z",
    // next_session: '2024-07-15T08:45:00Z',
    comments: "Blood pressure was high. Started on Amlodipine.",
  },
  {
    doctor_name: "Dr. Anna Smith",
    diagnosis: "Hypertension",
    prescribed_drugs: "Amlodipine, Losartan",
    cost: 3300,
    total_session: 2,
    last_session: "2024-05-20T10:30:00Z",
    // next_session: '2024-06-25T10:00:00Z',
    comments: "Follow-up visit. Blood pressure is now under control.",
  },
  {
    doctor_name: "Dr. David Johnson",
    diagnosis: "Asthma",
    prescribed_drugs: "Albuterol",
    cost: 4500,
    total_session: 1,
    last_session: "2024-04-10T09:30:00Z",
    // next_session: '2024-05-20T11:15:00Z',
    comments: "Patient has asthma. Prescribed an inhaler for emergency use.",
  },
  {
    doctor_name: "Dr. David Johnson",
    diagnosis: "Asthma",
    prescribed_drugs: "Albuterol, Fluticasone",
    cost: 4600,
    total_session: 2,
    last_session: "2024-03-01T08:45:00Z",
    // next_session: '2024-04-10T14:30:00Z',
    comments:
      "Patient shows good response to the inhaler. Added Fluticasone for long-term control.",
  },
  {
    doctor_name: "Dr. Emily Carter",
    diagnosis: "Allergies",
    prescribed_drugs: "Cetirizine",
    cost: 5000,
    total_session: 1,
    last_session: "2024-02-15T13:30:00Z",
    // next_session: '2024-03-01T13:45:00Z',
    comments: "Patient reports seasonal allergies. Started on Cetirizine.",
  },
  {
    doctor_name: "Dr. Emily Carter",
    diagnosis: "Allergies",
    prescribed_drugs: "Cetirizine, Montelukast",
    cost: 5100,
    total_session: 2,
    last_session: "2024-01-05T10:45:00Z",
    // next_session: '2024-02-15T10:15:00Z',
    comments:
      "Symptoms are reducing with treatment. Added Montelukast for better control.",
  },
  {
    doctor_name: "Dr. Sarah Nguyen",
    diagnosis: "Anemia",
    prescribed_drugs: "Ferrous Sulfate",
    cost: 4200,
    total_session: 1,
    last_session: "2023-12-01T09:00:00Z",
    // next_session: '2024-01-05T09:30:00Z',
    comments: "Low hemoglobin levels detected. Prescribed iron supplements.",
  },
  {
    doctor_name: "Dr. Sarah Nguyen",
    diagnosis: "Anemia",
    prescribed_drugs: "Ferrous Sulfate, Vitamin B12",
    cost: 4300,
    total_session: 2,
    last_session: "2023-11-15T11:30:00Z",
    // next_session: '2023-12-01T12:00:00Z',
    comments: "Hemoglobin levels are improving. Added Vitamin B12 supplements.",
  },
]);
</script>

<style scoped></style>
