import db, { messaging } from "./firebase.js";

export const sendMessage = async (aadhaarNumber, message) => {
  try {
    const querySnapshot = await db
      .collection("Users")
      .where("aadhar", "==", aadhaarNumber)
      .get();

    // Get the device token from the user's document
    const userDoc = querySnapshot.docs[0];
    const mobileNumber = userDoc.mobileNumber;
    const messagePayload = {
      notification: {
        title: "New Message",
        body: message,
      },
    };

    const response = await messaging.sendToDevice(mobileNumber, messagePayload);
    console.log("Message sent successfully:", response);
    console.log("Message sent successfully:", response);
  } catch (error) {
    console.log(error);
  }
};
