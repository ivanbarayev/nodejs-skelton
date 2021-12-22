const express = require("express");
const app = express();
const vehicleRoute =require("./app/routes/vehicleRoute")

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}))

app.listen("3000", function (req, res) {
  console.log(`server starterd on ${PORT}`);
});


app.use("/vehicles",vehicleRoute)
