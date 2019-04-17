# Smartparking

WARGING!!! We don`t add dependences of angular to gitRepository , so u need to install :

1)ng new ng4fbbootstrap --skip-install //bootstrap-css dependence

2)npm install --save bootstrap@next

3)npm install --save @ng-bootstrap/ng-bootstrap //for bootsrap js modules

4)in app.module.ts check imports:*import { NgbModule } from '@ng-bootstrap/ng-bootstrap'(on top); *NgbModule.forRoot() -(in imports[])

5) npm install --save @angular/material @angular/cdk hammerjs

7) npm install --save @agm/core

8) npm install --save @google/maps

9) npm install @types/uuid --save
(UUID generator.)

10) npm install --save @auth0/angular-jwt

11) npm install --save jwt-decode

12) npm install http-status-codes --save

      
12.npm install ngx-bootstrap --save  To display calendar  in spot statistic  you must install it.


13) npm install --save @types/googlemaps
 
14) npm install --save @types/leaflet

15) npm install --save @asymmetrik/ngx-leaflet

16) npm install --save agm-direction

17) npm install chart.js --save

18) npm install google-distance-matrix --save
    

If u don`t understand please follow this guide https://medium.com/codingthesmartway-com-blog/building-an-angular-5-project-with-bootstrap-4-and-firebase-4504ff7717c1(without installing the firebase)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
