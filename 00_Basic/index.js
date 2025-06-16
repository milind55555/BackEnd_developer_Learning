
require('dotenv').config() // Load environment variables from .env file
const express = require('express')
// import express from 'express'
const app = express()
const port = process.env.PORT

const data=[
	{
		color: "red",
		value: "#f00"
	},
	{
		color: "green",
		value: "#0f0"
	},
	{
		color: "blue",
		value: "#00f"
	},
	{
		color: "cyan",
		value: "#0ff"
	},
	{
		color: "magenta",
		value: "#f0f"
	},
	{
		color: "yellow",
		value: "#ff0"
	},
	{
		color: "black",
		value: "#000"
	}
]

app.get('/', (req, res) => {
  res.send('Hello World! From Express.js')
})

app.get('/twitter',(req,res)=>{
    res.send('Hello Twitter!')
})
app.get('/login',(req,res)=>{
    res.send('<h1>Login Page</h1>')
})

app.get('/youtube',(req,res)=>{
    res.send('<h2>Welcome to YouTube</h2>')
})
app.get('/getData',(req,res)=>{
    res.json(data)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
