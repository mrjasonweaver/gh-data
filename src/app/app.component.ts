import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  animations: [
    trigger('routerAnimation', [
      transition('* <=> *', [
        // Initial state of new route
        query(':enter',
          style({
            opacity: 0,
            width: '100%',
            position: 'absolute',
            transform: 'scale(0.98)'
          }),
          { optional: true }),

        // move page off screen up on leave
        query(':leave',
          animate('50ms ease',
            style({
              opacity: 0,
              width: '100%',
              position: 'absolute',
              transform: 'scale(1.001)'
            })
          ),
        { optional: true }),

        // move page in screen from bottom to top
        query(':enter',
          animate('200ms ease',
            style({
              opacity: 1,
              width: '100%',
              transform: 'scale(1)'
            })
          ),
        { optional: true }),
      ])
    ])
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // change the animation state
  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
  }
}
