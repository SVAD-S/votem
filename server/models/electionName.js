import mongoose from "mongoose";

const ElectionNameSchema = new mongoose.Schema({
  election_id: {
    type: Number,
  },
  election_name: {
    type: String,
  },
  election_organizer: {
    type: String,
  },
  election_password: {
    type: String,
  },
});

const ElectionName =
  mongoose.models.electionlists ||
  mongoose.model("electionlists", ElectionNameSchema);

export default ElectionName;
