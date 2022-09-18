import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtService } from '../../../core/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string = 'Admin';
  role: string = 'Admin';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private jwtService: JwtService,
    private spinner: NgxSpinnerService,
    private dataService: UserService,
  ) {
 

   }

  ngOnInit(): void {
  }


  logout(): void {
    // this.spinner.show();
    let user = this.jwtService.getUserData()
    this.jwtService.destroyToken();
        this.router.navigate(['/']);
        this.toastr.success('Logout Success!', 'Success');
    // this.dataService.logout(user).subscribe(res => {
    //   this.spinner.hide();
    //   if (res.statusCode === 200) {
    //     this.jwtService.destroyToken();
    //     this.router.navigate(['/']);
    //     this.toastr.success('Logout Success!', 'Success');
    //   } else {
    //     this.toastr.error(res.message, 'Error');
    //   }
    // }, (err) => {
    //   this.spinner.hide();
    //   this.toastr.error('Something went wrong', 'Error');
    // });
  }

  
}
