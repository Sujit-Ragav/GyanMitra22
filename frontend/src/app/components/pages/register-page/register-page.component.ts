import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IuserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm!:FormGroup;
  isSubmitted = false;

  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      college: ['', Validators.required],
      phone_number:['',[Validators.required,Validators.minLength(10)]],
      accomdation:['',Validators.required],
      gender:['',Validators.required],
      year:['',Validators.required],
      department:['',Validators.required]
    },{
      validators: PasswordsMatchValidator('password','confirmPassword')
    });

    this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const fv= this.registerForm.value;
    const user :IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      college:fv.college,
      phone_number: fv.phone_number,
      accomdation:fv.accomdation,
      gender:fv.gender,
      department:fv.department,
      year:fv.year
    };

    this.userService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}
