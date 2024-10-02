import { ScheduleManager } from './managers/ScheduleManager';
import { TaskFactory } from './factories/TaskFactory';

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const scheduleManager = ScheduleManager.getInstance();

const mainMenu = () => {
    console.log("\nAstronaut Daily Schedule Organizer");
    console.log("1. Add Task");
    console.log("2. View Tasks");
    console.log("3. Remove Task");
    console.log("4. Exit");

    readline.question("\nSelect an option: ", (option: string) => {
        switch (option) {
            case '1':
                readline.question("Enter task description: ", (description: string) => {
                    readline.question("Enter start time (HH:mm): ", (startTime: string) => {
                        readline.question("Enter end time (HH:mm): ", (endTime: string) => {
                            readline.question("Enter priority (High, Medium, Low): ", (priority: string) => {
                                const task = TaskFactory.createTask(description, startTime, endTime, priority);
                                console.log(scheduleManager.addTask(task));
                                mainMenu();
                            });
                        });
                    });
                });
                break;
            case '2':
                const tasks = scheduleManager.viewTasks();
                if (tasks.length === 0) {
                    console.log("No tasks scheduled.");
                } else {
                    tasks.forEach(task => {
                        console.log(`${task.startTime} - ${task.endTime}: ${task.description} [${task.priority}]`);
                    });
                }
                mainMenu();
                break;
            case '3':
                readline.question("Enter task description to remove: ", (description: string) => {
                    console.log(scheduleManager.removeTask(description));
                    mainMenu();
                });
                break;
            case '4':
                readline.close();
                break;
            default:
                console.log("Invalid option. Please try again.");
                mainMenu();
                break;
        }
    });
};

mainMenu();
