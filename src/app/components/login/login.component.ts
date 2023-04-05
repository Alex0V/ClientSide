import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../assets/css/common.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;
  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router, 
    private toast: ToastrService,
    private userStore: UserStoreService,
    private resetService: ResetPasswordService
  ){  }
  
  ngOnInit(): void{
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.auth.signIn(this.loginForm.value).subscribe({
        next: (res=>{
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role)
          this.toast.success(res.message,"SUCCESS", {timeOut: 4000});
          this.router.navigate(['compositewrapper']);
        }),
        error: (err=>{
          this.toast.error("Something when wrong!","ERROR" ,{ timeOut: 4000});
          console.log(err);
        }),
      })
    }
    else{
      // throw the error using toaster and with required fields
      ValidateForm.validateAllFormFields(this.loginForm)
      alert("Your form is invalid")
    }
  }

  checkValidEmail(event:string){
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }
  showError() {
    this.toast.error('Username and/or password incorrect.');
  }
  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      //console.log(this.resetPasswordEmail);
      //API call to be done
      this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
      .subscribe({
        next:(res) => {
          this.toast.success("Reset success!", "Success", {timeOut: 3000});
          this.resetPasswordEmail = "";
          const buttonRef = document.getElementById("CloseBtn");
          buttonRef?.click();
        },
        error:(err) => {
          this.toast.error("Something went wrong!", "ERROR", {timeOut: 2000});
          this.showError();
        }
      })
    }
  }
}
