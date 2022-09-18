import { Component, OnInit, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MINUTES_UNIT } from '../constants';
import { cloneDeep, get, map, set } from 'lodash';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-event-mgmnt',
  templateUrl: './event-mgmnt.component.html',
  styleUrls: ['./event-mgmnt.component.scss']
})
export class EventMgmntComponent implements AfterViewInit, OnInit, OnDestroy {
  dtOptions: any = {};
  eventAddForm!: FormGroup;
  eventEditForm!: FormGroup;
  isSubmitted = false;
  isSubmitted1 = false;
  dropdownSettings = {};
  listener: any;
  slotHeaders = [
    { title: 'Agenda', data: 'agenda', name: 'agenda', orderable: false },
    { title: 'Meeting Link', data: 'meeting_joining_link', name: 'meeting_joining_link', orderable: false },
    { title: 'Meeting ID', data: 'meeting_id', name: 'meeting_id', orderable: false },
    { title: 'Max Members', data: 'max_members', name: 'max_members', orderable: false },
    { title: 'Start Date Time', data: 'start_time', name: 'start_time', orderable: false },
    { title: 'End Date Time', data: 'end_time', name: 'end_time', orderable: false },
    // {
    //   title: 'Action', data: '_id', name: '_id', orderable: false, searchable: false, render(id: string, type: any, full: any): any {
    //     return `
    //     <a href="javascript:void(0)">
    //     <i class="fa fa-edit" title="Edit Event" edit-id=` + full._id + `>
    //     </i>
    //     </a>
    //       `;
    //   }
    // },
  ];
  slotItems = [
    { slot_id: 15, name: `15 ${MINUTES_UNIT}` },
    { slot_id: 30, name: `30 ${MINUTES_UNIT}` },
    { slot_id: 45, name: `45 ${MINUTES_UNIT}` },
    { slot_id: 60, name: `60 ${MINUTES_UNIT}` },
  ];
  selectedSlots=undefined;

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
    this.eventAddForm = this.fb.group({
      slotsAgenda: ['', Validators.required],
      slotStartDatetime: ['', Validators.required],
      slotEndDatetime: ['', Validators.required],
      slotInterval: ['', Validators.required],
      max_members: ['', Validators.required],
      meeting_id: ['', Validators.required],
    });
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'slot_id',
      textField: 'name',
    };

    this.getSlots();
  }

  scheduleSlot(): void {
    let payload = cloneDeep(this.eventAddForm.value)
    set(payload, 'slotInterval', get(payload.slotInterval, '0.slot_id'));
    this.spinner.show();
    this.userService.createSlot(payload).subscribe(res => {
      this.spinner.hide();
      if (res.statusCode === 200) {
        $('#addEventModal').modal('hide');
        this.toastr.success(res.message, 'Success');
        this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => this.router.navigate(['/slots-management']));
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, (err) => {
      this.spinner.hide();
      this.toastr.error(err.message, 'Error');
    });
  }

  editUser(id: any): void {
    this.spinner.show();
    this.userService.editUser({ id }).subscribe(
      res => {
        this.spinner.hide();
        if (res.statusCode === 200) {
          if (res.data.user) {
            $('#editEventModal').modal('show');
            this.eventEditForm.patchValue(res.data.user);
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
    this.userService.updateUser(this.eventEditForm.value).subscribe(res => {
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

  getSlots(): void {
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
              console.log(res.slots)
              map(res.slots, (item) => {
                item.start_time = item.start_time.split('T');
                item.start_time = item.start_time[0] + ' ' + item.start_time[1].slice(0, 5)
                item.end_time = item.end_time.split('T');
                item.end_time = item.end_time[0] + ' ' + item.end_time[1].slice(0, 5)
              })
              callback({
                recordsTotal: res.recordsTotal,
                recordsFiltered: res.recordsFiltered,
                data: res.slots
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

  ngAfterViewInit(): void {
    this.listener = this.renderer.listen('document', 'click', (event) => {
     if(event.target.hasAttribute("delete-id")){
        this.deleteUser(event.target.getAttribute('delete-id'));
      } else if (event.target.hasAttribute("edit-id")) {
        this.editUser(event.target.getAttribute('edit-id'));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.listener) {
      this.listener();
    }
  }
}
