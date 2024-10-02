class PaymentStrategy {
    pay(amount) {
        throw new Error("This method should be overridden");
    }
}

class CreditCardPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Paid ${amount} using Credit Card`);
    }
}

class PayPalPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Paid ${amount} using PayPal`);
    }
}

class PaymentContext {
    constructor(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    setPaymentMethod(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    executePayment(amount) {
        this.paymentMethod.pay(amount);
    }
}

// Usage:
const paymentContext = new PaymentContext(new CreditCardPayment());
paymentContext.executePayment(100);

paymentContext.setPaymentMethod(new PayPalPayment());
paymentContext.executePayment(200);
