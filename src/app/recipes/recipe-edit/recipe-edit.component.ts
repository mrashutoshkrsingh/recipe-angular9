import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { format } from 'path';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id:number;
  editMode:boolean=false;
  recipeForm: FormGroup;
  routeSubscription:Subscription;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.routeSubscription=this.route.params.subscribe((params:Params)=>{
      console.log(params)
      this.id=params['id'];
      this.editMode=!!params['id']?true:false;
      this.initForm()
    })    
  }

  ngOnDestroy(){
    this.routeSubscription.unsubscribe();

  }

  private initForm(){
    console.log("initForm")
    let recipe:Recipe;
    if(this.editMode){
      recipe=this.recipeService.getRecipeByIndex(this.id)
    }
    console.log(recipe)
    let ingredientsItems=new FormArray([]);
    if(recipe && recipe.ingredients){
      for(let ingredient of recipe.ingredients ){
        ingredientsItems.push(new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount,[ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }))
      }
    }
    console.log(this.recipeForm)
    console.log("initForm2")
    this.recipeForm = new FormGroup({
      'name': new FormControl((recipe && recipe.name) || '', Validators.required),
      'imagePath': new FormControl((recipe &&recipe.imagePath )|| '', Validators.required),
      'description': new FormControl((recipe && recipe.description) || '', Validators.required),
      'ingredients': ingredientsItems
      
    })
    console.log(this.recipeForm)
  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.editRecipe(this.recipeForm.value, this.id);  
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    // this.recipeService.addRecipe(new Recipe(...Object.values(this.recipeForm.value)))
    this.router.navigate(['../'], {relativeTo:this.route})
    // console.log(this.recipeService.getRecipes())
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>(this.recipeForm.get('ingredients'))).push(new FormGroup({
      'name': new FormControl(null, Validators.required) ,
      'amount': new FormControl(null,[ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  //  this.recipeService.addIngredientToRecipe() 
  }

  onDeleteFormArray(indd){
    // console.log(in)
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(indd);
    console.log(indd, this.recipeForm.get('ingredients'))
  }

}
