import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage , AngularFireStorageReference , AngularFireUploadTask} from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  public isUpload: Boolean = false;



  email: string;
  myid: string;
  itemList: AngularFireList<any>;

itemArray = [];

  data = {
    name : '' ,
    age :  '' ,
    phone :  '' ,
    address :  '' ,
    city :  '' ,
    illness :  '' ,
    email: '',
    image: '',
    fileId: ''
   };
 spinner: boolean = true;
 redirect: boolean = false;
   userKey: any;

   ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  downloadURL: Observable<string>;
  imageURL: string;

  constructor(private afStorage: AngularFireStorage , public db: AngularFireDatabase, public router: Router ) {
    const status = localStorage.getItem('isUpload');
    console.log(status);
    if (status === 'true') {
      this.isUpload = true;
    } else {
      this.isUpload = false;
    }


    this.email = localStorage.getItem('email');
    this.myid = localStorage.getItem('uid');
if (this.redirect === false) {''}

    this.itemList = db.list('users');

    this.itemList.snapshotChanges()
    .subscribe(actions => {
          actions.forEach(action => {
            const y = action.payload.toJSON();
            y['$key'] = action.key;
            // tslint:disable-next-line:no-unused-expression
            this.userKey;

            if (action.payload.child('uid').val() === this.myid ) {
              this.userKey = action.key;
              this.itemArray.push(y as ListItemClass);
             this.data.name = this.itemArray[0]['name'];
             this.data.phone = this.itemArray[0]['phone'];
             this.data.age = this.itemArray[0]['age'];
             this.data.address = this.itemArray[0]['address'];
             this.data.city = this.itemArray[0]['city'];
             this.data.illness = this.itemArray[0]['illness'];
             this.data.email = this.itemArray[0]['email'];
             this.data.image = this.itemArray[0]['image'];
             this.spinner = false;

                     }
});
    });

  }

  ngOnInit() {
    console.log(this.email);
    console.log(this.myid);

  }





  updateUpload(event ) {
    this.isUpload = true;
    localStorage.setItem('isUpload', 'true');

    this.itemArray = [];
    console.log('start upload');
    const id = Math.random().toString(36).substring(2);
    this.afStorage.upload(id, event.target.files[0]).then(() => {
    const task = this.ref = this.afStorage.ref(id);
    const downloadURL = this.ref.getDownloadURL().subscribe(url => {
    console.log('new file ID  : ' + id);
    console.log('Old file ID  : ' + this.data.fileId);
    if (this.data.fileId !== '') {
    firebase.storage().ref(this.data.fileId).delete().then(() => {
      console.log('deleted file : ' + this.data.fileId);
    });
    }
    this.itemList.update(this.userKey , {
      name : this.data.name  ,
      phone :  this.data.phone ,
      age : this.data.age ,
      illness :  this.data.illness ,
      address :  this.data.address ,
      city :  this.data.city ,
      email: this.email,
      image : this.imageURL = url,
      fileId : this.data.fileId = id,
      uid : this.myid
    });
    console.log('updated data');
    });
    });

    }


  onEdit( ) {


    this.itemList.set(this.userKey , {
      name : this.data.name  ,
      phone :  this.data.phone ,
      age : this.data.age ,
      address :  this.data.address ,
      city :  this.data.city ,
      illness :  this.data.illness ,
      email: this.email,
      uid: this.myid,
      image: this.data.image
    });

  }


}



export class ListItemClass {
  $key: string;
  name: string;
  age:  string;
  phone:  string;
  address:  string;
  city: string;
  illness:  string;
  email: string;
}

