import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAdViewComponent } from './component/admin/admin-ad/admin-ad-view/admin-ad-view.component';
import { AdminAdComponent } from './component/admin/admin-ad/admin-ad.component';
import { CategoriesComponent } from './component/admin/categories/categories.component';
import { EditcategoryComponent } from './component/admin/categories/editcategory/editcategory.component';
import { CategoryDialogComponent } from './component/admin/categories/newcategory/category-dialog.component';
import { EditeditionComponent } from './component/admin/editions/editedition/editedition.component';
import { EditionsComponent } from './component/admin/editions/editions.component';
import { NeweditionComponent } from './component/admin/editions/newedition/newedition.component';
import { NewsupplimentComponent } from './component/admin/editions/supplimentpages/newsuppliment/newsuppliment.component';
import { SupplimentpagesComponent } from './component/admin/editions/supplimentpages/supplimentpages.component';
import { CreateAreaMapComponent } from './component/admin/editions/upload-pages/create-area-map/create-area-map.component';
import { EditPagesComponent } from './component/admin/editions/upload-pages/edit-pages/edit-pages.component';
import { PreviewEditionComponent } from './component/admin/editions/upload-pages/preview-edition/preview-edition.component';
import { UploadPagesComponent } from './component/admin/editions/upload-pages/upload-pages.component';
import { FeaturedcategoriesComponent } from './component/admin/featuredcategories/featuredcategories.component';
import { FeaturededitionComponent } from './component/admin/featurededition/featurededition.component';
import { ManageHeaderComponent } from './component/admin/manage-header/manage-header.component';
import { EdituserComponent } from './component/admin/users/edituser/edituser.component';
import { NewuserComponent } from './component/admin/users/newuser/newuser.component';
import { ViewusersComponent } from './component/admin/users/viewusers/viewusers.component';
import { BhubaneswarPaperComponent } from './component/bhubaneswar-paper/bhubaneswar-paper.component';
import { HeaderCategoryComponent } from './component/header-category/header-category.component';
import { PreviewSectionComponent } from './component/header-category/preview-section/preview-section.component';
import { HomeComponent } from './component/home/home.component';
import { SidenavComponent } from './component/layout/sidenav/sidenav/sidenav.component';
import { LoginComponent } from './component/login/login.component';
import { EditProfileComponent } from './component/user-profile/edit-profile/edit-profile.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
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
  {
    path: 'edition/:id/:category',
    component: HeaderCategoryComponent
  },
  {
    path: 'preview/:img_id/:id/:cat/:date/:i',
    component: PreviewSectionComponent
  },
  {
    path: 'admin', component: SidenavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'profile/edit/:id', component: EditProfileComponent },
      { path: 'user/view', component: ViewusersComponent},
      { path: 'user/add', component: NewuserComponent},
      { path: 'user/edit/:id', component: EdituserComponent},
      { path: 'epaper/category', component: CategoriesComponent},
      { path: 'epaper/category/add', component: CategoryDialogComponent},
      { path: 'epaper/category/edit/:id', component: EditcategoryComponent},
      { path: 'epaper/category/featured', component: FeaturedcategoriesComponent},
      { path: 'epaper/edition', component: EditionsComponent},
      { path: 'epaper/edition/add', component: NeweditionComponent},
      { path: 'epaper/edition/edit/:id', component: EditeditionComponent},
      { path: 'epaper/edition/featured', component: FeaturededitionComponent},
      { path: 'edition/supplement/view/:id', component: SupplimentpagesComponent},
      { path: 'edition/supplement/add', component: NewsupplimentComponent},
      { path: 'header/manage', component: ManageHeaderComponent},
      { path: 'epaper/edition/upload-pages/:name/:id', component: UploadPagesComponent},
      { path: 'epaper/edition/map/:id', component: CreateAreaMapComponent},
      { path: 'epaper/edition/upload-pages/edit/:eid/:id', component: EditPagesComponent},
      { path: 'user/view', component: ViewusersComponent },
      { path: 'user/add', component: NewuserComponent },
      { path: 'user/edit/:id', component: EdituserComponent },
      { path: 'epaper/category', component: CategoriesComponent },
      { path: 'epaper/category/add', component: CategoryDialogComponent },
      { path: 'epaper/category/edit/:id', component: EditcategoryComponent },
      { path: 'epaper/category/featured', component: FeaturedcategoriesComponent },
      { path: 'epaper/edition', component: EditionsComponent },
      { path: 'epaper/edition/add', component: NeweditionComponent },
      { path: 'epaper/edition/edit/:id', component: EditeditionComponent },
      { path: 'epaper/edition/featured', component: FeaturededitionComponent },
      { path: 'edition/supplement/view/:id', component: SupplimentpagesComponent },
      { path: 'edition/supplement/add', component: NewsupplimentComponent },
      { path: 'header/manage', component: ManageHeaderComponent },
      { path: 'epaper/edition/map/:id', component: CreateAreaMapComponent },
      { path: 'epaper/edition/preview/:name/:id', component: PreviewEditionComponent },
      { path: 'epaper/edition/upload-pages/edit/:eid/:id', component: EditPagesComponent },
      { path: 'ads/view', component: AdminAdViewComponent },
      { path: 'ads/add', component: AdminAdComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
