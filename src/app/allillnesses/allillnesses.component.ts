import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {GetAllDataService} from '../services/get-all-data.service';

@Component({
  selector: 'app-allillnesses',
  templateUrl: './allillnesses.component.html',
  styleUrls: ['./allillnesses.component.css']
})

export class AllillnessesComponent implements OnInit {
// itemList2: AngularFireList<any>;
itemList: Subscription;

// itemArray = [];
items: any;

  data = {
    name : '' ,
    phone :  '' ,
    comments :  '' ,
    illness :  '' ,
    province :  '' ,
    price :  '',
    date: ''
   };

   loading = true;
   p: any;
    constructor(public db: GetAllDataService , public router: Router, public AFDB: AngularFireDatabase ) {


  //     this.itemList2 = AFDB.list('/illness', ref => ref. orderByChild('decs'));
  //     this.itemList2.snapshotChanges()
  //     .subscribe(actions => {
  //           actions.forEach(action => {
  //             const y = action.payload.toJSON();
  //             y['$key'] = action.key;
  //             this.itemArray.push(y as ListItemClass);
  //             this.loading = false;
  // });
  //     });
  //     console.log(this.itemArray);
    }



ngOnInit() {


  this.itemList = this.db.getData('illness').subscribe(items => {
    this.items = items;
    this.loading = false;
  });


  }



    moreInfo(  key) {
      this.router.navigate(['details/' + key]);

    }


  }




  export class ListItemClass {
    $key: string;
    name: string;
    phone:  string;
    comments:  string;
    illness:  string;
    province: string;
    price:  string;
  }

