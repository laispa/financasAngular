import { Component, OnInit, Input } from '@angular/core';

interface BreadCrumbItem{
  text: string 
  link?: string
}

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  @Input() items: Array <BreadCrumbItem> = [];

  constructor() { }

  ngOnInit() {
  }

  isTheLastItem(item:BreadCrumbItem): boolean{
    // qual é o indice o item 
    const index = this.items.indexOf(item);
    //significa que é o ultimo indice do array
    return index + 1 == this.items.length; //pq o indice começa com 0
  }
}
