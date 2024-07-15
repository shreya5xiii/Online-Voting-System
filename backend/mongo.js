import { MongoClient, ServerApiVersion } from "mongodb";

const uri = ""; //mongo db url 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

class Mongo {
  static async adminSignup(data) {
    try {
      await client.connect();
      console.log("connecting");
      const db = client.db("VotingSystemSignup");
      const col = db.collection("AdminSignup");
      const doc = {
        adminname: data.adminname,
        adminEmail: data.adminEmail,
        adminPassword: data.adminPassword,
      };
      const existingDoc = await col.findOne(doc);
      if (existingDoc) {
        console.log("already registered ");
      } else {
        const result = await col.insertOne(doc);
        console.log(
          `A document was inserted with the _id: ${result.insertedId}`
        );
        return result;
      }
    } catch (e) {
      return e;
    } finally {
      await client.close();
    }
  }

  //to get data for admin login
  static async getAllsignup(adminEmail) {
    try {
      await client.connect();
      const db = client.db("VotingSystemSignup");
      const col = db.collection("AdminSignup");
      const formData = await col.find({ adminEmail: adminEmail }).toArray();
      console.log(formData);
      return formData;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  //to get all election
  static async ShowAllElection(dbName) {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection("Election");
      const formData = await col.find({}).toArray();
      console.log(formData);
      return formData;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  // Add election function
  static async addElection(data) {
    try {
      await client.connect();
      console.log("connecting");
      const db = client.db(data.dbName);
      const col = db.collection("Election");
      const doc = {
        electionId: data.electionId,
        electionTitle: data.electionTitle,
        electionStartDate: data.electionStartDate,
        electionEndDate: "",
        electionWinner: "",
      };
      const existingDoc = await col.findOne({ electionId: data.electionId });
      if (existingDoc) {
        console.log("already registered");
        return "already exists";
      } else {
        const result = await col.insertOne(doc);
        console.log(
          `A document was inserted with the _id: ${result.insertedId}`
        );
        return result;
      }
    } catch (e) {
      return e;
    } finally {
      await client.close();
    }
  }

  //  update election
  static async updateElection(data) {
    try {
      await client.connect();
      const db = client.db(data.dbName);
      const col = db.collection("Election");
      const filter = { electionId: data.realElectionId };
      const update = {
        $set: {
          electionId: data.electionId,
          electionTitle: data.electionTitle,
          electionStartDate: data.electionStartDate,
        },
      };
      const result = await col.updateOne(filter, update);
      if (result.modifiedCount === 1) {
        console.log("Document updated successfully");
        return result;
      } else {
        console.log("Document not found or not updated");
      }
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  //to delete election
  static async deleteElection(data) {
    try {
      await client.connect();
      const db = client.db(data.dbName);
      const col = db.collection("Election");
      const col2 = db.collection(data.electionId);

      await col2.drop();
      const result = await col.deleteOne({ electionId: data.electionId });
      const col3 = db.collection("voter");
      await col3.deleteMany({ electionId: data.electionId });
      const col4 = db.collection("ElectionHistory");
      await col4.deleteOne({ electionId: data.electionId });

      if (result.deletedCount === 1) {
        console.log("Document deleted successfully");
        return result;
      } else {
        console.log("Document not found or not deleted");
      }
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  //show all "not ended/not currently running" elections for "before comp of add candidate"
  static async ShowAllElectionExceptEnded(dbName) {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection("Election");
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const formData = await col
        .find({
          electionEndDate: "",
          electionStartDate: { $gt: formattedDate },
        })
        .toArray();
      console.log(formData);
      return formData;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  //to get all candidate
  static async ShowAllCandidate(data) {
    try {
      await client.connect();
      const db = client.db(data.dbName);
      const col = db.collection(data.collectionNameOnElectionId);
      const formData = await col.find({}).toArray();
      console.log(formData);
      return formData;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  // Add candidate function
  static async addCandidate(data) {
    try {
      await client.connect();
      console.log("connecting");
      const db = client.db(data.dbName);
      const col = db.collection(data.collectionNameOnElectionId);
      const doc = {
        candidateId: data.candidateId,
        candidateName: data.candidateName,
        candidateAge: data.candidateAge,
        candidateVote: 0,
        candidateEmail: data.candidateEmail,
        electionTitle: data.electionTitle,
      };
      const existingDoc = await col.findOne({
        $or: [
          { candidateId: data.candidateId },
          { candidateEmail: data.candidateEmail },
        ],
      });
      if (existingDoc) {
        console.log("already registered");
        return "already exists";
      } else {
        const result = await col.insertOne(doc);
        console.log(
          `A document was inserted with the _id: ${result.insertedId}`
        );
        return result;
      }
    } catch (e) {
      return e;
    } finally {
      await client.close();
    }
  }

  //  ie. to update candidate
  static async updateCandidate(data) {
    try {
      await client.connect();
      const db = client.db(data.dbName);
      const col = db.collection(data.collectionNameOnElectionId);
      const filter = { candidateId: data.realCandidateId };
      const update = {
        $set: {
          candidateId: data.candidateId,
          candidateName: data.candidateName,
          candidateAge: data.candidateAge,
          candidateEmail: data.candidateEmail,
        },
      };
      const result = await col.updateOne(filter, update);
      if (result.modifiedCount === 1) {
        console.log("Document updated successfully");
        return result;
      } else {
        console.log("Document not found or not updated");
      }
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }
  //to delete candidate
  static async deleteCandidate(data) {
    try {
      await client.connect();
      const db = client.db(data.dbName);
      const col = db.collection(data.collectionNameOnElectionId);
      const result = await col.deleteOne({ candidateId: data.candidateId });
      if (result.deletedCount === 1) {
        console.log("Document deleted successfully");
        return result;
      } else {
        console.log("Document not found or not deleted");
      }
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  //show all election "currently running elections only" for "before comp of declare result"
  static async ShowElectionForDeclareResult(dbName) {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection("Election");
      const col2 = db.collection("voter");
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      const formData = await col
        .find({
          electionEndDate: "",
          electionStartDate: { $lte: formattedDate },
        })
        .toArray();

      for (let election of formData) {
        const voterCount = await col2.countDocuments({
          electionId: election.electionId,
        });
        election.voterCount = voterCount;
      }
      console.log(formData);
      return formData;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  //to show winner list
  static async WinnerList(data) {
    try {
      await client.connect();
      const db = client.db(data.dbName);
      const col = db.collection(data.colName);
      const formData = await col.find({}).toArray();
      // case 1 --sort the list for max vote
      const sortedFormData = formData.sort(
        (a, b) => b.candidateVote - a.candidateVote
      );
      //case2  --make array of winner and in "election" collection update election with winner array and end date
      const maxVotes = sortedFormData[0].candidateVote;
      const winners = sortedFormData
        .filter((candidate) => candidate.candidateVote === maxVotes)
        .map((candidate) => ({
          candidateId: candidate.candidateId,
          candidateName: candidate.candidateName,
          candidateEmail: candidate.candidateEmail,
        }));
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      const col2 = db.collection("Election");
      const filter = { electionId: data.colName };
      const update = {
        $set: {
          electionEndDate: formattedDate,
          electionWinner: winners,
        },
      };

      const result = await col2.updateOne(filter, update);
      //case 3 --  add election in "electionhistory" collection
      const col3 = db.collection("ElectionHistory");
      await col3.insertOne({
        electionId: data.colName,
        electionTitle: data.electionTitle,
        electionStartDate: data.electionStartDate,
        electionEndDate: formattedDate,
        winner: winners,
      });
      //end
      return sortedFormData;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  //to get all election "only ended elections" for "before comp of history"
  static async ShowElectionForHistory(dbName) {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection("ElectionHistory");
      const formData = await col.find({}).toArray();

      return formData;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  //winner list for history i.e only show winner like above winner list ,dont do case 2,case 3
  static async WinnerListForHistory(data) {
    try {
      await client.connect();
      const db = client.db(data.dbName);
      const col = db.collection(data.colName);
      const formData = await col.find({}).toArray();
      const sortedFormData = formData.sort(
        (a, b) => b.candidateVote - a.candidateVote
      );
      return sortedFormData;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  //voter signup
  static async voterSignup(data) {
    try {
      await client.connect();
      console.log("connecting");
      const db = client.db("VotingSystemSignup");
      const col = db.collection("VoterSignup");
      const doc = {
        votername: data.votername,
        voterEmail: data.voterEmail,
        voterPassword: data.voterPassword,
      };
      const existingDoc = await col.findOne(doc);
      if (existingDoc) {
        console.log("already registered ");
      } else {
        const result = await col.insertOne(doc);
        console.log(
          `A document was inserted with the _id: ${result.insertedId}`
        );
        return result;
      }
    } catch (e) {
      return e;
    } finally {
      await client.close();
    }
  }

  //to get login email of voter
  static async voterLogin(voterEmail) {
    try {
      await client.connect();
      const db = client.db("VotingSystemSignup");
      const col = db.collection("VoterSignup");
      const formData = await col.find({ voterEmail: voterEmail }).toArray();
      console.log(formData);
      return formData;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  //to get admin name from voter also check status of election for window alert
  static async getAdminForVoter(data) {
    try {
      await client.connect();
      const db = client.db("VotingSystemSignup");
      const col = db.collection("AdminSignup");
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      const formData = await col
        .find({ adminEmail: data.adminEmail })
        .toArray();

      if (formData.length === 0) {
        return "Admin not exist";
      } else {
        const db2 = client.db(formData[0]._id.toString());
        const col2 = db2.collection("Election");
        const formData2 = await col2
          .find({ electionId: data.electionId })
          .toArray();
        if (formData2.length === 0) {
          return ["Election not exist"];
        } else if (formattedDate < formData2[0].electionStartDate) {
          return ["Election not started yet"];
        } else if (formData2[0].electionEndDate != "") {
          return ["Election has been Ended", formData];
        } else {
          const col3 = db2.collection("voter");
          const formData3 = await col3
            .find({ voterEmail: data.voterEmail, electionId: data.electionId })
            .toArray();
          if (formData3.length > 0) {
            return ["You have already voted"];
          } else {
            return formData;
          }
        }
      }
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  //  to increase vote by 1
  static async increaseVote(data) {
    try {
      await client.connect();
      const db = client.db(data.databasename);
      const col = db.collection(data.colName);
      const filter = { candidateId: data.candidateId };
      const update = {
        $inc: {
          candidateVote: 1,
        },
      };
      const result = await col.updateOne(filter, update);
      if (result.modifiedCount === 1) {
        const col2 = db.collection("voter");
        const doc = {
          votername: data.votername,
          voterEmail: data.voterEmail,
          electionId: data.colName,
          selectedCandidateId: data.candidateId,
        };
        const result2 = await col2.insertOne(doc);
        console.log("Document updated successfully");
        return result2;
      } else {
        console.log("Document not found or not updated");
      }
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }
}

export default Mongo;
