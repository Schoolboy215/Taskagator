export class Task {
    public _id: string;
    public name: string;
    public description: string;
    public link: string;
    public client: string;
    constructor(
        public json : any
    ) {
        this.name = json.name;
        this.description = json.name;
        this.link = json.link;
        this.client = json.client;
    }
}
