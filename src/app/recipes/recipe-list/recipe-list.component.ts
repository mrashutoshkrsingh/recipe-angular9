import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // @Output() recipeWasSelected= new EventEmitter<Recipe>();
  recipes: Recipe[];
  recipeSubscription:Subscription;
  constructor(private recipeService:RecipeService, private router: Router, private route:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.recipes=this.recipeService.getRecipes();
    this.recipeSubscription=this.recipeService.recipeAdded.subscribe((recipes:Recipe[])=>{
      console.log("Recipe Added")
      this.recipes=recipes;
    })
  }

  onNewClick(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }

  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe)
  // }

}
