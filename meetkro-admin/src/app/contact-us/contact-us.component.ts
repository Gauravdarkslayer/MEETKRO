import { Component, OnInit, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements AfterViewInit, OnInit, OnDestroy {
  dtOptions: any = {};
  listener: any;
  constructor(
    private renderer: Renderer2,
    private pipe: DatePipe,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {

    this.getContactUs();
  }


  getContactUs(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      order: [6, 'desc'],
      ajax: (dataTablesParameters: any, callback: any) => {
        this.spinner.show();
        this.userService.getContactUs(dataTablesParameters).subscribe({
          next: (res:any) => {
            this.spinner.hide();
            if (res.statusCode === 200) {
              callback({
                recordsTotal: res.recordsTotal,
                recordsFiltered: res.recordsFiltered,
                data: res.contactus
              });
            } else {
              this.spinner.hide();
              this.toastr.error(res.message, 'Error');
            }
          }
          , error: (err:any) => {
            callback({
              recordsTotal: 0,
              recordsFiltered: [],
              data: []
            });
            this.spinner.hide();
            this.toastr.error('Something Went Wrong!', 'Error');
          }
        });
      },
      columns: [
        { title: 'Name', data: 'name', name: 'name', orderable: true },
        { title: 'Email', data: 'email', name: 'email', orderable: false },
        { title: 'Contact&nbsp;Number', data: 'contact_number', name: 'contact_number', orderable: false },
        { title: 'Subject', data: 'subject', name: 'subject', class: 'none', orderable: false },
        { title: 'Message', data: 'message', class: 'none', name: 'message', orderable: false },
        { title: 'Created&nbsp;On', data: 'createdAt', searchable: false, name: 'createdAt', render: (createdAt: string, type: any, full: any) => this.pipe.transform(full.createdAt, 'short') },
        { title: 'Updated&nbsp;On', class: 'none', data: 'updatedAt', searchable: false, name: 'updatedAt', render: (updatedAt: string, type: any, full: any) => this.pipe.transform(full.updatedAt, 'short') }
      ],

      responsive: true
    };
  }

  ngAfterViewInit(): void {
    this.listener = this.renderer.listen('document', 'click', (event) => {

    });
  }

  ngOnDestroy(): void {
    if (this.listener) {
      this.listener();
    }
  }
}
