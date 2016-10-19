import { Input, Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe';

@Component({
  selector: 'rb-favourite-item',
  templateUrl: './favourite-item.component.html'
})
export class FavouriteItemComponent implements OnInit {
  @Input() item: Recipe;
  constructor() { }

  ngOnInit() {
  }

}
