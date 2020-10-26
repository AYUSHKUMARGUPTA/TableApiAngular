import { Component, OnInit } from '@angular/core';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State, CompositeFilterDescriptor, distinct } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {RestServiceService} from './../Services/rest-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  public aggregates: any[] = [];
  public state: State = {
    skip: 0,
    take: 25,
    group: [],
    filter: {
      logic: 'and',
      filters: [{ field: 'Title', operator: 'contains', value: '' }]
    }
  };
  public gridView: any = [];
  public filter: CompositeFilterDescriptor;
  public resultGridaData: any=[];
  public dataArr: any =[];

  constructor(private http: HttpClient ,public _restService: RestServiceService) { }

  ngOnInit(): void {

 this.getData();
  }
  public getData() {
     this._restService.getJsonData().subscribe(
      (data) => {
        this.dataArr.push(data);
       
       
       this.resultGridaData = this.dataArr.flat()
       this.showSurveyitem();
      },
      
    );
     
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    if (state && state.group) {
      state.group.map(group => group.aggregates = this.aggregates);
    }
    this.state = state;


    this.showSurveyitem();
  }
  private showSurveyitem() {
    this.gridView = process(this.resultGridaData, { group: this.state.group, filter: this.state.filter, take: this.state.take, sort: this.state.sort, skip: this.state.skip });
    this.allData = this.allData.bind(this);
  }
  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: process(this.resultGridaData, { group: this.state.group }).data,
    };

    return result;
  }
  toogleMethod(){

  }
  deleteItems(id,albumID){
    console.log(id,albumID)
    this.resultGridaData.splice(this.resultGridaData.findIndex(function(i){
      return i.id === id && i.albumId === albumID;
  }), 1);
  this.showSurveyitem();
  }
}
