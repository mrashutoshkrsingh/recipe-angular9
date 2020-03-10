import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static:false})nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static:false})amountInputRef: ElementRef;
  @ViewChild('f', {static:false})slForm: NgForm;

  // @Output() ingredientAdded= new EventEmitter<{name:string, amount: number}>();

  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.subscription=this.shoppingService.startedEditing.subscribe((index:number)=>{
      this.editedItemIndex=index;
      this.editMode=true;
      this.editedItem=this.shoppingService.getIngredient(index);
      this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onAddItem(form:NgForm){
    //console.log(form)
    const {name,amount}=form.value;
    const newIngredient= new Ingredient(name,+amount);
    if(this.editMode){
      this.shoppingService.onIngredientAdded(newIngredient, this.editedItemIndex)
    }
    else{
      this.shoppingService.onIngredientAdded(newIngredient)
    }
    this.onFormClear();
  //  const newIngredient= new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    //console.log(newIngredient)
    // this.ingredientAdded.emit(newIngredient)
    // this.shoppingService.onIngredientAdded(newIngredient)
    // this.nameInputRef.nativeElement.value='';
    // this.amountInputRef.nativeElement.value='';

    // console.log(this.fInputRef);
  }

  onFormClear(){
    // this.slForm.setValue({
    //   name:'',
    //   amount:''
    // })
    this.slForm.reset();
    this.editMode=false;
  }

  onDeleteItem(){
    this.shoppingService.onIngredientDelete(this.editedItemIndex)
    this.editMode=false;
  }

}
