import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 @Input() recipe:Recipe;
//  @Output() recipeSelected = new EventEmitter<void>();
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {

  }
  onSelected(){
   // this.recipeSelected.emit()
  //  console.log(this.recipeService,this.recipeService.recipeSelected)
   this.recipeService.recipeSelected.emit(this.recipe)
  }

}
