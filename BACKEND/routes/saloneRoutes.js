const express = require("express");
const router = express.Router();
// Controller থেকে ফাংশনগুলো নিয়ে আসা
const { getSalons, createSalon } = require("../controllers/salonControllers");

// Route ডিফাইন করা
router.get("/", getSalons);
router.post("/", createSalon);

// এই লাইনটি সবথেকে গুরুত্বপূর্ণ - এটি ছাড়া সার্ভার চলবে না
module.exports = router;