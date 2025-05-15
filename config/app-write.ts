import { Client } from "appwrite";

const client = new Client();

client
  .setEndpoint(ENV.APPWRITE_ENPOINT) // Your API Endpoint
  .setProject("6825a7600034c11d45f6");

export { client as AppWriteClient };
