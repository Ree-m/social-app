const express =require("express")
const app=express()
const router =express.Router()
const testContoller =require("../controllers/test")
const mainController =require("../controllers/main")

router.get("/test",testContoller.getTest)

// access codes
router.post("/createNewAccessCode",mainController.createNewAccessCode)
router.post("/validateAccessCode",mainController.validateAccessCode)
// router.post("/sendAccessCode",mainController.sendAccessCode)
// router.post("/verify",mainController.verify)

module.exports=router