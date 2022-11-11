const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");

const app = express();
const flightDetails = require('./flightDetails.json');
const fs = require('fs');

app.use(json());


app.use("/", routes);

// ****ADD/BOOK A FLIGHT**** 
app.post('/flightDetails', (req, res) => {
  
  flightDetails.push(req.body.newFlightDetail);

  let stringData = JSON.stringify(flightDetails, null, 2);
  fs.writeFile('flightDetails.json', stringData, (err) => {
    if(err) {
      return res.status(500).json({message: err})
    }
  })

  return res.status(200).json({message:"New flight booked"});
})

// ****GET ALL FLIGHTS****
app.get('/flightDetails', (req, res) => {

  return res.json({flightDetails})
})

// ****GET A SINGLE FLIGHT*****
app.get('/flightDetails/:id', (req, res) => {
  let id = req.params.id;
  let foundFightDetail = flightDetails.find(flightDetail => {
    return flightDetail.id == id
  })
  if(foundFightDetail) {
    return res.status(200).json({flightDetail: foundFightDetail})
  } else {
    res.status(404).json({message: "Flight details not found.."})
  }
})




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
