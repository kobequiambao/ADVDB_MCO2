const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Import routes
const node1Routes = require("./routes/node1");
const node2Routes = require("./routes/node2");
const node3Routes = require("./routes/node3");

// Use routes
app.use("/node1", node1Routes);
app.use("/node2", node2Routes);
app.use("/node3", node3Routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
