import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() featureSelected= new EventEmitter<string>();

  isAuthenticated = false;
  authSubscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.getRecipes().subscribe();
  }

  onLogout() {
    this.authService.logOut();
  }
  // onSelect(feature:string){
  //   this.featureSelected.emit(feature);
  // }
}
