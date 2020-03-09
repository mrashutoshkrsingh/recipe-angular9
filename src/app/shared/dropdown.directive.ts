import { Directive, HostListener, HostBinding, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector:'[appDropdown]'

})
export class DropdownDirective implements OnInit{
    @HostBinding('class.open') isOpen=false;
    constructor(private elRef:ElementRef){

    }

    ngOnInit(){

    }
    // @HostListener('click') toggleOpen(){
    //     this.isOpen=!this.isOpen
    //     // this.el.nativeElement.classList.toggle('open')
    // }
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
      }
}