const {
  register,
  getAllUsers,
  getUserByEmail,
  userById,
  profile,
} = require("./User.service");
const pool = require("../../config/Database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  createUser: (req, res) => {
    const { userName, firstName, lastName, email, password } = req.body;
    if (!userName || !firstName || !lastName || !email || !password)
      return res.status(400).json({ msg: "Not all fields are provided!" });
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 character!" });
    pool.query(
      `SELECT * FROM registration WHERE user_email=?`,
      [email],
      (err, results) => {
        if (err) {
          return res.status(err).json({ msg: "Database connection err!" });
        }
        if (results.length > 0) {
          return res
            .status(400)
            .json({ msg: "An account with this email already exists!" });
        } else {
          var salt = bcrypt.genSaltSync();
          req.body.password = bcrypt.hashSync(password, salt);
          register(req.body, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ msg: "Database connection err" });
            }
            pool.query(
              `SELECT * FROM registration WHERE user_email=?`,
              [email],
              (err, results) => {
                if (err) {
                  return res
                    .status(err)
                    .json({ msg: "Database connection err!" });
                }
                req.body.userId = results[0].user_id;
                console.log(req.body);
                profile(req.body, (err, results) => {
                  if (err) {
                    console.log(err);
                    return res
                      .status(500)
                      .json({ msg: "Database connection err!" });
                  }
                  return res.status(200).json({
                    msg: "New user added successfully",
                    data: results,
                  });
                });
              }
            );
          });
        }
      }
    );
  },
  getUsers: (req, res) => {
    getAllUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Database connection error!" });
      }
      return res.status(200).json({ data: results });
    });
  },
  getUserById: (req, res) => {
    // const id = req.params.id;
    // console.log("id===>", id, "user===>",req.id);
    userById(req.id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Database connection err!" });
      }
      if (!results) {
        return res.status(404).json({ msg: "Record not found!" });
      }
      return res.status(200).json({ data: results });
    });
  },
  login: (req, res) => {
    //destructuring req.body
    const { email, password } = req.body;

    //validation
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields are provided!" });

    //sending data to check if email exist on our database
    getUserByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res
          .status(404)
          .json({ msg: "No account with this email is registered" });
      }

      //check provided password by the user with the encrypted password from database
      const isMatch = bcrypt.compareSync(password, results.user_password);
      if (!isMatch) return res.status(404).json({ msg: "Invalid Credentials" });

      //creating token for the signed user that expires in 1 hour and using our secret key for creation
      const token = jwt.sign({ id: results.user_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      //returning token and user-info
      return res.json({
        token,
        user: {
          id: results.user_id,
          display_name: results.user_name,
        },
      });
    });
  },
};
