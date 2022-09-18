import { Component, OnInit, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements AfterViewInit, OnInit, OnDestroy {
  dtOptions: any = {};
  listener: any;
  blogAddForm!: FormGroup;
  blogEditForm!: FormGroup;
  isSubmitted = false;
  isSubmitted1 = false;
  selectedFile!: any;
  id:any;
  name:any;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial'
  };

  constructor(
    private renderer: Renderer2,
    private pipe: DatePipe,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private productService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.getBlogs();
      this.blogAddForm = this.fb.group({
        page: ['', Validators.required],
        description: ['', Validators.required],
      });
      this.blogEditForm = this.fb.group({
        _id: ['', Validators.required],
        page: ['', Validators.required],
        description: ['', Validators.required],
      });
    });
  }


  onFileChanged(e: any) {
    const file = e.target.files[0];
    if (file.type.split("/")[0] == 'image' && ((file.name.split('.').pop() === 'png') || (file.name.split('.').pop() === 'jpg'))) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
      this.toastr.error('Invalid File Format', 'Error');
    }
  }

  addBlog(): void {
    this.spinner.show();
    // let formData = new FormData();
    // formData.append("page",this.blogAddForm.value.page);

    // formData.append("description",this.blogAddForm.value.description);


    this.productService.addBlog(this.blogAddForm.value).subscribe((res:any) => {
      this.spinner.hide();
      if (res.statusCode === 200) {
        $('#addBlogModal').modal('hide');
        this.toastr.success(res.message, 'Success');
        this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => this.router.navigate(['/content-mgmnt/category']));
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, (err) => {
      this.spinner.hide();
      this.toastr.error(err.message, 'Error');
    });
  }

  editBlog(id: number): void {
    this.spinner.show();
    this.productService.editBlog({ id }).subscribe(
      (res:any) => {
        this.spinner.hide();
        if (res.statusCode === 200) {
          if (res.data) {
            $('#editBlogModal').modal('show');
            this.blogEditForm.patchValue(res.data);
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

  updateBlog(): void {
    this.spinner.show();
    this.productService.updateBlog(this.blogEditForm.value).subscribe((res:any) => {
      this.spinner.hide();
      if (res.statusCode === 200) {
        $('#editBlogModal').modal('hide');
        this.toastr.success(res.message, 'Success');
        this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => this.router.navigate(['/content-mgmnt/category']));
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, (err) => {
      this.spinner.hide();
      this.toastr.error('Something went wrong', 'Error');
    });
  }

  deleteBlog(id: number): void {
    if (confirm('Are you sure want to delete this Content?')) {
      this.spinner.show();
      this.productService.deleteBlog({ id }).subscribe(
        (res:any) => {
          this.spinner.hide();
          if (res.statusCode === 200) {
            this.toastr.success(res.message, 'Success');
            this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => this.router.navigate(['/content-mgmnt/category']));
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

  getBlogs(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      order: [3, 'desc'],
      ajax: (dataTablesParameters: any, callback: any) => {
        this.spinner.show();
        this.productService.getBlogs(dataTablesParameters).subscribe(
          (res:any) => {
            this.spinner.hide();
            if (res.statusCode === 200) {
              callback({
                recordsTotal: res.recordsTotal,
                recordsFiltered: res.recordsFiltered,
                data: res.contents
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
        { title: 'Page', data: 'page', name: 'page' },
        { title: 'Description', class: 'none', data: 'description', name: 'description' },      
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
        this.editBlog(event.target.getAttribute('edit-id'));
      }
      if (event.target.hasAttribute('delete-id')) {
        const id = event.target.getAttribute('delete-id');
        this.deleteBlog(id);
      }
      if (event.target.hasAttribute('category-id')) {
        const id = event.target.getAttribute('category-id');
        const name = event.target.getAttribute('category-name');
        this.router.navigate(['blogs/subcategory', id, name])
      }
    });
  }

  ngOnDestroy(): void {
    if (this.listener) {
      this.listener();
    }
  }

  checkFileValid(file: any): boolean {
    const allowedExts = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedExts.indexOf(file.type) !== -1) {
      if ((file.size / 1000) <= 1000) {
        return true;
      } else {
        this.toastr.error('File Size must be less then 1 Mb', 'Error');
        return false;
      }
    } else {
      this.toastr.error('Invalid File', 'Error');
      return false;
    }


  }

}
