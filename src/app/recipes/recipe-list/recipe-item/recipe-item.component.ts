import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 @Input() recipe:Recipe;
 @Input() index:number;
//  @Output() recipeSelected = new EventEmitter<void>();
  constructor(private recipeService:RecipeService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

  }
  // onSelected(e:Event){
  //   e.preventDefault();
  //  // this.recipeSelected.emit()
  // //  console.log(this.recipeService,this.recipeService.recipeSelected)
  // //  this.recipeService.recipeSelected.emit(this.recipe)
  //   this.router.navigate([`${this.index}`],{relativeTo:this.route})
  // }

}
