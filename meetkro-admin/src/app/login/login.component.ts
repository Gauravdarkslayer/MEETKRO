import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { JwtService } from '../core/services/jwt.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private jwtservice: JwtService,
    private router: Router,
    private dataService: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.spinner.show();
    this.dataService.loginUser(this.loginForm.value).subscribe(res => {
      this.spinner.hide();
      if (res.status === 200) {
        this.jwtservice.saveToken(res.data.token);
        this.jwtservice.saveUserData(res.data.admin_user_data);
        this.toastr.success('Welcome Back!', 'Success');
        this.router.navigate(['/dashboard']);
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, (err) => {
      console.log(err)
      this.spinner.hide();
      this.toastr.error(err.message, 'Error');
    });
  }

}
