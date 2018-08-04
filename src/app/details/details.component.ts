import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import { AngularFireStorage , AngularFireStorageReference , AngularFireUploadTask} from 'angularfire2/storage';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  loading = true;
id: any;
userKey: string;
data = {
  name : '' ,
  phone :  '' ,
  comments :  '' ,
  illness :  '' ,
  province :  '' ,
  price :  '',
  imageURL : '',
  uid : '',
  email: '',
  time: ''
 };

itemList: AngularFireList<any>;
itemArray = [];
myUid: any;
ref: AngularFireStorageReference;
 task: AngularFireUploadTask;
 downloadURL: Observable<string>;


  constructor(private afStorage: AngularFireStorage , public db: AngularFireDatabase , private route: ActivatedRoute) {

    this.route.params.subscribe( params => {
      this.id = params;
    } );

    this.itemList = db.list('illness');

    this.itemList.snapshotChanges()
    .subscribe(actions => {
          actions.forEach(action => {
            const y = action.payload.toJSON();
            y['$key'] = action.key;
           if (action.key === this.id['id'] ) {
            this.itemArray.push(y as ListItemClass);
           this.data.name = this.itemArray[0]['name'];
           this.data.phone = this.itemArray[0]['phone'];
           this.data.comments = this.itemArray[0]['comments'];
           this.data.illness = this.itemArray[0]['illness'];
           this.data.province = this.itemArray[0]['province'];
           this.data.price = this.itemArray[0]['price'];
           this.data.imageURL = this.itemArray[0]['imageURL'];
           this.data.email = this.itemArray[0]['email'];
           this.data.time = this.itemArray[0]['time'];
           this.loading = false;
            console.log(this.itemArray[0]  );
                   }

});
});

  }

  ngOnInit() {

    console.log(this.id['id']);
    console.log(this.data);
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
  email: string;
}
