import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService, 
    private router: Router, 
    private toast: ToastrService
  ){}
  canActivate(): boolean{
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      this.toast.error("Please Login First","ERROR", { timeOut:5000});
      this.router.navigate(['login']);
      return false;
    }
  }
}
