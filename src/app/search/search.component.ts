import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GetAllDataService} from '../services/get-all-data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

itemList: Subscription;
public term: any;
items: any;


constructor(private router: Router, public db: GetAllDataService) {}

ngOnInit() {
  this.itemList = this.db.getData('illness').subscribe(items => {
    this.items = items;
  });
}

}
