import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { LoginModel } from '../../models/login.model';
import { ResponseStatus } from '../../models/response-status.enum';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  msgs1: Message[];
  submitted: boolean = false;
  spinner: boolean = false;
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })

    
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit(value){
    this.submitted = true
    this.spinner = true
    let loginModel: LoginModel = new LoginModel;
    loginModel.username = value.username
    loginModel.password = value.password
    this.loginService.getLogin(loginModel).subscribe(
      (response) => {
        if(response.status==ResponseStatus.ERROR)
        {
          this.msgs1 = [
            {severity:'error', summary:'Hata', detail:'Kullanıcı adınız veya şifreniz hatalıdır!'}];
        }
        else{
          this.spinner = false
          this.loginService.storeTokens(response.accessToken, response.refreshToken)
          this.messageService.add({severity:'success', summary:'Service Message', detail:'Giriş işlemi başarılı. Anasayfaya yönlendiriliyorsunuz.'});
          this.router.navigate([''])
        }
            

           
      }
    )

  }



}
