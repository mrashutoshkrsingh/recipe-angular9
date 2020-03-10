import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, DoCheck, OnDestroy {
  ingredients: Ingredient[];
  shoppingServiceSubscription:Subscription;
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.ingredients=this.shoppingService.getIngredients();
    this.shoppingServiceSubscription=this.shoppingService.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients=ingredients;
    })
  }

  ngOnDestroy(){
    this.shoppingServiceSubscription.unsubscribe();
  }

  ngDoCheck(){
  //   this.ingredients=this.shoppingService.getIngredients();

  }

  // onIngredientAdded(ingredient:Ingredient){
  //   // this.ingredients.push(ingredient);
  //   this.shoppingService.onIngredientAdded(ingredient)
  // }
}
