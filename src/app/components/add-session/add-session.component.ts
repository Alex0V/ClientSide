import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent implements OnInit {
  meditId!: number;
  myForm!: FormGroup;
  selectedFile: File | undefined;
  constructor(
    private activrouter: ActivatedRoute,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private toast: ToastrService,
    private router: Router, 
    private userStore: UserStoreService, 
    private auth: AuthService
  ) { }

  ngOnInit(){
    this.activrouter.params.subscribe(params => {
      this.meditId = params['id'];
    });
    this.myForm = this.fb.group({
      sessionName: ['', Validators.required]
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  addSession(){
    if(this.myForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.myForm.get('meditationName')?.value);
      formData.append('image', this.selectedFile, this.selectedFile.name);
      this.sessionService.addSession(formData, this.meditId).subscribe({
        next:(res) => {
          this.toast.success("Reset success!", "Success", {timeOut: 3000});
          //this.router.navigate(['compositewrapper','session', this.meditId]);
          console.log(res)
        },
        error:(err) => {
          this.toast.error("Something went wrong!", "ERROR", {timeOut: 2000});
          console.log(err)
        }
      })
    }else{
      console.log("Поля пусті")
    }
  }
}
