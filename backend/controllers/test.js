const { db } = require('../config/firebase.js')
const friends = {
  'james': 'friend',
  'larry': 'friend',
  'lucy': 'friend',
  'banana': 'enemy',
}


exports.getTest = async (req, res) => {
  const peopleRef = db.collection("people").doc("associates");
  const doc = await peopleRef.get();
  if (!doc.exists) {
    return res.sendStatus(400);
  }

  res.status(200).send(doc.data());
};
