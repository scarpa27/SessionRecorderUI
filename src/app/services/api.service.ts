import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {join} from '@fireflysemantics/join';
import {Observable} from "rxjs";
import {SessionCMD} from "../model/sessionCMD.model";
import {ProjectCMD} from "../model/projectCMD.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    readonly apiRoot = join(environment.API_URL, '/api');
    options = {headers: new HttpHeaders({"Content-Type": "application/json"})}

    constructor(private http: HttpClient) {
    }

    getProjects(): Observable<any> {
        return this.http.get(join(this.apiRoot, "project"));
    }

    postSession(id: number, session: SessionCMD): Observable<any> {
        return this.http.post(
            join(this.apiRoot, "project", id.toString()),
            JSON.stringify(session),
            this.options);
    }

    postProject(project: ProjectCMD): Observable<any> {
        return this.http.post(
            join(this.apiRoot, "project"),
            JSON.stringify(project),
            this.options);
    }

    ///////////////////////////////////////////////////////////////////////////////
    // putSession(_id: number, _naziv: string) {
    //     return this.http.put(join(this.apiRoot, "drzava", _id.toString()), {
    //         id: _id,
    //         drzava: _naziv});
    // }
    //
    // deleteSession(_id: number) {
    //     return this.http.delete(join(this.apiRoot, "drzava", _id.toString()));
    // }
}
