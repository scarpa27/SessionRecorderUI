import {SessionDTO} from "./sessionDTO.model";

export class ProjectDTO {
    id: number;
    name: string;
    sessionDTOList: SessionDTO[];

    constructor(_id: number = 0, _name: string = "", _sessionList: SessionDTO[] = []) {
        this.id = _id;
        this.name = _name;
        this.sessionDTOList = _sessionList;
    }
}
