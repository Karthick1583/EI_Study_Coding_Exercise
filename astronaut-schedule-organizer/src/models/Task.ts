export class Task {
    constructor(
        public description: string,
        public startTime: string,  // Format: "HH:mm"
        public endTime: string,    // Format: "HH:mm"
        public priority: string,   // Priority levels: High, Medium, Low
        public isCompleted: boolean = false  // Optional, for marking tasks completed
    ) {}
}
