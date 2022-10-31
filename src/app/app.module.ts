import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ResponseService} from "./services/response.service";
import {ApiService} from "./services/api.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './components/header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomepageComponent} from './components/homepage/homepage.component';
import {FrulaPipe} from './sortpipe/frula.pipe';
import {SorterPipe} from './sortpipe/sorter.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomepageComponent,
        FrulaPipe,
        SorterPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule
    ],
    providers: [
        ResponseService,
        ApiService,
        HttpClient
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
