const express = require("express");
const app = express();
const router = express.Router();
const testContoller = require("../controllers/test");
const mainController = require("../controllers/main");
const passport = require("passport");
const { db } = require("../config/firebase");

router.get("/test", testContoller.getTest);

router.post("/createNewAccessCode", mainController.createNewAccessCode);
router.post("/validateAccessCode", mainController.validateAccessCode);

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/success",
    failureRedirect: "/fail",
  })
);

router.get("/fail", mainController.fail);

router.get("/success",mainController.success );

module.exports = router;
