import { Component, OnInit, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

declare var $: any;


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements AfterViewInit, OnInit, OnDestroy {

  dtOptions: any = {};
  listener: any;
  blogCategoryAddForm!: FormGroup;
  blogCategoryEditForm!: FormGroup;
  isSubmitted = false;
  isSubmitted1 = false;
  selectedFile!: File;

  constructor(
    private renderer: Renderer2,
    private pipe: DatePipe,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getBlogCategories();
    this.blogCategoryAddForm = this.fb.group({
      name: ['', Validators.required],
      sort_order: ['', Validators.required],
      status: ['true', Validators.required],
    });
    this.blogCategoryEditForm = this.fb.group({
      name: ['', Validators.required],
      sort_order: ['', Validators.required],
      status: ['true', Validators.required],
      _id: ['', Validators.required]
    });
  }



  addBlogCategory(): void {
    this.spinner.show();
    this.userService.addBlogCategories(this.blogCategoryAddForm.value).subscribe(res => {
      this.spinner.hide();
      if (res.statusCode === 200) {
        $('#addCategoryModal').modal('hide');
        this.toastr.success(res.message, 'Success');
        this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => this.router.navigate(['/blogs/category']));
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, (err) => {
      this.spinner.hide();
      this.toastr.error(err.message, 'Error');
    });
  }

  editBlogCategory(_id: string): void {
    this.spinner.show();
    this.userService.editBlogCategories({ _id }).subscribe(
      res => {
        this.spinner.hide();
        if (res.statusCode === 200) {
          if (res.data.category) {
            $('#editCategoryModal').modal('show');
            this.blogCategoryEditForm.patchValue(res.data.category);
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

  updateBlogCategory(): void {
    this.spinner.show();
    this.userService.updateBlogCategories(this.blogCategoryEditForm.value).subscribe(res => {
      this.spinner.hide();
      if (res.statusCode === 200) {
        $('#editCategoryModal').modal('hide');
        this.toastr.success(res.message, 'Success');
        this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => this.router.navigate(['/blogs/category']));
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, (err) => {
      this.spinner.hide();
      this.toastr.error('Something went wrong', 'Error');
    });
  }

  deleteBlogCategory(id: string): void {
    if (confirm('Are you sure want to delete this Category?')) {
      this.spinner.show();
      this.userService.deleteBlogCategories({ id }).subscribe(
        res => {
          this.spinner.hide();
          if (res.statusCode === 200) {
            this.toastr.success(res.message, 'Success');
            this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => this.router.navigate(['/blogs/category']));
          } else {
            this.toastr.error(res.message, 'Error');
          }
        }
        , err => {
          this.spinner.hide();
          this.toastr.error('Something went wrong', 'Error');
        });
    }
  }

  getBlogCategories(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      order: [3, 'desc'],
      ajax: (dataTablesParameters: any, callback: any) => {
        this.spinner.show();
        this.userService.getBlogsCategories(dataTablesParameters).subscribe(
          res => {
            this.spinner.hide();
            if (res.statusCode === 200) {
              callback({
                recordsTotal: res.recordsTotal,
                recordsFiltered: res.recordsFiltered,
                data: res.blog_categories
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
        { title: 'Name', data: 'name', name: 'name' },
        {
          title: 'Status', data: 'status', searchable: false, render(status: string, type: any, full: any) {
            let sts = '';
            if (full.status) {
              sts = `<span style="color: green">Active</span>`;
            } else {
              sts = `<span style="color: red">Inactive</span>`;
            }
            return sts;
          }
        },
        { title: 'Created&nbsp;On', data: 'createdAt', name: 'createdAt', render: (createdAt: string, type: any, full: any) => this.pipe.transform(full.createdAt, 'short') },
        { title: 'Updated&nbsp;On', data: 'updatedAt', class: 'none', name: 'updatedAt', render: (updatedAt: string, type: any, full: any) => this.pipe.transform(full.updatedAt, 'short') },
        {
          title: 'Action', data: '_id', name: '_id', orderable: false, searchable: false, render(_id: string, type: any, full: any): any {
            return `
        <a href="javascript:void(0)">
        <i class="fa fa-edit" title="Edit" edit-id=` + _id + `>
        </i>
        </a>
        |
        <a href="javascript:void(0)">
        <i class="fa fa-trash text-danger" title="Delete" delete-id=` + _id + `>
        </i>
        </a>
        |
        <a href="javascript:void(0)">
        <i class="fa fa-tags" title="Add Blog" blog-category-id=` + _id + ` blog-category-name=` + full.name + `>
        </i>
        </a>
          `;
          }
        },
      ],
      'createdRow': function (row: any) {
        $(row).attr('role', 'row');
      },
      responsive: true,
      select: true

    };
  }


  ngAfterViewInit(): void {
    this.listener = this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('edit-id')) {
        $('#editModal').modal('show');
        this.editBlogCategory(event.target.getAttribute('edit-id'));
      }
      if (event.target.hasAttribute('delete-id')) {
        const id = event.target.getAttribute('delete-id');
        this.deleteBlogCategory(id);
      }
      if (event.target.hasAttribute('blog-category-id')) {
        const id = event.target.getAttribute('blog-category-id');
        const name = event.target.getAttribute('blog-category-name');
        this.router.navigate(['blogs', id, name])
      }
    });
  }

  ngOnDestroy(): void {
    if (this.listener) {
      this.listener();
    }
  }


}
