import { Component, OnInit, DoCheck } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, DoCheck {
  ingredients: Ingredient[];
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.ingredients=this.shoppingService.getIngredients();
    this.shoppingService.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients=ingredients;
    })

  }
  ngDoCheck(){
  //   this.ingredients=this.shoppingService.getIngredients();

  }

  // onIngredientAdded(ingredient:Ingredient){
  //   // this.ingredients.push(ingredient);
  //   this.shoppingService.onIngredientAdded(ingredient)
  // }
}
