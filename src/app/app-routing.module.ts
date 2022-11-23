import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './component/admin/categories/categories.component';
import { EditionsComponent } from './component/admin/editions/editions.component';
import { UploadPagesComponent } from './component/admin/editions/upload-pages/upload-pages.component';
import { FeaturedcategoriesComponent } from './component/admin/featuredcategories/featuredcategories.component';
import { FeaturededitionComponent } from './component/admin/featurededition/featurededition.component';
import { ManageHeaderComponent } from './component/admin/manage-header/manage-header.component';
import { ViewusersComponent } from './component/admin/users/viewusers/viewusers.component';
import { BhubaneswarPaperComponent } from './component/bhubaneswar-paper/bhubaneswar-paper.component';
import { HomeComponent } from './component/home/home.component';
import { SidenavComponent } from './component/layout/sidenav/sidenav/sidenav.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
   { path: 'edition/bhubaneswar',
    component: BhubaneswarPaperComponent
  },
  {
    path: 'admin', component: SidenavComponent,
    children: [
      { path: 'user/view', component: ViewusersComponent},
      { path: 'epaper/category', component: CategoriesComponent},
      { path: 'epaper/category/featured', component: FeaturedcategoriesComponent},
      { path: 'epaper/edition', component: EditionsComponent},
      { path: 'epaper/edition/featured', component: FeaturededitionComponent},
      { path: 'header/manage', component: ManageHeaderComponent},
      { path: 'epaper/edition/upload-pages', component: UploadPagesComponent}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
