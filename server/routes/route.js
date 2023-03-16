const express = require("express");
const router = express.Router();
const {
  Registration,
  Login,
  Verification,
  ForgetPassword,
  ResetPassword,
  GetUser
} = require("./auth");
const { body, validationResult } = require("express-validator");
const { UpdateUnits, FetchUnits } = require("./unit");
const verifytoken = require("../middleware/verifytoken");

//to get user information
router.post("/auth/getuser", verifytoken, GetUser);

//to update units information
router.post("/unit/updateunits", verifytoken, UpdateUnits);
router.get("/unit/fetchunits", FetchUnits);

//Routes from login - Registration
router.post(
  "/auth/register",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a valid Password").isLength({ min: 8 }),
  ],
  Registration
);

router.post(
  "/auth/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  Login
);

router.get("/auth/verify/:id", Verification);

router.post(
  "/auth/forgetpassword",
  [body("email", "Enter a valid Email").isEmail()],
  ForgetPassword
);

router.post("/auth/resetpassword/:token", ResetPassword);



module.exports = router;