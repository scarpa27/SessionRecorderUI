export class SessionCMD {
    project_id: number;
    start: number;
    end: number;
    constructor(_id: number, _start: number, _end: number) {
        this.project_id = _id;
        this.start = _start;
        this.end = _end;
    }
}
