class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        this.logs = [];
        Logger.instance = this;
    }

    log(message) {
        this.logs.push(message);
        console.log(`Log: ${message}`);
    }

    printLogs() {
        console.log(this.logs.join("\n"));
    }
}

// Usage:
const logger1 = new Logger();
logger1.log("First log");

const logger2 = new Logger();
logger2.log("Second log");

logger1.printLogs();  // Both logs will be printed since it's the same instance
