const express = require("express");
const { API_PORT } = require("./utils/config");

const app = express();

const starShipsRoutes = require("./routes/starships");
const speciesRoutes = require("./routes/species");
const planetsRoutes = require("./routes/planets");

const port = process.env.PORT || API_PORT;

app.use("/api/starships", starShipsRoutes);
app.use("/api/species", speciesRoutes);
app.use("/api/planets", planetsRoutes);

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
