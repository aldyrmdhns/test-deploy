if (process.envNODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const moment = require("moment-timezone");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/test", (req, res) => {
	res.send("Now I try the action and it should be fine! ...try number what now?? another one now. ...it should be really fine now");
});

app.get("/flight", async (req, res) => {
	try {
		const flights = await prisma.flights.findMany();

		const timeZone = "Asia/Jakarta";
		const updatedFlights = flights.map((flight) => {
			const departureTimeConvert = moment
				.utc(flight.departureTime)
				.tz(timeZone)
				.format("YYYY-MM-DD HH:mm:ss");
			const arrivalTimeConvert = moment
				.utc(flight.arrivalTime)
				.tz(timeZone)
				.format("YYYY-MM-DD HH:mm:ss");

			return {
				...flight,
				departureTime: departureTimeConvert,
				arrivalTime: arrivalTimeConvert,
			};
		});

		res.status(200).json({ updatedFlights });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

app.listen(PORT, () => {
	console.log(`-> Listening on port: ${PORT}`);
});
