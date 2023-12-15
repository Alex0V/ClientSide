import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetComponent } from './components/reset/reset.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProgressComponent } from './components/progress/progress.component';
import { CompositeWrapperComponent } from './components/composite-wrapper/composite-wrapper.component';
import { SessionComponent } from './components/session/session.component';
import { AddMeditationComponent } from './components/add-meditation/add-meditation.component';
import { EditMeditationComponent } from './components/edit-meditation/edit-meditation.component';
import { AddSessionComponent } from './components/add-session/add-session.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'reset', component: ResetComponent},
  {path: 'compositewrapper', redirectTo: 'compositewrapper/dashboard', pathMatch: 'full'},
  {path: 'compositewrapper', component: CompositeWrapperComponent, canActivate: [AuthGuard], children:[
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'progress', component: ProgressComponent, canActivate: [AuthGuard]},
    {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
    {path: 'session/:id', component: SessionComponent, canActivate: [AuthGuard]},
    {path: 'add-meditation', component: AddMeditationComponent, canActivate: [AuthGuard]},
    {path: 'edit-meditation/:id', component: EditMeditationComponent, canActivate: [AuthGuard]},
    {path: 'add-session/:id', component: AddSessionComponent, canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
