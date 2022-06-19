import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterModel } from '../../models/register.model';
import { ResponseStatus } from '../../models/response-status.enum';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  spinner: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private messageService: MessageService,
    private router: Router) { }

  registerForm: FormGroup;

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      mobile: [''],
      email: [''],
      username: [''],
      password: [''],
    })
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit(value){
    this.spinner = true
    let registerModel: RegisterModel = new RegisterModel;
    registerModel.firstName = value.firstName
    registerModel.lastName = value.lastName
    registerModel.email = value.email
    registerModel.mobile = value.mobile
    registerModel.username = value.username
    registerModel.password = value.password
    
    this.registerService.getRegister(registerModel).subscribe(
      (response) => {
        if(response.status = ResponseStatus.SUCCESS)
        {
            this.spinner = false
            this.messageService.add({severity:'success', summary:'Service Message', detail:'Kayıt başarılı giriş sayfasına yönlendiriliyorusunuz.'});
            this.router.navigate(['login'])
        }
        else{
          this.messageService.add({severity:'error', summary:'Service Message', detail:'Kayıt sırasında bir hata oluştu tekrar deneyin.'});
        }
      }
    )

  }



}
