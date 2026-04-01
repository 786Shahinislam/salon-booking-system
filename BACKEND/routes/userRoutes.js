const express = require("express");
const router = express.Router();

// এখানে path ঠিক থাকতে হবে। controllers ফোল্ডারের ভেতর ফাইলের নাম মিলিয়ে নিন।
const { registerUser, authUser } = require("../controllers/userControllers"); 

router.post("/register", registerUser);
router.post("/login", authUser);

module.exports = router;