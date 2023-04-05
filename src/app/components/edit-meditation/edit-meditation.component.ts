import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Meditation } from 'src/app/models/meditation.model';
import { MeditationService } from 'src/app/services/meditation.service';

@Component({
  selector: 'app-edit-meditation',
  templateUrl: './edit-meditation.component.html',
  styleUrls: ['./edit-meditation.component.scss']
})
export class EditMeditationComponent implements OnInit {
  sessionId!: number;
  meditation!: Meditation;
  constructor(
    private activrouter: ActivatedRoute,
    private meditService: MeditationService,
    private toast: ToastrService,
    private dialog: MatDialog, 
    private router: Router
  ) { }
  ngOnInit(){
    this.activrouter.params.subscribe(params => {
      this.sessionId = params['id'];
    });
    this.getSessionGroup(this.sessionId);
  }
  getSessionGroup(id: number){
    this.meditService.getByIdMeditation(id).subscribe({
      next: (res) => {
        this.meditation = res;
        console.log(res);
      },
      error:(err) => {
        this.toast.error("Something went wrong!", "ERROR", {timeOut: 3000});
      },
    })
  }

  editMeditation(){
    this.meditService.editSessionGroup(this.meditation).subscribe({
      next: (res) => {
        this.router.navigate(['compositewrapper','session', this.sessionId]);
        //this.sessiongroup = res;
        //console.log(res);
      },
      error:(err) => {
        this.toast.error("Something went wrong!", "ERROR", {timeOut: 3000});
      },
    })
  }
}
