import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompletedSession } from 'src/app/models/completed-session.model';
import { AuthService } from 'src/app/services/auth.service';
import { CompletedSessionsService } from 'src/app/services/completed-sessions.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit{
  public fullName : string = "";
  public completedSessionByPeriod: CompletedSession[] = [];
  public period: string = "";
  constructor(
    private router: Router, 
    private userStore: UserStoreService, 
    private auth: AuthService,
    private completedSesionService: CompletedSessionsService, 
    private toast: ToastrService
  ) { }

  ngOnInit(){
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });
    this.completedSesionService.getUserCompletedSession(this.fullName,"day").subscribe({
      next: (res) => {
        this.completedSessionByPeriod = res;
      },
      error:(err) => {
        this.toast.error("Something went wrong!", "ERROR", {timeOut: 3000});
      },
    });
  }
  changePeriod(newperiod: string){
    this.period = newperiod;
    this.completedSesionService.getUserCompletedSession(this.fullName,this.period).subscribe({
      next: (res) => {
        this.completedSessionByPeriod = res;
        //this.completedSessionByPeriod.sort((a, b) => b.completedDateTime.getTime() - a.completedDateTime.getTime());
      },
      error:(err) => {
        this.toast.error("Something went wrong!", "ERROR", {timeOut: 3000});
      },
    });
  }
}
