import { Component, OnInit, AnimationStyles } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import { AngularFireStorage , AngularFireStorageReference , AngularFireUploadTask} from 'angularfire2/storage';
import * as firebase from 'firebase/app';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';





@Component({
  selector: 'app-myillness',
  templateUrl: './myillness.component.html',
  styleUrls: ['./myillness.component.css'],
})
export class MyillnessComponent implements OnInit {
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
    fileId: '',
    email: ''
   };

   angularForm = new FormGroup ({
    name: new FormControl(),
    phone: new FormControl(),
    comments: new FormControl(),
    illness: new FormControl(),
    province: new FormControl(),
    price: new FormControl(),
    imageURL: new FormControl(),
  });

    itemList: AngularFireList<any>;
    itemArray = [];
    myUid: any;
    loading = true;
    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;
    downloadURL: Observable<string>;

  constructor(private afStorage: AngularFireStorage , public db: AngularFireDatabase , public router: Router, private fb: FormBuilder) {
    this.data.fileId = localStorage.getItem('fileId');
    this.createForm();
    this.itemList = db.list('illness', ref => ref. orderByChild('decs'));

    this.itemList.snapshotChanges()
    .subscribe(actions => {
          actions.forEach(action => {
            const y = action.payload.toJSON();
            y['$key'] = action.key;
            this.itemArray.push(y as ListItemClass);
            this.userKey = action.key;
            this.loading = false;


});
    });

this.myUid =  localStorage.getItem('uid');
    console.log(this.itemArray);
   }



   createForm() {
    this.angularForm = this.fb.group({
      name: ['', Validators.required ],
      phone: ['', Validators.required ],
      comments: ['', Validators.required ],
      illness: ['', Validators.required ],
      province: ['', Validators.required ],
      price: ['', Validators.required ],
      imageURL: ['', Validators.required ],

    });
}






   editForm( $key) {

    for (const value of  this.itemArray) {
      if (value['$key'] === $key) {
        console.log(value['$key']);
        this.data.name = value['name'] ;
        this.data.phone = value['phone'] ;
        this.data.comments = value['comments'] ;
        this.data.illness = value['illness'] ;
        this.data.province = value['province'] ;
        this.data.price = value['price'] ;
        this.data.imageURL = value['imageURL'] ;
        this.data.uid = value['uid'] ;
        this.data.fileId = value['fileId'];
        this.data.email = value['email'];
      }

    }

  }

  onEdit( $key ) {
    const  d = new Date();
    const time = [d.getMonth() + 1,
                d.getDate(),
                d.getFullYear()].join('/') + ' ' +
               [d.getHours(),
                d.getMinutes(),
           d.getSeconds()].join(':');
    this.data.name;
    this.data.phone;
    this.data.comments;
    this.data.illness;
    this.data.province;
    this.data.price;
    this.data.imageURL;
    this.data.uid;
    this.data.fileId;
    this.data.email;

    this.router.navigate(['/details/' + $key]);
    this.itemList.set($key , {
      name : this.data.name ,
      phone :  this.data.phone ,
      comments : this.data.comments ,
      illness :  this.data.illness ,
      province :  this.data.province ,
      price :  this.data.price,
      imageURL : this.data.imageURL,
      uid : this.data.uid,
      decs: 0 - Date.now(),
      time: time,
      fileId: this.data.fileId,
      email: this.data.email
    }).then(() => {
      alert('تم تحديث الحالة المرضية بنجاح ');
    });
    this.itemArray = [];

    }

  onDelete( $key) {
    if (confirm('هل انت متأكد من الحذف؟')) {
      this.itemList.remove($key).then(() => {
        this.itemArray = [];
        alert('تم الحذف بنجاح');
      }).catch((error) => {
        console.log(error);
      });
  }
  this.router.navigate(['/allillnesses']);
  }

  deleteImage() {
    if (this.data.fileId !== '') {
    firebase.storage().ref(this.data.fileId).delete().then(() => {
      console.log('deleted Image : ' + this.data.fileId);
    });
    }}



  upload(event ) {
    this.itemArray = [];
    console.log('Start Upload Image');
    const id = Math.random().toString(36).substring(2);
    this.afStorage.upload(id, event.target.files[0]).then(() => {
    const task = this.ref = this.afStorage.ref(id);
    const downloadURL = this.ref.getDownloadURL().subscribe(url => {
    console.log('new file ID  : ' + id);
    console.log('Old file ID  : ' + this.data.fileId);

    if (this.data.fileId !== '') {
    firebase.storage().ref(this.data.fileId).delete().then(() => {
      console.log('deleted Image : ' + this.data.fileId);
    });
    }

    this.itemList.update(this.userKey , {
      name : this.data.name  ,
      phone :  this.data.phone ,
      comments : this.data.comments ,
      illness :  this.data.illness ,
      province :  this.data.province ,
      price :  this.data.price ,
      imageURL : this.data.imageURL = url,
      fileId : this.data.fileId = id,
      uid : this.data.uid,
      email: this.data.email
    });
    console.log('updated data');
    alert('تم تحديث الصورة بنجاح ');
    });
    });
    }


  ngOnInit() {

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
