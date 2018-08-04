import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  itemList: AngularFireList<any>;
  user: Observable<firebase.User>;
  public isLoggedIn: Boolean = false;
  email = '';
  password = '';
  emailResetPassword = '';


  angularForm = new FormGroup ({
  email: new FormControl(),
  password: new FormControl(),
  emailResetPassword: new FormControl()
  });

  constructor(public db: AngularFireDatabase , private fire: AngularFireAuth , private router: Router, private fb: FormBuilder) {
    this.createForm();
    this.itemList = db.list('users');

    const status = localStorage.getItem('isLoggedIn');
    console.log(status);
    if (status === 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  createForm() {
    this.angularForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ],
      emailResetPassword: ['', Validators.required ],
    });
}

  ngOnInit() {

  }

// ResetPassword

  resetPassword() {
    this.fire.auth.sendPasswordResetEmail(this.emailResetPassword).then(() => {
      alert('تم أرسال رابط تغير كلمة السر بنجاح !');
    }).catch((error) => {
 console.log(error);
 alert(error);
    });
    this.emailResetPassword = '';
}

// Rejister


myRegister() {

  this.fire.auth.createUserWithEmailAndPassword(this.email, this.password)
  .then(user => {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', this.fire.auth.currentUser.email );

    this.fire.authState.subscribe(auth => {
      if (auth) {
        localStorage.setItem('uid', auth.uid );
this.itemList.push({
  email: this.email ,
  uid : auth.uid,
  name : ''  ,
  phone :  '' ,
  age : '' ,
  address :  '' ,
  city :  '' ,
  illness : '',

  image: 'assets/img/person.png'
});
      }
    });


    this.router.navigate(['home']);
  }).catch( error => {
    console.error(error);
    alert(error);

  });


}

signInWithFacebook() {
  this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  .then(user => {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', this.fire.auth.currentUser.email );

    this.fire.authState.subscribe(auth => {
      if (auth) {
        localStorage.setItem('uid', auth.uid );
this.itemList.push({
  email: this.email ,
  uid : auth.uid,
  name : ''  ,
  phone :  '' ,
  age : '' ,
  address :  '' ,
  city :  '' ,
  illness : '',

  image: 'assets/img/person.png'
});
      }
    });

    this.router.navigate(['home']);
  }).catch( error => {
    console.error(error);
    alert(error);
  });
}

signInWithGoogle() {
  this.fire.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider())
  .then(user => {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', this.fire.auth.currentUser.email );

    this.fire.authState.subscribe(auth => {
      if (auth) {
        localStorage.setItem('uid', auth.uid );
this.itemList.push({
  email: this.email ,
  uid : auth.uid,
  name : ''  ,
  phone :  '' ,
  age : '' ,
  address :  '' ,
  city :  '' ,
  illness : '',

  image: 'assets/img/person.png'
});
      }
    });

    this.router.navigate(['home']);
  }).catch( error => {
    console.error(error);
    alert(error);
  });
}


signInWithTwitter() {
  this.fire.auth.signInWithPopup( new firebase.auth.TwitterAuthProvider())
  .then(user => {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', this.fire.auth.currentUser.email );

    this.fire.authState.subscribe(auth => {
      if (auth) {
        localStorage.setItem('uid', auth.uid );
this.itemList.push({
  email: this.email ,
  uid : auth.uid,
  name : ''  ,
  phone :  '' ,
  age : '' ,
  address :  '' ,
  city :  '' ,
  illness : '',

  image: 'assets/img/person.png'
});
      }
    });

    this.router.navigate(['home']);
  }).catch( error => {
    console.error(error);
    alert(error);
  });
}





















// logOut and LogIn

  logout() {
    this.fire.auth.signOut();
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('email', '' );
    localStorage.setItem('uid', '' );

    this.router.navigate(['/home']);
  }

  myLogin() {
    this.fire.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(user => {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email', this.fire.auth.currentUser.email );

      this.fire.authState.subscribe(auth => {
        if (auth) {
  localStorage.setItem('uid', auth.uid );

        }
      });
    this.router.navigate(['/home']);
    }).catch(error => {
      console.error(error);
      alert(error);
    });
  }


  logInWithFacebook() {
    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(user => {
      this.isLoggedIn = true;
      console.log(this.email, this.password);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email', this.fire.auth.currentUser.email );

      this.fire.authState.subscribe(auth => {
        if (auth) {
          localStorage.setItem('uid', auth.uid );

        }
      });

      this.router.navigate(['/home']);
    }).catch( error => {
      console.error(error);
      alert(error);
    });

  }


  logInWithGoogle() {
    this.fire.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(user => {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email',
      this.fire.auth.currentUser.email );

      this.fire.authState.subscribe(auth => {
        if (auth) {
          localStorage.setItem('uid', auth.uid );

        }
      });

      this.router.navigate(['/home']);
    }).catch( error => {

      console.error(error);
      alert(error);
    });

  }

  logInWithTwitter() {
    this.fire.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
    .then(user => {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email',
      this.fire.auth.currentUser.email );

      this.fire.authState.subscribe(auth => {
        if (auth) {
          localStorage.setItem('uid', auth.uid );

        }
      });

      this.router.navigate(['/home']);
    }).catch( error => {

      console.error(error);
      alert(error);
    });

  }
}

