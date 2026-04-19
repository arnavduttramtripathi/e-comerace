
import Address from "../models/Address.js";


// Save a new address
export const saveAddress = async (req, res) => { 
    try {
        const address = await Address.create(req.body);
        res.json({
            message: "Address saved successfully",
            address
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

//get Addresses by userId

export const getAddress = async (req, res) => { 
    try {
        const addresses = await Address.find({
            userId: req.params.userId
        });
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}