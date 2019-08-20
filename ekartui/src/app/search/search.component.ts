import { Component, OnInit,Input } from '@angular/core';
import { SearchService } from './search.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { Products } from "../shared/Products";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

@Input() name:string;

searchVal:String;
displayName:string;
result :Products[];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.view()
    .subscribe
    (
      data=>{ 
        this.result=data;
        
      }
    );
    //console.log("hello ",this.result);
   } 
  
  search(){
    //this.searchValue=(<HTMLInputElement>document.getElementById('searchBar')).value;
    if(this.displayName !=""){
     this.result = this.result.filter(res=>{
       return res.displayName.toLocaleLowerCase().match(this.displayName.toLocaleLowerCase());
     })
     // if(this.result.length == 0){
        console.log("Search Result: ", this.result.length);
      //}
    }else if(this.displayName==""){
     this.ngOnInit();
    }
 }
}
