import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import {map} from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http: HttpClient, private recipeService: RecipeService){}

    storeRecipes(){
        const recipes= this.recipeService.getRecipes();
      this.http.put('https://recipe-angular-63772.firebaseio.com/recipes.json',recipes).subscribe(response=>{
          console.log(response)
      })
    }

    getRecipes(){
        this.http.get<Recipe[]>('https://recipe-angular-63772.firebaseio.com/recipes.json').pipe(map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe, ingredients:recipe.ingredients? recipe.ingredients:[]} 
            })
        })).subscribe((response)=>{
          console.log(response)
          this.recipeService.setRecipes(response);
      })
    }
}