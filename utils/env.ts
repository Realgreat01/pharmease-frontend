interface Env {
  SECURE_LS: string;
  API_URL: string;
  APPWRITE_ENPOINT: string;
  APPWRITE_PROJECT_ID: string;
}

export const ENV: Env = {
  SECURE_LS: import.meta.env.VITE_SECURE_LS,
  API_URL: import.meta.env.VITE_API_URL,
  APPWRITE_ENPOINT: import.meta.env.VITE_APPWRITE_ENPOINT,
  APPWRITE_PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
};
