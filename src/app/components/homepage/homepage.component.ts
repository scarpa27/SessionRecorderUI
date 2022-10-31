import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectDTO} from "../../model/projectDTO.model";
import {interval} from "rxjs";
import {ResponseService} from "../../services/response.service";
import {SessionCMD} from "../../model/sessionCMD.model";
import {ProjectCMD} from "../../model/projectCMD.model";
import {Subscription} from "rxjs";

let LocalStart = "started_at";
let LocalEnd = "ended_at";

let Hr = "hr-HR";
let Locale = {timeZone: "Europe/Zurich"};

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

    projects: ProjectDTO[] = [];
    local_start: number = 0;
    local_end: number = 0;

    hasStarted: boolean = false;
    hasEnded: boolean = false;

    project_id: number = 0;
    new_project_name: string = "";

    counter: Subscription = new Subscription();
    elapsed: string[] = ["","",""];

    sort_col: string = "f";
    sort_rev: boolean = false;

    constructor(private response: ResponseService) {
    }

    ngOnInit(): void {
        this.handleTime();
        this.fetchData();
        this.counter = interval(1000).subscribe(() => this.count())
    }

    ngOnDestroy(): void {
        this.counter.unsubscribe();
    }

    fetchData() {
        this.response.getProjectsAPI()
            .subscribe(r => this.projects = r);
    }

    handleTime(): void {
        this.hasStarted = localStorage.getItem(LocalStart) != null;
        this.hasEnded = localStorage.getItem(LocalEnd) != null;

        if (this.hasStarted)
            this.local_start = parseInt(localStorage.getItem(LocalStart)!);

        if (this.hasEnded)
            this.local_end = parseInt(localStorage.getItem(LocalEnd)!);
    }

    start() {
        this.local_start = Date.now();
        localStorage.setItem(LocalStart, this.local_start.toString());
        this.hasStarted = true;
    }

    end() {
        this.local_end = Date.now();
        localStorage.setItem(LocalEnd, this.local_end.toString());
        this.hasEnded = true;

        this.fetchData();
    }

    save() {
        const session = new SessionCMD(
            this.project_id,
            parseInt(localStorage.getItem(LocalStart)!),
            parseInt(localStorage.getItem(LocalEnd)!));

        if (this.project_id == -1) {
            this.response.postProject(new ProjectCMD(this.new_project_name)).subscribe(s => {
                console.log(s.id + " je id novostvorenog projekta");
                if (s.id > 0) {
                    this.project_id = s.id;
                    session.project_id = s.id;
                    this.post(session)
                }});}
        else {
            this.post(session)
        }
    }

    discard() {
        localStorage.removeItem(LocalStart);
        localStorage.removeItem(LocalEnd);
        this.hasStarted = false;
        this.hasEnded = false;
        this.fetchData();
        this.reset();
    }

    post(session: SessionCMD) {
        this.response.postSession(this.project_id, session).subscribe(() => {
            this.discard();
        });
    }

    reset() {
        this.project_id = 0;
        this.new_project_name = "";
    }

    count() {
        let ms = (this.hasEnded? this.local_end : Date.now()) - this.local_start;
        const hh = Math.floor(ms / 1000 / 60 / 60);
        ms -= hh * 1000 * 60 * 60;
        const mm = Math.floor(ms / 1000 / 60);
        ms -= mm * 1000 * 60;
        const ss = Math.floor(ms / 1000);
        ms -= ss * 1000;

        this.elapsed[0] = "Početak: " + (new Date(this.local_start).toLocaleString(Hr, Locale));
        this.elapsed[1] = this.hasEnded ? "Kraj: " + (new Date(this.local_end).toLocaleString(Hr, Locale)) : "";
        this.elapsed[2] = "Trajanje: " + hh + ":" + ("0" + mm).slice(-2) + ":" + ("0" + ss).slice(-2);
    }

    sort(col: string) {
        if (col === this.sort_col)
            this.sort_rev = !this.sort_rev;
        else {
            this.sort_rev = false;
            this.sort_col = col;
        }
    }

    arrow(ime: string) {
        return ime == this.sort_col ? this.sort_rev ? " ⬆️" : " ⬇️" : " 🟦";
    }
}
