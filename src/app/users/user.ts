export class User {
    constructor(
        public name: string,
        public status: string,
        public tasks: [object],
        public busyUntilDate: Date,
        public busyUntilTime: string
    ) {}
}
