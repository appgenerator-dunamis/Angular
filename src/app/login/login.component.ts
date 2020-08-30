import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form = {userName:"",password:""};
  
  constructor( private loginService:LoginService,
  private router:Router) { }

  ngOnInit() {
  }

  login(){
    console.log(this.form.userName + " " +  this.form.password)
    this.loginService.login(this.form.userName, this.form.password)
  .subscribe(
      user => {
        this.router.navigate(['/home']);
      }
  );
}

}