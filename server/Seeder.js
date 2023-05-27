import connectDB from "./config/db.js";
import Voter from "./models/Adb.js";
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

connectDB();

const exportData = async () => {
  try {
    const voters = await Voter.insertMany(mockData);
    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(`Error on importing ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Voter.deleteMany({});
    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.log(`Error on importing ${error.message}`);
  }
};

if (process.argv[2] === "-d") destroyData();
else exportData();
