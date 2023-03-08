// const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const serverless = require("serverless-http");
require("dotenv").config();
// const router = require("./routes/index");

// const prisma = new PrismaClient();
const PORT = process.env.PORT;

const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// app.use(`/.netlify/functions/api`, router);
// app.use("/api", router);
app.get("/", (req, res) => {
	res.status(200).json({
		hello: "world",
	});
});
app.use(function (err, req, res, next) {
	if (process.env.NODE_ENV !== "test") console.error(err.stack);
	res.status(err.status || 500).send(err.message || "Internal server error");
});
console.log(PORT);
app.listen(PORT, () =>
	console.log(`Server running at http://localhost:${PORT}`)
);

module.exports = app;
// module.exports = { app, prisma };
module.exports.handler = serverless(app);
