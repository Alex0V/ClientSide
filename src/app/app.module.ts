import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ResetComponent } from './components/reset/reset.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BodyComponent } from './components/body/body.component';
import { CompositeWrapperComponent } from './components/composite-wrapper/composite-wrapper.component';
import { SessionComponent } from './components/session/session.component';
import { MatDialogModule } from '@angular/material/dialog';


import {MatCardModule} from '@angular/material/card';
import { AddMeditationComponent } from './components/add-meditation/add-meditation.component';
import { EditMeditationComponent } from './components/edit-meditation/edit-meditation.component';
import { AddSessionComponent } from './components/add-session/add-session.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ResetComponent,
    HomeComponent,
    SidenavComponent,
    ProgressComponent,
    SettingsComponent,
    BodyComponent,
    CompositeWrapperComponent,
    SessionComponent,
    AddMeditationComponent,
    EditMeditationComponent,
    AddSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
    // * MATERIAL IMPORTS
    MatDialogModule,
    MatCardModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
