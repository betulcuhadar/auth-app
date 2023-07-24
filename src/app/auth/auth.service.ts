import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.module';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  userUid: string = '';
  user = new BehaviorSubject<User | null>(null);

  constructor(
    private firestoreService: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.firebaseAuth.authState.subscribe((user) => {
          if (user) {
            this.userUid = user.uid;
            let newUser = new User(email, user.uid);
            this.user.next(newUser);
          }
          this.router.navigate(['/homepage']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async logout() {
    try {
      await this.firebaseAuth.signOut();
      this.user.next(null);
      localStorage.removeItem('name');
      this.router.navigate(['/login']);
    } catch (error: any) {
      window.alert('Error logging out: ' + error.message);
    }
  }

  async getUsername() {
    await this.firestoreService.firestore
      .collection('users')
      .doc(this.userUid)
      .get()
      .then((doc: any) => {
        if (doc.exists) {
          localStorage.setItem('name', doc.data().name);
        }
      });
  }
}
