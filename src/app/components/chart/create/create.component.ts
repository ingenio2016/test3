import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../../providers/chart.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Chart } from '../../../interfaces/chart.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  // chart Object to FormControls
  chart: Chart = {
    id: '',
    name: '',
    categories: [
      {
        name: '',
        value: 0,
      }
    ]
  };
  forma: FormGroup;
  constructor( private _chartService: ChartService, private formBuilder: FormBuilder ) {
    this.forma = new FormGroup({
      'id': new FormControl(''),
      'name': new FormControl('', Validators.required),
      'categories': this.init_categories( this.chart.categories )
    });
    this._chartService.loadCharts().subscribe( () => {
    });

    this.forma.setValue(this.chart);
  }

  ngOnInit() {
  }

  resetForm() {
    this.forma = new FormGroup({
      'id': new FormControl(''),
      'name': new FormControl(''),
      'categories': this.init_categories( this.chart.categories )
    });
  }

  init_categories(categories: any) {
    const arrayForm = new FormArray([]);

    for ( const category of categories ){

      const catGroup = new FormGroup({
        'name': new FormControl( category.name, Validators.required ),
        'value': new FormControl( category.value, Validators.required )
      });

      arrayForm.push( catGroup );

    }

    return arrayForm;
  }


  newGroup() {
    this.resetForm();
    this.forma.reset(this.chart);
    console.log(this.forma);
  }

  save() {
    console.log(this.forma);
    if (this.forma.controls['id'].value === '' || this.forma.controls['id'].value === null) {
      this._chartService.saveChart(this.forma.value).then( (group) => {
        console.log('Se Creó el Grupo', group);
        this.resetForm();
        this.forma.reset(this.chart);
      });
    }else {
      this._chartService.updateChart(this.forma.value).then( (group) => {
        console.log('Se Modificó el Grupo', group);
        this.resetForm();
        this.forma.reset(this.chart);
      });
    }
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      'name': new FormControl( '', Validators.required ),
      'value': new FormControl( '', Validators.required )
    });
  }

  addCategory () {
    const control = <FormArray>this.forma.controls['categories'];
    control.push(this.createItem());
  }

  getChart(id: string) {
    this.resetForm()
    this.setDataForm( this._chartService.getChart(id) );
  }

  setDataForm(data: Chart) {
    this.forma = new FormGroup({
      'id': new FormControl(data.id),
      'name': new FormControl(data.name),
      'categories': this.init_categories( data.categories )
    });
  }
}
