import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  // { path: ':id/:name',data:{header:true}, component: BlogsComponent },
  { path: 'category',data:{header:true}, component: BlogsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
