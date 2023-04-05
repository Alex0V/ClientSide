import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmPasswordValidator } from 'src/app/helpers/confirm-password.validator';
import ValidateForm from 'src/app/helpers/validateform';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss', '../../../assets/css/common.scss']
})

export class ResetComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private resetService: ResetPasswordService, private toast: ToastrService, private router: Router){ }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [null,Validators.required],
      confirmPassword: [null, Validators.required]
    },{
      validator:ConfirmPasswordValidator("password","confirmPassword")
    });
    this.activatedRoute.queryParams.subscribe(val =>{
      this.emailToReset = val['email'];
      let uriToken = val['code'];
      this.emailToken = uriToken.replace(/ /g,'+');
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  reset(){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;


      this.resetService.resetPassword(this.resetPasswordObj)
      .subscribe({
        next:(res) => {
          this.toast.success("Password Reset Successfully",'SUCCESS',{ timeOut: 3000 });
          this.router.navigate(['/']);
        },
        error:(err) => {
          this.toast.error("Something went wrong!", "ERROR", {timeOut: 3000});
        }
      })
    }else{
      ValidateForm.validateAllFormFields(this.resetPasswordForm);
    }
  }
}
