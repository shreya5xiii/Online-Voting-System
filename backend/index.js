import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Mongo from "./mongo.js";
const app = express();
const port = 8000;
app.use(cors());
app.use(bodyParser.json());

//save data of admin signup
app.post("/adminSignup", async (req, res) => {
  const data = req.body;
  if (data.adminname && data.adminEmail && data.adminPassword) {
    try {
      const result = await Mongo.adminSignup(data);
      console.log("Form data saved successfully:", result);
      res.status(201).json({ info: "success", data: result.insertedId });
    } catch (error) {
      console.error("Error saving form data:", error);
      res
        .status(500)
        .json({ info: "error", message: "Failed to save form data" });
    }
  } else {
    res
      .status(401)
      .json({ info: "error", message: "Please provide all details" });
  }
});

//to get data for admin login
app.get("/adminLogin", async (req, res) => {
  const { adminEmail } = req.query;
  try {
    const formData = await Mongo.getAllsignup(adminEmail);
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res
      .status(500)
      .json({ info: "error", message: "Failed to fetch form data" });
  }
});

//show all election
app.get("/ShowAllElection", async (req, res) => {
  const { dbName } = req.query;
  try {
    const formData = await Mongo.ShowAllElection(dbName);
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res
      .status(500)
      .json({ info: "error", message: "Failed to fetch form data" });
  }
});

//add election form
app.post("/addElection", async (req, res) => {
  const data = req.body;
  if (data.electionId && data.electionTitle && data.electionStartDate) {
    try {
      const result = await Mongo.addElection(data);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error saving form data:", error);
      res
        .status(500)
        .json({ info: "error", message: "Failed to save form data" });
    }
  } else {
    res
      .status(401)
      .json({ info: "error", message: "Please provide all details" });
  }
});

//to update election
app.post("/updateElection", async (req, res) => {
  const data = req.body;
  console.log(data);
  if (data.electionId && data.electionTitle && data.electionStartDate) {
    try {
      const result = await Mongo.updateElection(data);
      console.log("Form data saved successfully:", result);
      res.status(201).json({ info: "success", data: result.insertedId });
    } catch (error) {
      console.error("Error saving form data:", error);
      res
        .status(500)
        .json({ info: "error", message: "Failed to save form data" });
    }
  } else {
    res
      .status(401)
      .json({ info: "error", message: "Please provide all details" });
  }
});

//to delete  election
app.get("/deleteElection", async (req, res) => {
  const data = req.query;
  console.log(data);
  try {
    const formData = await Mongo.deleteElection(data);
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res
      .status(500)
      .json({ info: "error", message: "Failed to fetch form data" });
  }
});

//show all "not ended/not currently running" elections for "before comp of add candidate"
app.get("/ShowAllElectionExceptEnded", async (req, res) => {
  const { dbName } = req.query;
  try {
    const formData = await Mongo.ShowAllElectionExceptEnded(dbName);
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res
      .status(500)
      .json({ info: "error", message: "Failed to fetch form data" });
  }
});

//show all candidate
app.get("/ShowAllCandidate", async (req, res) => {
  const data = req.query;

  try {
    const formData = await Mongo.ShowAllCandidate(data);
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res
      .status(500)
      .json({ info: "error", message: "Failed to fetch form data" });
  }
});

//add candidate form
app.post("/addCandidate", async (req, res) => {
  const data = req.body;
  if (
    data.candidateId &&
    data.candidateName &&
    data.candidateAge &&
    data.candidateEmail
  ) {
    try {
      const result = await Mongo.addCandidate(data);
      console.log("Form data saved successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error saving form data:", error);
      res
        .status(500)
        .json({ info: "error", message: "Failed to save form data" });
    }
  } else {
    res
      .status(401)
      .json({ info: "error", message: "Please provide all details" });
  }
});

//to update candidate
app.post("/updateCandidate", async (req, res) => {
  const data = req.body;
  console.log(data);
  if (
    data.candidateId &&
    data.candidateName &&
    data.candidateAge &&
    data.candidateEmail
  ) {
    try {
      const result = await Mongo.updateCandidate(data);
      console.log("Form data saved successfully:", result);
      res.status(201).json({ info: "success", data: result });
    } catch (error) {
      console.error("Error saving form data:", error);
      res
        .status(500)
        .json({ info: "error", message: "Failed to save form data" });
    }
  } else {
    res
      .status(401)
      .json({ info: "error", message: "Please provide all details" });
  }
});

//to delete  candidate
app.get("/deleteCandidate", async (req, res) => {
  const data = req.query;
  console.log(data);
  try {
    const formData = await Mongo.deleteCandidate(data);
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res
      .status(500)
      .json({ info: "error", message: "Failed to fetch form data" });
  }
});

//show all election "currently running elections only" for "before comp of declare result"
app.get("/ShowElectionForDeclareResult", async (req, res) => {
  const { dbName } = req.query;
  try {
    const formData = await Mongo.ShowElectionForDeclareResult(dbName);
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res
      .status(500)
      .json({ info: "error", message: "Failed to fetch form data" });
  }
});

//calculate and show all votes for winner list
app.get("/WinnerList", async (req, res) => {
  const data = req.query;
  try {
    const formData = await Mongo.WinnerList(data);
    console.log("iiiii", formData);
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res
      .status(500)
      .json({ info: "error", message: "Failed to fetch form data" });
  }
});

//show all election "only ended elections" for "before comp of history"
app.get("/ShowElectionForHistory", async (req, res) => {
  const { dbName } = req.query;
  try {
    const formData = await Mongo.ShowElectionForHistory(dbName);
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res
      .status(500)
      .json({ info: "error", message: "Failed to fetch form data" });
  }
});

//winner list for history
app.get("/WinnerListForHistory", async (req, res) => {
  const data = req.query;
  try {
    const formData = await Mongo.WinnerListForHistory(data);
    console.log("iiiii", formData);
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res
      .status(500)
      .json({ info: "error", message: "Failed to fetch form data" });
  }
});

//voter signup
app.post("/voterSignup", async (req, res) => {
  const data = req.body;
  if (data.votername && data.voterEmail && data.voterPassword) {
    try {
      const result = await Mongo.voterSignup(data);
      console.log("Form data saved successfully:", result);
      res.status(201).json({ info: "success", data: result.insertedId });
    } catch (error) {
      console.error("Error saving form data:", error);
      res
        .status(500)
        .json({ info: "error", message: "Failed to save form data" });
    }
  } else {
    res
      .status(401)
      .json({ info: "error", message: "Please provide all details" });
  }
});

//to get data for voter login
app.get("/voterLogin", async (req, res) => {
  const { voterEmail } = req.query;
  try {
    const formData = await Mongo.voterLogin(voterEmail);
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res
      .status(500)
      .json({ info: "error", message: "Failed to fetch form data" });
  }
});

//to get admin name for voter
app.get("/getAdminForVoter", async (req, res) => {
  const data = req.query;
  try {
    const formData = await Mongo.getAdminForVoter(data);
    console.log("iiiii", formData);
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res
      .status(500)
      .json({ info: "error", message: "Failed to fetch form data" });
  }
});

//to increment vote after voting by any voter
app.post("/increaseVote", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const result = await Mongo.increaseVote(data);
    console.log("Form data saved successfully:", result);
    res.status(201).json({ info: "success", data: result });
  } catch (error) {
    console.error("Error saving form data:", error);
    res
      .status(500)
      .json({ info: "error", message: "Failed to save form data" });
  }
});

app.listen(port, () => {
  console.log("app is running at", port);
});
