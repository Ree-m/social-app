const { db } = require("../config/firebase.js");
const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN
const verifySid = process.env.VERIFYSID;
console.log("checking env",process.env.ACCOUNTSID)
const client = twilio(accountSid, authToken, {
  layzLoading: true,
});

exports.createNewAccessCode = async (req, res) => {
  const { phoneNumber } = req.body;
  const phoneNumberString = phoneNumber.toString();
  try {
    const usersRef = db.collection("users").doc(phoneNumberString);
    const addAccessCode = await usersRef.set(
      {
        accessCode: "",
      },
      { merge: true }
    );
    const response = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: `+${phoneNumber}`, channel: "sms" })
      .then((verification) =>
        console.log("verification-status", verification.status, verification)
      );
    console.log("SMS sent:", response);
    res
      .status(200)
      .json({ message: `SMS sent successfully:${JSON.stringify(response)} ` });
  } catch (error) {
    console.error("Error sending code:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.validateAccessCode = async (req, res) => {
  const { phoneNumber, accessCode } = await req.body;
  const phoneNumberString = phoneNumber.toString();

  try {
    const response = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: `+${phoneNumber}`, code: accessCode })
      .then((verification_check) =>
        console.log("verification-status", verification_check.status)
      );
    const usersRef = db.collection("users").doc(phoneNumberString);

    const addAccessCode = await usersRef.update({
      accessCode: accessCode,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error verifying code:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.success=(req, res) => {

  const sessions = req.sessionStore.sessions;
  const sessionKeys = Object.keys(sessions);
  console.log("success", req.sessionStore);

  if (sessionKeys.length > 0) {
    // Get the last session ID
    const lastSessionID = sessionKeys[sessionKeys.length - 1];

    // Parse the session data for the last session
    const lastSessionData = JSON.parse(sessions[lastSessionID]);

    // Extract the access token from the last session data
    const {
      passport: {
        user: { accessToken },
      },
    } = lastSessionData;

    // accessToken from the last session
    console.log("Access Token:", accessToken);
    return res.json({accessToken})
  } else {
    console.error("No sessions found");
    return res.status(401).json({ error: "Session data not found" });
  }
}

exports.fail=async(req,res)=>{
  console.log("fail");
  return res.json("Failed attempt");


}