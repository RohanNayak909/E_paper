import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { Router } from '@angular/router';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';


@Component({
  selector: 'app-manage-header',
  templateUrl: './manage-header.component.html',
  styleUrls: ['./manage-header.component.css']
})
export class ManageHeaderComponent implements OnInit {

  constructor(private loginService: LoginService, private notify: NotificationService, private Categorydata: CategoryServiceService, private router: Router, private masterAPI: MasterServiceService) { }
  catarr: any[] = []
  categorySearch: any = '';
  catadata: any[] = []
  catid: any = ''
  headerarry: any[] = []
  currentuser: any = {};

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getallcategory();
    this.getallheaders()

  }
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    let unique = this.headerarry
      .map(e => e['id'])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((obj: any) => this.headerarry[obj])
      .map((e: any) => this.headerarry[e]);
    let duplicateIds = this.headerarry
      .map(e => e['id'])
      .map((e, i, final) => final.indexOf(e) !== i && i)
      .filter((obj: any) => this.headerarry[obj])
      .map((e: any) => this.headerarry[e]["id"])
    this.headerarry = unique;
    let duplicate = this.headerarry.filter(obj => duplicateIds.includes(obj.id));
    console.log(duplicate);
    console.log([...new Set(this.headerarry)])
  }
  getallcategory() {
    this.Categorydata.getAllCategory(this.catid, this.categorySearch,this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        //console.log(res.body);
        this.catarr = data.map((dt: any) => {
          let data = JSON.parse(dt)
          return { id: data.category_id, name: data.category_name };
        });
        console.log(this.catarr);
      } else {
        this.catarr = []
      }
    }, (err) => {
      this.catarr = []
    })
  }
  getallheaders() {
    this.masterAPI.getAllheaders(this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        //console.log(res.body);
        this.headerarry = data.map((dt: any) => {
          let data = JSON.parse(dt)
          return { id: data.category_id, name: data.category_name };
        });
        console.log(this.headerarry);
      } else {
        this.catarr = []
      }
    }, (err) => {
      this.headerarry = []
    })
  }
  updateHeader() {
    console.log(this.headerarry)
    let payload = {
      headers: this.headerarry,
      customer_id: this.currentuser.customer_id,
      createdby: this.currentuser.user_id
    }
    this.masterAPI.updateheader(payload).subscribe((res: any) => {
      if (res.code === "success") {
        this.notify.success(res.message);
        window.location.reload()
      } else {
        this.notify.error(res.message)
      }
    }, (err: any) => {
      this.notify.error(err.message)
    })

  }
}
