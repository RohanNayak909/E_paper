import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { SidenavComponent } from './component/layout/sidenav/sidenav/sidenav.component';
import { LoginComponent } from './component/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { CategoriesComponent } from './component/admin/categories/categories.component';
import { FeaturedcategoriesComponent } from './component/admin/featuredcategories/featuredcategories.component';
import { EditionsComponent } from './component/admin/editions/editions.component';
import { CategoryDialogComponent } from './component/admin/categories/newcategory/category-dialog.component';
import { NeweditionComponent } from './component/admin/editions/newedition/newedition.component';
import { EditeditionComponent } from './component/admin/editions/editedition/editedition.component';
import { EditcategoryComponent } from './component/admin/categories/editcategory/editcategory.component';
import { AddtohomeeditionComponent } from './component/admin/editions/addtohomeedition/addtohomeedition.component';
import { FeaturededitionComponent } from './component/admin/featurededition/featurededition.component';
import { ViewusersComponent } from './component/admin/users/viewusers/viewusers.component';
import { NewuserComponent } from './component/admin/users/newuser/newuser.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ManageHeaderComponent } from './component/admin/manage-header/manage-header.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BhubaneswarPaperComponent } from './component/bhubaneswar-paper/bhubaneswar-paper.component';
import { UploadPagesComponent } from './component/admin/editions/upload-pages/upload-pages.component';
import { EditPagesComponent } from './component/admin/editions/upload-pages/edit-pages/edit-pages.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { EdituserComponent } from './component/admin/users/edituser/edituser.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from './Guards/auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderCategoryComponent } from './component/header-category/header-category.component';
import {MatNativeDateModule} from '@angular/material/core';
import { CreateAreaMapComponent } from './component/admin/editions/upload-pages/create-area-map/create-area-map.component';
import { SupplimentpagesComponent } from './component/admin/editions/supplimentpages/supplimentpages.component';
import { NewsupplimentComponent } from './component/admin/editions/supplimentpages/newsuppliment/newsuppliment.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { EditProfileComponent } from './component/user-profile/edit-profile/edit-profile.component';
import { PreviewSectionComponent } from './component/header-category/preview-section/preview-section.component';
import { AdminAdComponent } from './component/admin/admin-ad/admin-ad.component';
import { AdminAdViewComponent } from './component/admin/admin-ad/admin-ad-view/admin-ad-view.component';
import { EditAdDialogComponent } from './component/admin/admin-ad/edit-ad-dialog/edit-ad-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SidenavComponent,
    CategoriesComponent,
    CategoryDialogComponent,
    EditcategoryComponent,
    FeaturedcategoriesComponent,
    EditionsComponent,
    NeweditionComponent,
    EditeditionComponent,
    AddtohomeeditionComponent,
    FeaturededitionComponent,
    ViewusersComponent,
    NewuserComponent,
    ManageHeaderComponent,
    BhubaneswarPaperComponent,
    UploadPagesComponent,
    EditPagesComponent,
    EdituserComponent,
    SupplimentpagesComponent,
    NewsupplimentComponent,
    HeaderCategoryComponent,
    CreateAreaMapComponent,
    UserProfileComponent,
    EditProfileComponent,
    PreviewSectionComponent,
    AdminAdComponent,
    AdminAdViewComponent,
    EditAdDialogComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    HttpClientModule,
    MatDatepickerModule,
    MatTabsModule,
    DragDropModule,
    NgMultiSelectDropDownModule,
    NgxPaginationModule,
    MatNativeDateModule,
    NgxSpinnerModule,
    MatSlideToggleModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
