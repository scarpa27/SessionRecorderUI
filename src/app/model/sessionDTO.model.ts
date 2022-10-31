export class SessionDTO {
    id: number;
    project_name: string;
    start: number;
    end: number;

    constructor(_id: number = 0, _project_name: string = "", _start: number = 0, _end: number = 0) {
        this.id = _id;
        this.project_name = _project_name;
        this.start = _start;
        this.end = _end;
    }
}
