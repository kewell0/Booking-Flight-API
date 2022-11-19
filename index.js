const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");

const app = express();



let flightDetails = [
  {
  id: 1,
  title: "flight to canada",
  time: "1pm",
  price: 26000,
  date: "26-06-2022"
}
]

app.use(json());


app.use("/", routes);

// ****ADD/BOOK A FLIGHT**** 
app.post('/flightDetails', (req, res) => {
  
  flightDetails.push(req.body);
  // console.log(req.body)
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

// *****UPDATE/EDIT FLIGHT*****
app.put('/flightDetails/:id', (req, res) => {
  flightDetails.findByIdAndUpdate(req.params.id, {
    time: req.body.time,
    date: req.body.date
  }, (err, flightDetail) => {
    if(err) {
      return res.status(500).json({message: err})
    } else if(!flightDetail) {
      return res.status(404).json({message: "Flight detail not found"})
    } else {
      flightDetail.save((err, updatedDetail) => {
        if(err) {
          return res.status(400).json({message: err})
        } else {
          return res.status(200).json({message: "Flight detail updated"})
        }
      }) 
    }
  })
});


// ******DELETE A FLIGHT********
app.delete('/flightDetails/:id', (req, res) => {
  const {id} = req.params;
 

  flightDetails = flightDetails.filter((flightDetail) => flightDetail.id !== id);
  
  return res.status(200).json({message:"flight deleted"});  
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
