const express = require("express");
try {
  require("dotenv").config();
} catch {
  console.log("dotenv skipped");
}
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const fetch = require("node-fetch");

app.get("/", async (req, res) => {
  res.status(400).json("Contact OmarQurashi868@gmail.com or Psycho#0211");
});

app.get("/fetchData", async (req, res) => {
  const username = req.params.username;
  const platform = req.params.platform;

  // Init vars for later use
  let ticket,
    sessionId = "";

  // Check db for existing keys
  const query = new Parse.Query("keys");
  const result = await query.find({ useMasterKey: true });

  if (result.length == 0) {
    try {
      // get new keys from api
      const response = await fetch(process.env.URL_TICKET_GEN, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.UBI_AUTH,
          "Ubi-AppId": process.env.UBI_APPID,
          "Ubi-RequestedPlatformType": "uplay",
        },
      });

      const responseObj = await response.text();

      const resTicket = responseObj.ticket;
      const resSessionId = responseObj.sessionId;

      // Save keys to db
      const keys = new Parse.Object("keys");
      keys.set("ticket", resTicket);
      keys.set("sessionId", resSessionId);
      try {
        await keys.save();
        // Set vars to new keys
        ticket = resTicket;
        sessionId = resSessionId;
      } catch (error) {
        res.status(400).json({ error: error });
      }
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
});

// TODO: Get profileid

// TODO: Get userdata

app.listen("6000", () =>
  console.log(`Server is listening to port ${process.env.PORT}...`)
);
