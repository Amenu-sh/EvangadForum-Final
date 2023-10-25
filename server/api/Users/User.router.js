const router = require("express").Router();
const auth = require("../middleWare/auth");
const {
  createUser,
  getUsers,
  getUserById,
  login,
} = require("./User.controller");

router.post("/", createUser);
router.get("/all", getUsers);
router.get("/", auth, getUserById);
router.post("/login", login);

module.exports = router;
