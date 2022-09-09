import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DishesService } from '../api.service';
declare var $: any;

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit  {

  admin: boolean = true;
  dishes: any; //Dish[] = [];
  retrievedImage: any;

  constructor(private api:DishesService, private router: Router) { } //private api:DishesService, private router: Router


  ngOnInit(): void {
    
    $("select").niceSelect()
    this.loadDishes()

    const dish1 = {
      name: 'arroz',
      popularity: 2,
      status: true
    }
    const dish2 = {
      name: 'salmon',
      popularity: 5,
      status: true
    }
    const dish3 = {
      name: 'pollo al horno',
      popularity: 3,
      status: false
    }
    this.dishes.push(dish1);
    this.dishes.push(dish2);
    this.dishes.push(dish3);
  }

  loadDishes() {
    this.api.getDishes().subscribe(
      response => {
        this.dishes = response
        console.log(response)
        if(this.dishes == null) console.log("undef")
        //this.retrievedImage = ;
      },
      error => {
        console.log("ERROR REQUEST")
      }
    )
  }

}

export interface Dish{
  name: string,
  popularity: number,
  status: boolean
}
