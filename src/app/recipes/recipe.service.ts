import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  // recipeSelected=new EventEmitter<Recipe>();
  recipeSelected=new Subject<Recipe>();

  private recipes: Recipe[]=[
    new Recipe('Test','A test Recipe','https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=735&q=80',[
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)
    ]),
    new Recipe('Another One','A new Recipe','https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',[
      new Ingredient('Meat', 2),
      new Ingredient('Bread', 4)
    ])
  ];
  constructor(private shoppingService:ShoppingService) { }

  getRecipes(){
    return this.recipes.slice(); //copy
  }

  getRecipeByIndex(i:number){
    return this.recipes.slice()[i]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingService.onIngredientsAdded(ingredients)
  }

}
