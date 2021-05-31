import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CreateTransactionDto } from '../../shared/dtos/CreateTransactionDto';
import { ApiHelperService } from '../../shared/services/api-helper.service';
import { AppStateService } from '../../shared/services/app-state.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router, private appState: AppStateService) { }
  navActive: boolean = false;

  ngOnInit(): void {
  }

  onLogout(){
    // removing coin data od current user
    this.appState.updateCoinList(null);

    // emptying currentUser subject and removing token from local storage
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  toggleNavigation(){
    this.navActive = !this.navActive;
    
    // if navActive is true set left margin bigger as side bar is with transition (230px)

    // else put left margin on default (60px)

  }

}
