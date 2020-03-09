import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static:false})nameInputRef: ElementRef;
  @ViewChild('amountInput', {static:false})amountInputRef: ElementRef;
  // @Output() ingredientAdded= new EventEmitter<{name:string, amount: number}>();
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
  }

  onAddItem(){
    const newIngredient= new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    console.log(newIngredient)
    // this.ingredientAdded.emit(newIngredient)
    this.shoppingService.onIngredientAdded(newIngredient)
    this.nameInputRef.nativeElement.value='';
    this.amountInputRef.nativeElement.value='';
  }

}
