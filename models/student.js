const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter You Name"],
        maxLenngth: [40, "Name cannot exceed 40 charactors"],
        minLength: [4, "Name should have more than 4 charactors"]
    },
    gravatar: { type: String, required: true },
    techStack: { type: String, required: true },
    location: {
        type: String,
        required: [true, "Please Enter You address"],
        maxLenngth: [10, "Name cannot exceed 10 charactors"],
        minLength: [5, "Name should have more than 5 charactors"]
    },
    fieldOfInterest: { type: Array, required: true },
    seeking: { type: Array, required: true },
    bio: { type: String, required: true },
    githubURL: { type: String, required: true },
    twitterURL: { type: String, required: true },
    website_URL: { type: String, required: true },
    linkedinURL: { type: String, required: true },
})

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;