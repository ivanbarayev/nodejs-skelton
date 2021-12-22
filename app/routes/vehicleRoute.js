const express=require('express')
const vehicleController=require("../controllers/vehicleController")

const router =express.Router()


router.route("/").get(vehicleController.getVehicles)


module.exports=router