const express = require("express");

const app = express();

// Set the limit to 5 megabytes (adjust as needed)
app.use(express.json({ limit: "5mb" }));

// ... Your other middleware and route handling ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
