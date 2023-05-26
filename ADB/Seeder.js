import { v4 as uuidv4 } from "uuid";
import db from "./firebase.js";

function generateRandomAadhar() {
  const aadharNumber = Math.floor(100000000000 + Math.random() * 900000000000);
  return String(aadharNumber);
}

const mockData = [
  {
    name: "John Doe",
    email: "hello.aravindks@gmail.com",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "Jane Smith",
    email: "hello.aravindks@gmail.com",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "Alice Johnson",
    email: "hello.aravindks@gmail.com",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "Bob Williams",
    email: "hello.aravindks@gmail.com",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "Sarah Brown",
    email: "hello.aravindks@gmail.com",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "David Davis",
    email: "hello.aravindks@gmail.com",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "Emma Wilson",
    email: "hello.aravindks@gmail.com",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "Michael Lee",
    email: "hello.aravindks@gmail.com",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "Olivia Anderson",
    email: "hello.aravindks@gmail.com",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "William Clark",
    email: "hello.aravindks@gmail.com",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "Sophia Lewis",
    email: "hello.aravindks@gmail.com",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "Daniel Turner",
    email: "hello.aravindks@gmail.com",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "Ava Garcia",
    email: "pkd19cs013@gecskp.ac.in",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "James Rodriguez",
    email: "pkd19cs013@gecskp.ac.in",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "Mia Thompson",
    email: "pkd19cs013@gecskp.ac.in",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "Benjamin White",
    email: "pkd19cs013@gecskp.ac.in",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
  {
    name: "Charlotte Hill",
    email: "pkd19cs013@gecskp.ac.in",
    mobile: "9746281997",
    aadhar: generateRandomAadhar(),
  },
];
const exportData = async () => {
  for (const data of mockData) {
    try {
      const docRef = await db.collection("Users").doc(uuidv4()).set(data);
      console.log("Document written with ID: ", docRef);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
};

const deleteAllData = async () => {
  try {
    const querySnapshot = await db.collection("Users").get();

    querySnapshot.forEach(async (doc) => {
      await doc.ref.delete();
      console.log("Document deleted with ID: ", doc.id);
    });
  } catch (error) {
    console.error("Error deleting documents: ", error);
  }
};

if (process.argv[2] === "-d") deleteAllData();
else exportData();
