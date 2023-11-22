const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Student = require("./models/student");
const catchAsyncError = require("./middleware/catchAsyncError");
const errorMiddleware = require("./middleware/error");

const app = express();



const MongoDbUrl = 'mongodb://127.0.0.1:27017/studentPortal';

main().catch(err => console.log(`Mongo ERROR, ${err}`));
async function main() {
    await mongoose.connect(MongoDbUrl);
    console.log("MONGO CONNECTION OPEN!!")
}
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.engine('ejs', ejsMate);


app.get("/", catchAsyncError(async (req, res) => {
    const showAllStudents = await Student.find({});
    res.render("student/show", { showAllStudents })
}))


app.get("/:key", async (req, res) => {
    const findStudent = await Student.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { techStack: { $regex: req.params.key } },
            { bio: { $regex: req.params.key } },
        ]
    })
    res.json(findStudent);
})

app.put("/edit/:id", async (req, res) => {
    try {
        const foundUser = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        await foundUser.save();
        console.log(foundUser)
        res.send(foundUser)
    }
    catch (error) {
        console.log(error)
    }

})


app.use(errorMiddleware);

app.listen(3000, () => {
    console.log("Listeing on Port 3000!!")
})

