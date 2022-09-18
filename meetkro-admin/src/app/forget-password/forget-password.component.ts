import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { JwtService } from '../core/services/jwt.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgotForm!: FormGroup;
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
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required]]
    });
  }

  forgotPassword(): void {
    this.spinner.show();
    this.dataService.forgotPassword(this.forgotForm.value).subscribe({
      next: (res) => {
        this.spinner.hide();
        if (res.statusCode === 200) {
          this.toastr.success(res.message, 'Success');
          this.router.navigate(['/']);
        } else {
          this.toastr.error(res.message, 'Error');
        }
      }, error: (err) => {
        this.spinner.hide();
        this.toastr.error('Something went wrong', 'Error');
      }
    });
  }

}
