import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MeditationService } from 'src/app/services/meditation.service';

@Component({
  selector: 'app-add-meditation',
  templateUrl: './add-meditation.component.html',
  styleUrls: ['./add-meditation.component.scss']
})
export class AddMeditationComponent implements OnInit{
  constructor(
    private fb: FormBuilder, 
    private toast: ToastrService,
    private meditService: MeditationService,
    private router: Router ) { }
  myForm!: FormGroup;
  selectedFile: File | undefined;

  ngOnInit(): void{
    this.myForm = this.fb.group({
      meditationName: ['', Validators.required],
      meditationDescription: ['', Validators.required],
      meditationDuration: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  addMeditation(){
    if(this.myForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.myForm.get('meditationName')?.value);
      formData.append('description', this.myForm.get('meditationDescription')?.value);
      formData.append('duration', this.myForm.get('meditationDuration')?.value);
      formData.append('image', this.selectedFile, this.selectedFile.name);
      this.meditService.addSessionGroup(formData).subscribe({
        next:(res) => {
          this.toast.success("Reset success!", "Success", {timeOut: 3000});
          this.router.navigate(['compositewrapper','dashboard']);
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
