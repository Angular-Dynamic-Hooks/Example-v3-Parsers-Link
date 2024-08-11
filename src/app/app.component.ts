import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  activeRouteComponent: any;

  constructor(public router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event) => {
      // This just finds out the name of the current component loaded in <router-outlet>
      this.activeRouteComponent = router.routerState.snapshot.root.children[0].component!['name'].replace('_', '');
    });
  }
  
}