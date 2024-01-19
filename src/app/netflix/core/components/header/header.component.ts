import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  profileImage!: string;
  navlist = ['home', 'tv shows', 'news and popular', 'movies', 'my list', 'kids', 'subscriptions', 'originals'];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHome() {
    this.router.navigateByUrl('/');
  }

}
