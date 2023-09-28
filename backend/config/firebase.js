// Import the functions you need from the SDKs you need
const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const creds =require("../creds.json")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


initializeApp({
  credential: cert(creds)
})

const db = getFirestore()

module.exports = { db }
