import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }


  onLogin() {
    this.authService.login('Lorena', 'test123')
        .pipe(first())
        .subscribe(
          data => {
            // navigate to portfolio
        },
        error => {
          // show error msg
        });
  }

}
