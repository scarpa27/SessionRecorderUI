import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {BehaviorSubject} from "rxjs";
import {ProjectDTO} from "../model/projectDTO.model";
import {SessionCMD} from "../model/sessionCMD.model";
import {ProjectCMD} from "../model/projectCMD.model";
import {SessionDTO} from "../model/sessionDTO.model";

@Injectable({
    providedIn: 'root'
})
export class ResponseService {

    constructor(private apiService: ApiService) {
    }

    getProjectsAPI() {
        let sub = new BehaviorSubject<ProjectDTO[]>([]);
        this.apiService.getProjects().subscribe(a => sub.next(a));
        return sub;
    }

    postSession(id: number, session: SessionCMD) {
        let sub = new BehaviorSubject<SessionDTO>(new SessionDTO());
        this.apiService.postSession(id, session).subscribe(a => sub.next(a));
        return sub;
    }

    postProject(project: ProjectCMD) {
        let sub = new BehaviorSubject<ProjectDTO>(new ProjectDTO());
        this.apiService.postProject(project).subscribe(a => sub.next(a));
        return sub;
    }

    //////////////////////////////////////////////
    // putSessionAPI(_id: number, _naziv: string) {
    //     this.apiService.putSession(_id, _naziv).subscribe(() => window.close());
    // }
    //
    // deleteSessionAPI(_id: number) {
    //     this.apiService.deleteSession(_id).subscribe();
    // }
}
