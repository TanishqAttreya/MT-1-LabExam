const express = require('express');
const app = express();
app.use(express.json());
let vehicles = [
    { id: 1, vehicleName: "Hyundai Creta", vehicleNumber: "HR26AB1234", type: "SUV", price: 1500000 },
    { id: 2, vehicleName: "Honda City", vehicleNumber: "DL4CAB5678", type: "Sedan", price: 1200000 },
    { id: 3, vehicleName: "Tata Nexon", vehicleNumber: "UP14XY9012", type: "SUV", price: 1100000 }
];
app.get('/vehicles', (req, res) => {
    res.status(200).json(vehicles);
});
app.get('/vehicles/:id', (req, res) => {
    const vehicle = vehicles.find(v => v.id === parseInt(req.params.id));
    if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
});
app.post('/vehicles', (req, res) => {
    const { id, vehicleName, vehicleNumber, type, price } = req.body;    
if (!id || !vehicleName || !vehicleNumber || !type || price === undefined || price <= 0) {
        return res.status(400).json({ error: "Invalid request: Missing required fields or invalid price" });
    }    
    const newVehicle = { id, vehicleName, vehicleNumber, type, price };
    vehicles.push(newVehicle);
    res.status(201).json({
        message: "Vehicle added successfully",
        vehicle: newVehicle
    });
});
app.put('/vehicles/:id', (req, res) => {
    const vehicleIndex = vehicles.findIndex(v => v.id === parseInt(req.params.id));
    if (vehicleIndex === -1) {
        return res.status(404).json({ error: "Vehicle not found" });
    }
    const { vehicleName, vehicleNumber, type, price } = req.body;
    if (vehicleName) vehicles[vehicleIndex].vehicleName = vehicleName;
    if (vehicleNumber) vehicles[vehicleIndex].vehicleNumber = vehicleNumber;
    if (type) vehicles[vehicleIndex].type = type;
    if (price && price > 0) vehicles[vehicleIndex].price = price;
    res.status(200).json({
        message: "Vehicle updated successfully",
        vehicle: vehicles[vehicleIndex]
    });
});
app.delete('/vehicles/:id', (req, res) => {
    const vehicleIndex = vehicles.findIndex(v => v.id === parseInt(req.params.id));
    if (vehicleIndex === -1) {
        return res.status(404).json({ error: "Vehicle not found" });
    } 
    const deletedVehicle = vehicles.splice(vehicleIndex, 1);
    res.status(200).json({
        message: "Vehicle deleted successfully",
        vehicle: deletedVehicle[0]
    });
});
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Express Server running at http://localhost:${PORT}`);
});