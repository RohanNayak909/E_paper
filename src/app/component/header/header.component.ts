import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: any = [
    {
      'id': 1,
      'name': 'Bhubaneswar'
    },
    {
      'id': 2,
      'name': 'Khordha'
    },
    {
      'id': 3,
      'name': 'Angul'
    },
    {
      'id': 4,
      'name': 'Balasore'
    },
    {
      'id': 5,
      'name': 'Cuttack'
    },
    {
      'id': 6,
      'name': 'Panikoili'
    },
    {
      'id': 7,
      'name': 'Jeypore'
    },
    {
      'id': 8,
      'name': 'KBK'
    },
    {
      'id': 9,
      'name': 'Kendrapada'
    },
    {
      'id': 10,
      'name': 'Kendujhar'
    },
    {
      'id': 11,
      'name': 'Mayurbhanj'
    },
    {
      'id': 12,
      'name': 'Puri'
    },
    {
      'id': 13,
      'name': 'Rourkela'
    },
    {
      'id': 14,
      'name': 'Sambalpur'
    },
    {
      'id': 15,
      'name': 'Berhampur'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
