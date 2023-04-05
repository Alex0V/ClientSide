import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Session } from 'src/app/models/session.model';
import { SessionService } from 'src/app/services/session.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthService } from 'src/app/services/auth.service';
import { MeditationService } from 'src/app/services/meditation.service';
import { Meditation } from 'src/app/models/meditation.model';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  session: Session[]=[];
  meditation!: Meditation;
  recomend_meditation: Meditation[]=[];
  meditId!: number;
  public role!:string;
  public fullName : string = "";

  constructor(
    private activrouter: ActivatedRoute,
    private sessions: SessionService,
    private meditServer: MeditationService,
    private toast: ToastrService,
    private router: Router, 
    private userStore: UserStoreService, 
    private auth: AuthService
  ) { }

  ngOnInit(){
    this.activrouter.params.subscribe(params => {
      this.meditId = params['id'];
      this.getAllSession(this.meditId);
      this.getMeditation(this.meditId);
    this.getRecomendation(this.meditId);
    });
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

  getMeditation(meditId: number){
    // отримуємо ім'я медитації для відображення назви, опису та тривалості
    this.meditServer.getByIdMeditation(meditId).subscribe({
      next: (res) => {
        this.meditation = res;
      },
      error:(err) => {
        this.toast.error("Something went wrong!", "ERROR", {timeOut: 3000});
      },
    })
  }
  
  getAllSession(meditId: number){
    this.sessions.getAllSessionByGroup(meditId).subscribe({
      next: (res) => {
        this.session = res;
      },
      error:(err) => {
        this.toast.error("Something went wrong!", "ERROR", {timeOut: 3000});
      },
    })
   }

   displayURL(url: string){
    const dotIndex: number = url.lastIndexOf('.');
    const extension: string = url.substring(dotIndex + 1).toLowerCase();
    if(extension == "mp3"){
      // дописати логіку
    }
   }

   goToAddSession(){
    if(this.role == "Admin"){
      this.router.navigate(['compositewrapper','add-session', this.meditId]);
    }
   }

   goToEditMeditation(){
    this.router.navigate(['compositewrapper','edit-meditation', this.meditId]);
   }

   deleteMeditation(){
    this.meditServer.deleteMeditation(this.meditId).subscribe({
      next: (res) => {
        this.router.navigate(['compositewrapper','dashboard']);
      },
      error:(err) => {
        this.toast.error("Something went wrong!", "ERROR", {timeOut: 3000});
      },
    });
   }
   
   navigateToRecommendedSession(recommendedSessionId: number) {
    this.router.navigate(['compositewrapper', 'session', recommendedSessionId]);
  }

  getRecomendation(meditId: number){
      this.meditServer.getRecomendationByName(meditId).subscribe({
        next: (res) => {
          this.recomend_meditation = res;
        },
        error:(err) => {
          this.toast.error("Something went wrong!", "ERROR", {timeOut: 3000});
        },
      })
  }
}
