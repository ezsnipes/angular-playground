import "rxjs/add/operator/map";
import "rxjs/add/operator/take";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";

import { Crisis, CrisisService } from "./crisis.service";

@Injectable()
export class CrisisDetailResolver implements Resolve<Crisis> {
  constructor(private cs: CrisisService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Crisis> {
    const id = route.paramMap.get("id");

    return this.cs
      .getCrisis(id)
      .take(1)
      .map(crisis => {
        if (crisis) {
          return crisis;
        } else {
          // id not found
          this.router.navigate(["/crisis-center"]);
          return null;
        }
      });
  }
}

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
