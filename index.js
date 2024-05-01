const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

//change the database with yours
mongoose.connect("mongodb://localhost:27017");

module.exports = { mongoose };
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 9090

const schemaData = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    dateOfBirth: Date,
    address: String,
    role: String
}, {
    timestamps: true
})

const schemaAppointment = mongoose.Schema({
    name: String,
    doctorName: String,
    appointmentDate: Date,
    status: String,
    payment: String,
}, {
    timestamps: true
})

const schemaBilling = mongoose.Schema({
    payment: String,
    name: String,
    quantity: Number,
    unitPrice: Number,
}, {
    timestamps: true
})
const userModel = mongoose.model("user", schemaData)
const appointmentModel = mongoose.model("appointment", schemaAppointment)
const billingModel = mongoose.model("billing", schemaBilling)
app.get("/", async (req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})

app.get("/appointment", async (req, res) => {
    const data = await appointmentModel.find({})
    res.json({ success: true, data: data })
})
app.get("/billing", async (req, res) => {
    const data = await billingModel.find({})
    res.json({ success: true, data: data })
})
app.post("/load", async (req, res) => {
    console.log("req ", req.body);
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})
app.post("/create", async (req, res) => {
    console.log("req ", req.body);
    const data = new userModel(req.body)
    await data.save()
    res.send({ success: true, message: "data save successfully" })
})

app.post("/appCreate", async (req, res) => {
    console.log("req ", req.body);
    const data = new appointmentModel(req.body)
    await data.save()
    res.send({ success: true, message: "data save successfully" })
})
app.post("/billCreate", async (req, res) => {
    console.log("req ", req.body);
    const data = new billingModel(req.body)
    await data.save()
    res.send({ success: true, message: "data save successfully" })
})
// mongoose.connect("mongodb://localhost:27017/poc")
// .then(()=>{
//     console.log("Connect to DB")
//     app.listen(PORT,()=>console.log(" Server is running"))
// })
// .catch((err)=>console.log(err))
app.listen(PORT, () => console.log(" Server is running"))
