import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModeluserDetails } from 'src/app/models/modeluserdetails';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { UserService } from 'src/app/services/userservice/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('fileUploader')
  myInputVariable!: ElementRef;
  User: any = {}
  currentuser: any
  addPost: any
  @ViewChild('profileImage')
  profileimg!: ElementRef;
  editprofile!: any
  newUser!: any
  searchval: any = ''
  visible:boolean = false
  showbtn:boolean = true
  hide = false;

  constructor(private router: Router, private loginService: LoginService, private notify: NotificationService, private updateuser: UserService) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.newUser = new ModeluserDetails()
    this.getuserdetails()

  }

  onclick()
  {
    this.showbtn = !this.showbtn; 
    this.visible = !this.visible
  }
  getuserdetails() {
    this.updateuser.getUserDetails(this.searchval, this.currentuser.user_id, this.currentuser.customer_id,'N').subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        data = data.map((dt: any) => JSON.parse(dt));
        this.newUser = data[0]
      } else {
        this.newUser = []
      }
    }, (err) => {
      this.newUser = []
    })
  }

  onback() {
    this.router.navigate(['admin/profile']);
  }

  onFileSelected(event: any) {
    this.newUser.Multiimages = <File>event.target.files[0];

    let bannerImg!: any;
    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    if ((this.newUser.Multiimages.type != 'image/jpeg') && (this.newUser.Multiimages.type != 'image/png')) {
      this.notify.error('This is not valid file format. Please upload jpg/png file only.');
      this.newUser.Multiimages = ''
      bannerImg = document.querySelector('#profileImage')
      bannerImg.src = 'assets/img/default-profile.png';
      this.profileimg.nativeElement.value = '';
    } else {
      Img.src = URL.createObjectURL(this.newUser.Multiimages);
      Img.onload = (e: any) => {
        const path = e.path || (e.composedPath && e.composedPath());
        const height = path[0].height;
        const width = path[0].width;
        if (height != width) {
          this.notify.error('Please choose image with same height and width');
          this.newUser.Multiimages = ''
          bannerImg = document.querySelector('#profileImage')
          bannerImg.src = '/assets/img/default-profile.png';
          this.profileimg.nativeElement.value = '';
        } else {
          bannerImg = document.querySelector('#profileImage');
          bannerImg.src = URL.createObjectURL(this.newUser.Multiimages);
        }
      }
    }
  }

  updateProfile() {
    if (this.newUser.Multiimages) {
      var reader = new FileReader();
      reader.readAsDataURL(this.newUser.Multiimages)
      reader.onload = function () {
      };
    }
    setTimeout(() => {
      if (this.newUser.Multiimages) {
        this.newUser.profile_ext = this.newUser.Multiimages.type.split("/")[1];
        this.newUser.base64file = reader.result
      }
      this.updateuser.updateProfile(this.newUser).subscribe((res: any) => {
        console.log(this.newUser,'dd')
        if (res.code === "success") {
          this.notify.success(res.message);
          this.getuserdetails()
        } else {
          this.notify.error(res.message)
        }
      }, (err: any) => {
        this.notify.error(err.message)
      })
    }, 1000);

  }
}




