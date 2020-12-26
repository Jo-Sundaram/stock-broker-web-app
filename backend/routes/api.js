const express = require('express');
const passport = require("passport")
const jwt = require("jsonwebtoken")
const router = express.Router();


let superuser = {username: "car", password: "lol"};

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if(err){
      return next(err)
    }
    if(!user){
      return res.send("Wrong email or password")
    }
    req.login(user, () => {
      const body = {_id: user.id, email: user.email }

      const token = jwt.sign({user: body}, "jwt_secret")
      return res.json({token})
    })
  })(req, res, next)
})

router.get("/secret", passport.authenticate("jwt", { session: false }), (req, res) => {
  if(!req.user){
    res.json({
      username: "nobody"
    })
  } else {
    res.json(req.user)
  }
})

router.post('/superuserLogin', (req, res) => {
  if(req.body.username == superuser.username){
    if(req.body.password == superuser.password){
      return res.json({success: true, key: "jomama"});
    }
  }
  return res.json({success: false});
})

module.exports = router;