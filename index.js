const express = require("express");
const PORT = process.env.PORT || 4500;
const app = express();

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res, next) => {
    res.json({ message: "Hello from servdsder!" });
});
app.use("/api/cakes", require("./src/routes/api/cakes"));

app.use(function(req, res){
    res.status(404);
});
  
