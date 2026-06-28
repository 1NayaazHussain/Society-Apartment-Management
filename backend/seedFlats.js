require("dotenv").config();
const mongoose = require("mongoose");
const Flat = require("./models/Flat");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

const flats = [];

const blocks = ["A", "B", "C", "D", "E"];

blocks.forEach((block, index) => {

    const floor = index + 1;

    for (let i = 1; i <= 6; i++) {

        flats.push({
            flatNo: `${block}-${floor}0${i}`,
            occupied: false
        });

    }
});

const seedFlats = async () => {

    try {

        await Flat.deleteMany();

        await Flat.insertMany(flats);

        console.log("Flats Added Successfully");

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);

    }
};

seedFlats();