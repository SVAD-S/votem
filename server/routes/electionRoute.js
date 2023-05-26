import { Router } from "express";
import parseurl from "parseurl";
import expressAsyncHandler from "express-async-handler";
import md5 from "md5";
import ElectionName from "../models/electionName.js";
import Admin from "../models/admin.js";

const electionRouter = Router();

electionRouter.get(
  "/electionName",
  expressAsyncHandler(async (req, res) => {
    try {
      const electionNames = [];
      const electionOrganizers = [];
      const electionIds = [];
      const final = [];
      const eachOne = await ElectionName.find({});
      for (let i = 0; i < eachOne.length; i++) {
        electionNames[i] = eachOne[i].election_name;
        electionOrganizers[i] = eachOne[i].election_organizer;
        electionIds[i] = eachOne[i].election_id;
        final.push({
          election_id: eachOne[i].election_id,
          election_organizer: eachOne[i].election_organizer,
          election_name: eachOne[i].election_name,
        });
      }
      res.send(final);
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching election data");
    }
  })
);

electionRouter.post(
  "/electionName",
  expressAsyncHandler(async (req, res) => {
    try {
      const election = await ElectionName.create({
        election_id: Math.floor(Math.random() * 100),
        election_name: req.body.election_name,
        election_organizer: req.body.election_organizer,
        election_password: md5(req.body.election_password),
      });
      res.json(election);
    } catch (error) {
      console.error(error);
      throw new Error("Error creating new election");
    }
  })
);

electionRouter.post(
  "/adminLogin",
  expressAsyncHandler(async (req, res) => {
    try {
      const election = await Admin.findOne({
        username: req.body.username,
        password: req.body.password,
      });
      if (election === null) {
        res.send(false);
      } else {
        res.send(true);
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error authenticating admin");
    }
  })
);

export default electionRouter;
