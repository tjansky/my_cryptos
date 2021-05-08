import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    // if username or password is not set dont execute function
    const username = form.value.username;
    const password = form.value.password;

    if((username == '') || (password == ''))
      return;

      this.authService.register(username, password)
      .pipe(first())
      .subscribe(
        data => {
          // navigate to portfolio
          console.log(data);
          this.router.navigate(['/portfolio']);
      },
      error => {
        // show error msg
        console.log(error.error);
      });

  }

  onClickForLoginForm(){
    this.router.navigate(['/auth/login']);
  }

}
