const flights = require("../models/flight.js");
const fs = require("fs");

const getAllFlights = (request, response) => {
     response.json(flights);
}

const getSingleFlight = (request, response) => {
    const found = flights.some(flight => flight.id === parseInt(request.params.id));
 
    if(found) {
      response.json(flights.filter(flight => {
       return flight.id === parseInt(request.params.id)
      }))
    }   else {
      response.status(400).json();
    }
 }


 const createNewFlight = (request, response) => {
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
       return response.status(200).json({message: "new"});
}

const updateFlight = (request, response) => {
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
  }

  const deleteFlight = (request, response) => {
    const found = flights.some(flight => flight.id === parseInt(request.params.id));
  
    if(found) {
      response.json( flights.filter(flight => {
        return flight.id !== parseInt(request.params.id)
      }))
    }   else {
      response.status(400).json({msg: `No flight with the Id ${request.params.id}`});
    }
  }



module.exports = {
    getAllFlights,
    getSingleFlight,
    createNewFlight,
    updateFlight,
    deleteFlight
}