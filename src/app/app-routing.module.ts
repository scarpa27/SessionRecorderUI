import {NgModule} from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {HomepageComponent} from "./components/homepage/homepage.component";

const routes: Route[] = [
    {path: '', component: HomepageComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
