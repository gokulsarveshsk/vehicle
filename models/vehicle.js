const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    vehicleName: {
        type: String,
        trim:true,
        required:[true,'Please add some text']
    },
    vehicleModel:{
        type: Number,
        required:[true,'Please add a positive number']
    },
    fuelType:{
        type: String,
        required:[true,'Please add some text']
    },
    no_Owners:{
        type: Number,
        required:[true,'Please add a positive number']
    },
    no_Passengers:{
        type: Number,
        required:[true,'Please add a positive number']
    },

    desc:{
        type: String,
        required:[true,'Please add some text']
    }

});
module.exports = mongoose.model('Vehicle',VehicleSchema);