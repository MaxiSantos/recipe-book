import { Component, OnInit } from '@angular/core';

import { Cheef } from './';
import { CheefService } from './';
import { ApiService } from '../api.service';

@Component({
  selector: 'rb-cheef',
  templateUrl: './cheef.component.html',
  providers: [ ApiService ]
})
export class CheefComponent implements OnInit {
  private cheef: Cheef;
  constructor(
    public cs: CheefService,
  ) { }

  ngOnInit() {
    this.cs.getCheef().subscribe(
      (cheef: Cheef) => {
        this.cheef = cheef;
      }
    );
  }

}
