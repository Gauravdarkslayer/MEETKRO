import { DatePipe } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../core';

@Component({
  selector: 'app-payment-mgmnt',
  templateUrl: './payment-mgmnt.component.html',
  styleUrls: ['./payment-mgmnt.component.scss']
})
export class PaymentMgmntComponent implements OnInit {
  dtOptions: any = {};
  slotHeaders = [
    { title: 'User Name', data: 'user_id.name', name: 'user_id.name', orderable: false },
    { title: 'Meeting Agenda', data: 'booking_slot_id.agenda', name: 'booking_slot_id.agenda', orderable: false },
    { title: 'Start Date Time', data: 'booking_slot_id.start_time', name: 'booking_slot_id.start_time', orderable: false },
    { title: 'End Date Time', data: 'booking_slot_id.end_time', name: 'booking_slot_id.end_time', orderable: false },
  ];

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.getMeetings();
  }

  getMeetings(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      // order: [2, 'desc'],
      ajax: (dataTablesParameters: any, callback: any) => {
        this.spinner.show();
        this.userService.getMeetings(dataTablesParameters).subscribe(
          res => {
            this.spinner.hide();
            if (res.statusCode === 200) {
              console.log(res.meetings)
              map(res.meetings, (item) => {
                item.booking_slot_id.start_time =  item.booking_slot_id.start_time.split('T');
                item.booking_slot_id.start_time =  item.booking_slot_id.start_time[0] + ' ' + item.booking_slot_id.start_time[1].slice(0, 5);
                item.booking_slot_id.end_time =  item.booking_slot_id.end_time.split('T');
                item.booking_slot_id.end_time =  item.booking_slot_id.end_time[0] + ' ' + item.booking_slot_id.end_time[1].slice(0, 5);

              })
              callback({
                recordsTotal: res.recordsTotal,
                recordsFiltered: res.recordsFiltered,
                data: res.meetings
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
      columns: this.slotHeaders,

      responsive: true
    };
  }

}
