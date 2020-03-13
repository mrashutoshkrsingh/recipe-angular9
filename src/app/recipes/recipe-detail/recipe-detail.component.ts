import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe:Recipe;
   recipe:Recipe;
  index:number
  constructor(private shoppingService:ShoppingService,private recipeService:RecipeService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.index=+params['id'];
      this.recipe=this.recipeService.getRecipeByIndex(this.index)
    })
  }

  addToShoppingList(){
    this.shoppingService.onIngredientsAdded(this.recipe.ingredients)
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['../'],{relativeTo:this.route})
  }
}
