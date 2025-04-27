const mentorRoutes = require('express').Router();
const Mentor = require("../controllers/mentorController");
const authMiddleware = require('../middlewares/authMiddlewares');


mentorRoutes.post("/profile", authMiddleware, Mentor.createMentorProfile);
mentorRoutes.get("/profile", authMiddleware, Mentor.getMentorProfile);
mentorRoutes.put("/profile", authMiddleware, Mentor.updateMentorProfile);

module.exports = mentorRoutes;
