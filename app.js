const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const { resourceUsage } = require('process');

app.use(express.urlencoded());
app.use(express.json());

//get theatre
app.get('/theatre', (req, res) => {

  let rawdata = fs.readFileSync('database/theatre.json');
  let theatres = JSON.parse(rawdata);
  res.json(theatres)
})


//login 
app.post('/login', (req, res) => {
  var phoneNumber = req.body.phone_number
  var password = req.body.password

  if (phoneNumber == "012345678" && password == "123456") {
    let rawdata = fs.readFileSync('database/user.json');
    let user = JSON.parse(rawdata);
    res.statusCode = 200
    res.send(user[0])
  } else {
    res.statusCode = 400
    res.send({
      "message": "Username and password is incorrect",
      "success": false
    })
  }
})


//verify code
app.post('/verify_code', (req, res) => {
  var phoneNumber = req.body.verify_code
  if (phoneNumber == "123456") {
    let rawdata = fs.readFileSync('database/user.json');
    let user = JSON.parse(rawdata);
    res.statusCode = 200
    res.send(user[0])
  } else {
    res.statusCode = 400
    res.send({
      "message": "Your code inputed is incorrect. Please check it again.",
      "success": false
    })
  }
})

//create user
app.get('/register', (req, res) => {
  var phoneNumber = req.body.phone_number
  var password = req.body.password
  var verifyCode = req.body.verify_code

  if (phoneNumber.length > 6 && password.length >= 6 && verifyCode.length >= 6) {
    res.statusCode = 200
    res.send({
      "message": "Create user successfully",
      "success": true
    })
  } else {
    res.statusCode = 400
    res.send({
      "message": "Can't register this user",
      "success": false
    })
  }
})

//get movie by category
app.get('/movie/:category_id', (req, res) => {
  let rawdata = fs.readFileSync('database/movies.json');
  let movies = JSON.parse(rawdata);
  res.statusCode = 200
  res.send(movies)
})

app.get("/movie/detail/:movie_id", (req, res) => {
  let rawdata = fs.readFileSync('database/movie_detail.json');
  let detail = JSON.parse(rawdata);
  res.json(detail)
})

app.get("/ticket", (req, res) => {
  let rawdata = fs.readFileSync('database/ticket.json');
  let tickets = JSON.parse(rawdata);
  res.json(tickets)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})