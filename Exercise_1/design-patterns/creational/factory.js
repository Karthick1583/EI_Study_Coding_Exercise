class Car {
    drive() {
        console.log("Driving a car");
    }
}

class Bike {
    drive() {
        console.log("Riding a bike");
    }
}

class VehicleFactory {
    static createVehicle(type) {
        switch (type) {
            case "car":
                return new Car();
            case "bike":
                return new Bike();
            default:
                throw new Error("Unknown vehicle type");
        }
    }
}

// Usage:
const car = VehicleFactory.createVehicle("car");
car.drive();

const bike = VehicleFactory.createVehicle("bike");
bike.drive();
