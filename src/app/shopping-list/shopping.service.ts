import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  // ingredientsChanged= new EventEmitter<Ingredient[]>();
  ingredientsChanged= new Subject<Ingredient[]>();
  startedEditing=new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  constructor() { }

  getIngredients(){
    return this.ingredients.slice()
  }
  getIngredient(index:number){
    return this.ingredients.slice()[index]
  }

  onIngredientAdded(ingredient:Ingredient, index?:number){
    if(index){
      this.ingredients[index]=ingredient;
    }
    else{
      this.ingredients.push(ingredient);
    }
    // this.ingredientsChanged.emit(this.ingredients.slice())
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  onIngredientDelete(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice())

  }

  onIngredientsAdded(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice())
  }  
}
