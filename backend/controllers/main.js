const { db } = require("../config/firebase.js");
const twilio = require("twilio");

const accountSid = "ACe113790b39878094cd6b60b21566a210";
const authToken = "0d3462758f065bbe8a7014650e250336";
const verifySid = "VA1f36692a9ca773f7ddf8235e9357351b";

const client = twilio(accountSid, authToken, {
  layzLoading: true,
});

// function generateAccessCode() {
//   const min = 100000;
//   const max = 999999;
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// exports.createNewAccessCode = async (req, res) => {
//   try {
//     const { phoneNumber } = await req.body;
//     const accessCode = generateAccessCode();

//     console.log("body", req.body);
//     const usersRef = db.collection("users").doc(phoneNumber);
//     const response = await usersRef.set(
//       {
//         accessCode: accessCode,
//       },
//       { merge: true }
//     );
//     res.status(200).send({ accessCode: accessCode });
//   } catch (error) {
//     console.error("Error creating access code:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.validateAccessCode = async (req, res) => {
//   try {
//     const { phoneNumber, accessCode } = await req.body;

//     console.log("body", req.body);
//     const usersRef = db.collection("users").doc(phoneNumber);
//     const usersSnapShot = await usersRef.get();
//     console.log("usersSnapShot", usersSnapShot.exists, usersSnapShot.data());

//     if (
//       usersSnapShot.exists &&
//       usersSnapShot.data().accessCode === accessCode
//     ) {
//       await usersRef.update({
//         accessCode: "",
//       });
//       return res.status(200).json({ success: "true" });
//     } else {
//       return res
//         .status(400)
//         .json({ success: "false", error: "Invalid access code" });
//     }
//   } catch (error) {
//     console.error("Error validating access code:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

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
