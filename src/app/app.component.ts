import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {animate, group, query, style, transition, trigger} from '@angular/animations';
import {timer} from 'rxjs';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%'
          })
        ], {optional: true}),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: '0',
              transform: 'translateX(-100px)'
            }))
          ], {optional: true}),
          query(':enter', [
            style({
              opacity: '0',
              transform: 'translateX(100px)'
            }),
            animate('200ms 100ms ease-out', style({
              opacity: '1',
              transform: 'translateX(0)'
            }))
          ], {optional: true})
        ])
      ]),

      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%'
          })
        ], {optional: true}),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: '0',
              transform: 'translateX(100px)'
            }))
          ], {optional: true}),
          query(':enter', [
            style({
              opacity: '0',
              transform: 'translateX(-100px)'
            }),
            animate('200ms 100ms ease-out', style({
              opacity: '1',
              transform: 'translateX(0)'
            }))
          ], {optional: true})
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  datetime: Observable<Date>

  ngOnInit(): void {
    this.datetime = timer(0, 1000).pipe(
      map(() => {
        return new Date()
      })
    )
  }

  // @ts-ignore
  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) return outlet.activatedRouteData['tabIndex'];
  }
}
