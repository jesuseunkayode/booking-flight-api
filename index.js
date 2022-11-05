const express = require("express");
const {json} = require("express");
const flights = require("./models/flight");
const fs = require("fs");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 // It fetches all the flights available start here
app.get('/flights', (request, response) => response.json(flights))
 //Fetch all flights available details ends here

 //Get single flight details from the client's request
app.get('/flights/:id', (request, response) => {
   const found = flights.some(flight => flight.id === parseInt(request.params.id));

   if(found) {
     response.json(flights.filter(flight => {
      return flight.id === parseInt(request.params.id)
     }))
   }   else {
     response.status(400).json();
   }
})
  
 // Creat new flight
app.post('/flights', (request, response) => {
    const newFlight = {
      id:  request.body.id,
      title: request.body.title,
      time: request.body.time,
      price: 34000,
      date: request.body.date
    }
    flights.push(newFlight);
    let stringed = JSON.stringify(flights);
    fs.appendFile("./models/flight.js", stringed, (err) => {
      if(err) {
        return response.status(500).json({message: err});
      }
    })
       // return response.json(flights);
       return response.status(200).json({message: "new"});
});

    // update flight
app.put('/flights/:id', (request, response) => {
  const found = flights.some(flight => flight.id === parseInt(request.params.id));
  if (found) {
    const updateFlight = request.body;
    flights.forEach(flight => {
      if(flight.id === parseInt(request.params.id)) {
         flight.title = updateFlight.title
         flight.date = updateFlight.date
         flight.time = updateFlight.time
         response.json({msg: 'flight updated', flight});
      }
    })
  } else {
    response.status(400).json({msg: `No flight with id of ${request.params.id}`})
  } 
})

//Delete flight 
app.delete('/flights/:id', (request, response) => {
  const found = flights.some(flight => flight.id === parseInt(request.params.id));

  if(found) {
    response.json( flights.filter(flight => {
      return flight.id !== parseInt(request.params.id)
    }))
  }   else {
    response.status(400).json({msg: `No flight with the Id ${request.params.id}`});
  }
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
