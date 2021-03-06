// Core Packages
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cron =  require('node-cron');

//Db check
require("./db_config/mongo");

const app = express();
const port = process.env.PORT || 5000;

// Basic Configuration
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

//Router Setups
const libraryRouter = require('./routers/library');
const loginRouter = require('./routers/login');
const clientRouter = require('./routers/client');
const serviceProviderRouter = require('./routers/serviceProvider');
const adminRouter = require('./routers/admin');
const otpRouter = require('./routers/otp');
const Request = require('./models/request');

//assigning paths
app.use('/library/upload', libraryRouter);
app.use('/log', loginRouter);
app.use('/client', clientRouter)
app.use('/serviceProvider', serviceProviderRouter);
app.use('/admin', adminRouter);
app.use('/otp', otpRouter);


app.get("/", async (req, res) => {
  res.send('Server is up and running')
});

app.listen(port, () => {
  console.log("Server is running on port:", port);
});

const task=cron.schedule('0 1 * * *',async ()=>{
  const requests = await Request.find({});
  for (const request in requests){
    const requestEndTime = new Date(date.split("/").reverse().join("-"));
    const currTime = new Date();
    if (currTime > requestEndTime){
    request.status = "Completed";
    await request.save();    
    }
  }
},{
  scheduled:true,
  timezone:'Asia/Kolkata'
});
task.start();