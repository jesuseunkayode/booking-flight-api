const express = require("express");
const app = express();
const router = require("./routes/flightRoute.js");

app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
