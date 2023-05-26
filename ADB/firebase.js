import admin from "firebase-admin";
// Initialize Firebase Admin SDK with your credentials
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("./Credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// You are now connected to Firebase and can use its services
const db = admin.firestore();
export const messaging = admin.messaging();

export default db;
