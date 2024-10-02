// Old payment gateway
class OldPaymentGateway {
    makePayment(amount) {
        console.log(`Processing payment of ${amount} using Old Gateway`);
    }
}

// New payment gateway
class NewPaymentGateway {
    processTransaction(amount) {
        console.log(`Processing transaction of ${amount} using New Gateway`);
    }
}

// Adapter to make new gateway compatible with old interface
class PaymentAdapter {
    constructor() {
        this.newGateway = new NewPaymentGateway();
    }

    makePayment(amount) {
        this.newGateway.processTransaction(amount);
    }
}

// Usage:
const oldPayment = new OldPaymentGateway();
oldPayment.makePayment(100);

const newPayment = new PaymentAdapter();
newPayment.makePayment(200);
