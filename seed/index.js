const mongoose = require("mongoose");
const Student = require("../models/student");


const MongoDbUrl = 'mongodb://127.0.0.1:27017/studentPortal';

main().catch(err => console.log(`Mongo ERROR, ${err}`));
async function main() {
    await mongoose.connect(MongoDbUrl);
    console.log("MONGO CONNECTION OPEN!!")
}

const seedData = [
    {
        name: "A", gravatar: "A", techStack: "A", location: "A", fieldOfInterest: ["A", "B", "C"], seeking: ["A", "B", "C"], bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", githubURL: "https://github.com/", twitterURL: "https://twitter.com/", website_URL: "https://www.google.co.in/", linkedinURL: "https://in.linkedin.com/"
    },
    {
        name: "B", gravatar: "B", techStack: "B", location: "B", fieldOfInterest: ["D", "E", "F"], seeking: ["D", "E", "F"], bio: "Aliquam molestias cupiditate nisi et, ut unde corrupti quis adipisci ab.", githubURL: "https://github.com/", twitterURL: "https://twitter.com/", website_URL: "https://www.google.co.in/", linkedinURL: "https://in.linkedin.com/"
    }, {
        name: "C", gravatar: "C", techStack: "C", location: "C", fieldOfInterest: ["G", "G", "I"], seeking: ["G", "G", "I"], bio: "vero architecto suscipit? Culpa blanditiis quam fugit ipsa, eaque modi non.", githubURL: "https://github.com/", twitterURL: "https://twitter.com/", website_URL: "https://www.google.co.in/", linkedinURL: "https://in.linkedin.com/"
    },
]


const seedName = ["Aarav", "Ayushman", "Balveer", "Chaitanya", "Daksh"];
const seedGravatar = ["Mirror", "Bravest of the brave", "One who Knows Law and Divinity", "Artistic", "From the heart"];
const seedTechStack = ["Ruby on Rails", "Lamp", "Mean", "Frameworks", "MERN", "React"];
const seedCities = [
    { city: "Noida", state: "UP" },
    { city: "Pune", state: "Maharashtra" },
    { city: "Delhi", state: "Delhi" },
    { city: "Bengaluru", state: "Karnataka" },
    { city: "Indore", state: "MP" },
    { city: "Mumbai", state: "Maharashtra" },
];
const seedBio = ["Lorem ipsum dolor sit amet consectetur", "Adipisicing elitd natus optio rerum fuga mollitia", "Tempora tenetur hic incidunt porro repellat placeat laboriosam adipisci", "Earum nisi quasi dolorum iusto nulla ducimus tempora aspernatur", "olorem quaerat quisquam nulla tempore tempora alias", "Distinctio necessitatibus aspernatur saepe ipsumure sapiente quod, fugit beatae dicta unde mollitia"]


const seedDB = async () => {
    await Student.deleteMany({});
    for (let i = 0; i < 15; i++) {
        const random6 = Math.floor(Math.random() * 6);
        const newStudents = new Student({
            name: `${seedName[random6]}`, gravatar: `${seedGravatar[random6]}`, techStack: `${seedTechStack[random6]}`, location: `${seedCities[random6].city},${seedCities[random6].state}`, fieldOfInterest: ["A", "B", "C"], seeking: ["D", "E", "F"], bio: `${seedBio[random6]}`, githubURL: "https://github.com/", twitterURL: "https://twitter.com/", website_URL: "https://www.google.co.in/", linkedinURL: "https://in.linkedin.com/"
        })
        await newStudents.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})