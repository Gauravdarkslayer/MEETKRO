import { Component, OnInit, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-application-mgmnt',
  templateUrl: './application-mgmnt.component.html',
  styleUrls: ['./application-mgmnt.component.scss']
})
export class ApplicationMgmntComponent implements AfterViewInit, OnInit, OnDestroy {
  dtOptions: any = {};
  userAddForm!: FormGroup;
  userEditForm!: FormGroup;
  isSubmitted = false;
  isSubmitted1 = false;
  listener: any;
  constructor(
    private renderer: Renderer2,
    private pipe: DatePipe,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.userAddForm = this.fb.group({
      name: ['', Validators.required],
      eventType: ['', Validators.required],
    });
    this.userEditForm = this.fb.group({
      _id: ['', Validators.required],
      name: ['', Validators.required],
      eventType: ['', Validators.required],
    });

    // this.getEvents();
  }

  

  editUser(id: any): void {
    this.spinner.show();
    this.userService.editUser({ id }).subscribe(
      res => {
        this.spinner.hide();
        if (res.statusCode === 200) {
          if (res.data.user) {
            $('#editEventModal').modal('show');
            this.userEditForm.patchValue(res.data.user);
          }
        } else {
          this.toastr.error(res.message, 'Error');
        }
      }
      , err => {
        this.spinner.hide();
        this.toastr.error('Something went wrong', 'Error');

      });
  }
  updateUser(): void {
    this.spinner.show();
    this.userService.updateUser(this.userEditForm.value).subscribe(res => {
      this.spinner.hide();
      if (res.statusCode === 200) {
        $('#editEventModal').modal('hide');
        this.toastr.success(res.message, 'Success');
        this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => this.router.navigate(['/event-mgmnt']));
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, (err) => {
      this.spinner.hide();
      this.toastr.error('Something went wrong', 'Error');
    });
  }

  deleteUser(id: string): void {
    if(confirm("Are you sure you want to delete this user?")){
    this.spinner.show()
    this.userService.deleteUser({id}).subscribe(res => {
      this.spinner.hide();
      if (res.statusCode === 200) {
        this.toastr.success(res.message, 'Success');
        this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => this.router.navigate(['/event-mgmnt']));
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, (err) => {
      this.spinner.hide();
      this.toastr.error('Something went wrong', 'Error');

    })
  }
  }

  getEvents(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      // order: [2, 'desc'],
      ajax: (dataTablesParameters: any, callback: any) => {
        this.spinner.show();
        this.userService.getSlots(dataTablesParameters).subscribe(
          res => {
            this.spinner.hide();
            if (res.statusCode === 200) {
              callback({
                recordsTotal: res.recordsTotal,
                recordsFiltered: res.recordsFiltered,
                data: res.users
              });
            } else {
              this.spinner.hide();
              this.toastr.error(res.message, 'Error');
            }
          }
          , err => {
            callback({
              recordsTotal: 0,
              recordsFiltered: [],
              data: []
            });
            this.spinner.hide();
            this.toastr.error('Something Went Wrong!', 'Error');
          });
      },
      columns: [
        { title: 'First Name', data: 'firstName', name: 'firstName', orderable: true },
        { title: 'Last Name', data: 'lastName', name: 'lastName', orderable: true },
        { title: 'Email', data: 'emailId', name: 'emailId', orderable: false },
        { title: 'DOB', data: 'dateOfBirth', name: 'dateOfBirth', orderable: false },
        { title: 'Years of study', data: 'yearsOfStudy', name: 'yearsOfStudy', orderable: false },
        { title: 'Instrument', data: 'instrument', name: 'instrument', orderable: false },
        { title: 'Phone Number', data: 'phoneNumber', name: 'phoneNumber', orderable: false },
        // { title: 'User Agent', data: 'user_agent', name: 'user_agent', orderable: false },
        // { title: 'Created&nbsp;On', data: 'createdAt',searchable: false, name: 'createdAt', render: (createdAt: string, type: any, full: any) => this.pipe.transform(full.createdAt, 'short') },
        // { title: 'Updated&nbsp;On', data: 'updatedAt',searchable: false,class:"none", name: 'updatedAt', render: (updatedAt: string, type: any, full: any) => this.pipe.transform(full.updatedAt, 'short') },
        // {
        //   title: 'Action', data: '_id', name: '_id', orderable: false, searchable: false, render(id: string, type: any, full: any): any {
        //     return `

        // <a href="javascript:void(0)">
        // <i class="fa fa-download text-danger" title="Download PDF" download-id=` + full.pdf_url + `>
        // </i>
        // </a>
        //   `;
        //   }
        // },
      ],

      responsive: true
    };
  }

  ngAfterViewInit(): void {
    this.listener = this.renderer.listen('document', 'click', (event) => {
     if(event.target.hasAttribute("delete-id")){
        this.deleteUser(event.target.getAttribute('delete-id'));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.listener) {
      this.listener();
    }
  }
}
