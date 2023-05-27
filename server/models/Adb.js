import mongoose from "mongoose";

const voterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  aadhar: {
    type: String,
    index: true,
  },
  mobile: {
    type: String,
  },
});

const Voter = mongoose.models.Voter || mongoose.model("Voter", voterSchema);

export default Voter;
