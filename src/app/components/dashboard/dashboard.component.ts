import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Meditation } from 'src/app/models/meditation.model';
import { AuthService } from 'src/app/services/auth.service';
import { MeditationService } from 'src/app/services/meditation.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  meditation: Meditation[] = [];

  public role!:string;
  public fullName : string = "";
  
  constructor(private meditService: MeditationService, private toast: ToastrService, private router: Router, private userStore: UserStoreService, private auth: AuthService) { }
   ngOnInit() {
    this.getAllSGroup();

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
   }
   getAllSGroup(){
    this.meditService.getAllSessionGroup().subscribe({
      next: (res) => {
        this.meditation = res;
      },
      error:(err) => {
        this.toast.error("Something went wrong!", "ERROR", {timeOut: 3000});
      },
    })
   }

   showSessions(sessionId: number){
    this.router.navigate(['compositewrapper','session', sessionId]);
   }
   goToAdd(){
    if(this.role == "Admin"){
      this.router.navigate(['compositewrapper','add-meditation']);
    }
   }

}
