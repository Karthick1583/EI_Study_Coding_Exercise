import { ScheduleManager } from './managers/ScheduleManager';
import { TaskFactory } from './factories/TaskFactory';

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const scheduleManager = ScheduleManager.getInstance();

// Helper to print tasks
const printTasks = (tasks: any[]) => {
    if (tasks.length === 0) {
        console.log("No tasks scheduled.");
    } else {
        tasks.forEach(task => {
            console.log(`${task.startTime} - ${task.endTime}: ${task.description} [${task.priority}] ${task.isCompleted ? '(Completed)' : ''}`);
        });
    }
};

// Main Menu
const mainMenu = () => {
    console.log("\nOptions:");
    console.log("1. Add Task");
    console.log("2. View Tasks");
    console.log("3. Remove Task");
    console.log("4. Edit Task");
    console.log("5. Exit");

    readline.question("\nSelect an option: ", (option: string) => {
        switch (option) {
            case '1':  // Add Task
                addTask();
                break;
            case '2':  // View Tasks
                const tasks = scheduleManager.viewTasks();
                if (tasks.length === 0) {
                    console.log("No tasks scheduled.");
                } else {
                    printTasks(tasks);
                }
                mainMenu();
                break;
            case '3':  // Remove Task
                removeTask();
                break;
            case '4':  // Edit Task
                editTask();
                break;
            case '5':  // Exit
                readline.close();
                break;
            default:
                console.log("Invalid option. Please try again.");
                mainMenu();
                break;
        }
    });
};

// Add Task
const addTask = () => {
    readline.question("Enter task description: ", (description: string) => {
        readline.question("Enter start time (HH:mm): ", (startTime: string) => {
            readline.question("Enter end time (HH:mm): ", (endTime: string) => {
                readline.question("Enter priority (High, Medium, Low): ", (priority: string) => {
                    const task = TaskFactory.createTask(description, startTime, endTime, priority);
                    const result = scheduleManager.addTask(task);
                    if (result === 'Task added') {
                        console.log(`Input: Add Task("${description}", "${startTime}", "${endTime}", "${priority}") Output: Task added successfully. No conflicts.`);
                    } else {
                        console.log(`Input: Add Task("${description}", "${startTime}", "${endTime}", "${priority}") Output: ${result}.`);
                    }
                    mainMenu();
                });
            });
        });
    });
};

// Remove Task
const removeTask = () => {
    readline.question("Enter task description to remove: ", (description: string) => {
        const result = scheduleManager.removeTask(description);
        if (result === 'Task removed') {
            console.log(`Input: Remove Task("${description}") Output: Task removed successfully.`);
        } else {
            console.log(`Input: Remove Task("${description}") Output: ${result}.`);
        }
        mainMenu();
    });
};

// Edit Task
const editTask = () => {
    readline.question("Enter task description to edit: ", (description: string) => {
        readline.question("Enter new task description: ", (newDescription: string) => {
            readline.question("Enter new start time (HH:mm): ", (newStartTime: string) => {
                readline.question("Enter new end time (HH:mm): ", (newEndTime: string) => {
                    readline.question("Enter new priority (High, Medium, Low): ", (newPriority: string) => {
                        const result = scheduleManager.editTask(description, newDescription, newStartTime, newEndTime, newPriority);
                        if (result === 'Task edited successfully') {
                            console.log(`Input: Edit Task("${description}") Output: Task edited successfully.`);
                        } else {
                            console.log(`Input: Edit Task("${description}") Output: ${result}.`);
                        }
                        mainMenu();
                    });
                });
            });
        });
    });
};

// Start the app
mainMenu();
