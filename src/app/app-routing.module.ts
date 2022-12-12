import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './component/admin/categories/categories.component';
import { EditcategoryComponent } from './component/admin/categories/editcategory/editcategory.component';
import { CategoryDialogComponent } from './component/admin/categories/newcategory/category-dialog.component';
import { EditionsComponent } from './component/admin/editions/editions.component';
import { CreateAreaMapComponent } from './component/admin/editions/upload-pages/create-area-map/create-area-map.component';
import { UploadPagesComponent } from './component/admin/editions/upload-pages/upload-pages.component';
import { FeaturedcategoriesComponent } from './component/admin/featuredcategories/featuredcategories.component';
import { FeaturededitionComponent } from './component/admin/featurededition/featurededition.component';
import { ManageHeaderComponent } from './component/admin/manage-header/manage-header.component';
import { ViewusersComponent } from './component/admin/users/viewusers/viewusers.component';
import { BhubaneswarPaperComponent } from './component/bhubaneswar-paper/bhubaneswar-paper.component';
import { HeaderCategoryComponent } from './component/header-category/header-category.component';
import { HomeComponent } from './component/home/home.component';
import { SidenavComponent } from './component/layout/sidenav/sidenav/sidenav.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
   { path: 'edition/:id/:category',
    component: HeaderCategoryComponent
  },

  {
    path: 'admin', component: SidenavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'user/view', component: ViewusersComponent},
      { path: 'epaper/category', component: CategoriesComponent},
      { path: 'epaper/category/add', component: CategoryDialogComponent},
      { path: 'epaper/category/edit/:id', component: EditcategoryComponent},
      { path: 'epaper/category/featured', component: FeaturedcategoriesComponent},
      { path: 'epaper/edition', component: EditionsComponent},
      { path: 'epaper/edition/featured', component: FeaturededitionComponent},
      { path: 'header/manage', component: ManageHeaderComponent},
      { path: 'epaper/edition/upload-pages/:id', component: UploadPagesComponent},
      { path: 'epaper/edition/map/:id', component: CreateAreaMapComponent}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
