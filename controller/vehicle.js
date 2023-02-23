const Vehicle = require('../models/vehicle');
exports.getVehicle = async (req,res,next) => {
    try{
        const vehicle = await Vehicle.find();
        console.log(vehicle);
        return res.status(200).json({
            success:true,
            count:vehicle.length,
            data:vehicle
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            error:'Server Error'
        });
    }
}

exports.getVehicleById = async (req,res,next) => {
    try{
        const vehicle = await Vehicle.findById(req.params.id);
        if(!vehicle){
            return res.status(404).json({
                success:false,
                error:'No vehicle found'
            });
        }
        return res.status(200).json({
            success:true,
            data:vehicle
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            error:'Server Error'
        });
    }
}

exports.addVehicle = async (req,res,next) => {
    try{
        const {vehicleName,vehicleModel,fuelType,no_Owners,no_Passengers,desc} = req.body;
        const vehicle = await Vehicle.create(req.body);
        return res.status(201).json({
            success:true,
            data:vehicle
        });
    }catch(err){
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success:false,
                error:messages
            });
        }else{
            return res.status(500).json({
                success:false,
                error:'Server Error'
            });
        }
    }
}

exports.deleteVehicle = async (req,res,next) => {
    try{
        const vehicle = await Vehicle.findById(req.params.id);
        if(!vehicle){
            return res.status(404).json({
                success:false,
                error:'No vehicle found'
            });
        }
        await vehicle.remove();
        return res.status(200).json({
            success:true,
            data:{}
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            error:'Server Error'
        });
    }
}

exports.updateVehicle = async (req,res,next) => {
    try{
        const vehicle = await Vehicle.findById(req.params.id);
        if(!vehicle){
            return res.status(404).json({
                success:false,
                error:'No vehicle found'
            });
        }
        vehicle.vehicleName = req.body.vehicleName;
        vehicle.vehicleModel = req.body.vehicleModel;
        vehicle.fuelType = req.body.fuelType;
        vehicle.no_Owners = req.body.no_Owners;
        vehicle.no_Passengers = req.body.no_Passengers;
        vehicle.desc = req.body.desc;
        await vehicle.save();
        return res.status(200).json({
            success:true,
            data:vehicle
        });
    }catch(err){
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success:false,
                error:messages
            });
        }else{
            return res.status(500).json({
                success:false,
                error:'Server Error'
            });
        }
    }
}

exports.loggerFunction = (req,res,next)=>{
    console.log('Logging...');
    console.log(req.method,req.url);
    next();
}

exports.checkAdmin = (req,res,next) => {
    const isAdmin =true;
    if(!isAdmin){
          res.status(401).json({
            // success:false,
            // error:'Not Authorized'
            message:"Not Authorized"
        });
    }
    next();
}
