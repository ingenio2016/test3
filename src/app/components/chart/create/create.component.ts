import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../../providers/chart.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  // chart Object to FormControls
  chart: any = {
    id: '',
    name: '',
    categories: [{
      name: '',
      value: '',
    }]
  };
  forma: FormGroup;
  private chartGroup: any = [];
  constructor( private _chartService: ChartService, private formBuilder: FormBuilder ) {
    this.forma = this.formBuilder.group({
      id: '',
      name: '',
      categories: this.formBuilder.array([ this.createItem() ])
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      value: ''
    });
  }

  ngOnInit() {
    this._chartService.loadCharts().subscribe( () => {
    });
    this.forma.setValue(this.chart);
  }

  newGroup() {
    this.forma.reset(this.chart);
    console.log(this.forma);
  }

  save() {
    console.log(this.forma);
    if (this.forma.controls['id'].value === '' || this.forma.controls['id'].value === null) {
      console.log('Create');
      this._chartService.saveChart(this.forma.value).then( (group) => {
        console.log('Se Creó el Grupo', group);
        this.forma.reset(this.chart);
      });
    }else {
      console.log('Update');
      this._chartService.updateChart(this.forma.value).then( (group) => {
        console.log('Se Modificó el Grupo', group);
        this.forma.reset(this.chart);
      });
    }
  }

  addCategory () {
    (<FormArray>this.forma.controls['categories']).push(
      this.createItem()
    );
  }

  getChart(id: string) {
    this.forma.reset(this._chartService.getChart(id));
  }
}
