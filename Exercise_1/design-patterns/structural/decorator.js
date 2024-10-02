class Coffee {
    cost() {
        return 5;
    }

    description() {
        return "Basic Coffee";
    }
}

class MilkDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost() + 1;
    }

    description() {
        return `${this.coffee.description()} + Milk`;
    }
}

class SugarDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost() + 0.5;
    }

    description() {
        return `${this.coffee.description()} + Sugar`;
    }
}

// Usage:
let coffee = new Coffee();
console.log(coffee.description(), "$", coffee.cost());

coffee = new MilkDecorator(coffee);
console.log(coffee.description(), "$", coffee.cost());

coffee = new SugarDecorator(coffee);
console.log(coffee.description(), "$", coffee.cost());
