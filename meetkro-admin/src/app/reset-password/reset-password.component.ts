import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { JwtService } from '../core/services/jwt.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  submitted = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private jwtservice: JwtService,
    private router: Router,
    private dataService: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const token = params.get('token');
      this.resetForm = this.fb.group({
        token: [token, [Validators.required]],
        cpassword: ['', [Validators.required]],
        password: ['', [Validators.required]],
      }, { validator: this.passwordMatchValidator }
      );
    });

  }

  resetPassword(): void {
    this.spinner.show();
    this.dataService.resetPassword(this.resetForm.value).subscribe({
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

  passwordMatchValidator(frm: FormGroup): any {
    return (frm.controls['password'].value === frm.controls['cpassword'].value) ? null : { mismatch: true };
  }

}
