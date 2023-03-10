const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const{getVehicle,addVehicle,deleteVehicle,updateVehicle,loggerFunction,getVehicleById, checkAdmin} = require('./controller/vehicle');
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.messkzq.mongodb.net/?retryWrites=true&w=majority`,
    {
    useNewUrlParser: true
    }
);
// mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",function(){
console.log("Database connected");
});

const app = express();
app.use(cors({
    origin: '*'
}   
));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(loggerFunction);


app.get('/api/v1/letsgo',loggerFunction,(req, res,next) => {
    res.status(200).json({
         message: 'It worked!',
        status: 'success' });
});


app.get('/api/v1/vehicle',getVehicle);
app.get('/api/v1/vehicle/:id',getVehicleById);
app.post('/api/v1/vehicle',checkAdmin,addVehicle);
app.delete('/api/v1/vehicle/:id',deleteVehicle);
app.put('/api/v1/vehicle/:id',updateVehicle);


app.listen(3900, () => {
    console.log('Server is running on port 3900');
  });