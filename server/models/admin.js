import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
