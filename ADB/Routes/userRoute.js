import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import db from "../firebase.js";

const userRouter = Router();

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const id = req.params.id;

      const querySnapshot = await db
        .collection("Users")
        .where("aadhar", "==", id)
        .get();
      if (!querySnapshot?.docs[0]?.data())
        res.status(404).json({
          message: "No user found",
        });
      // Get the device token from the user's document
      const userDoc = querySnapshot.docs[0].data();

      if (userDoc)
        res.json({
          data: userDoc,
        });
    } catch (error) {
      throw new Error(error.message ? error.message : "Internal server error");
    }
  })
);

export default userRouter;
