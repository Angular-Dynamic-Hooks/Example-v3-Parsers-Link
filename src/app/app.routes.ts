import { Routes } from "@angular/router";
import { HomeComponent } from "./routes/home/home.component";
import { JediComponent } from "./routes/jedi/jedi.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'jedi/:name', component: JediComponent },
  { path: '**', redirectTo: 'home' }
];