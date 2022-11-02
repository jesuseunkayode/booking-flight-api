const express = require("express");
const { json } = require("express");
// const flights = require("./controllers/flightController");
 const flights = require("./models/Flight");
// const routes = require("./routes/flightRoute");

const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

 // It fetches all the fligths available start here
app.get('/flights', (request, response) => response.json(flights))
 //All flights details ends here

 // Get single flight details from the client's request
app.get('/flights/:id', (request, response) => {
        let id = request.params.id
        let foundFlight = flights.find(flight => {
          return flight.id === parseInt(id)
        })
          if(foundFlight) {
            return response.status(200).json({Message: "Your flight id is found"})
          } else{
            return response.status(404).json({message: "Flight is not found"})
          }

          
         // fetch a single flight details from the client's request.
         // display error to client if erro occur from the server.
         // response.status(500)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
