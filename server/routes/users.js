const {
  login,
  register,
  getAllUsers,
  setAvatar,
  all
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/all",all)

module.exports = router;
