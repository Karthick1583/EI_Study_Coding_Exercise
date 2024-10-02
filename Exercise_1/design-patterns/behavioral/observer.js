class WeatherStation {
    constructor() {
        this.observers = [];
        this.temperature = 0;
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    setTemperature(temp) {
        this.temperature = temp;
        this.notifyObservers();
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this.temperature));
    }
}

class Display {
    update(temp) {
        console.log(`Display: The temperature is now ${temp}°C`);
    }
}

// Usage:
const weatherStation = new WeatherStation();
const display1 = new Display();
const display2 = new Display();

weatherStation.addObserver(display1);
weatherStation.addObserver(display2);

weatherStation.setTemperature(25);
weatherStation.setTemperature(30);
