import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-generic-entity',
  templateUrl: './GenericEntity.component.html',
  styleUrls: ['./GenericEntity.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class GenericEntityComponent implements OnInit {


  @Input() service: any;
  entityList = [];
  temproraryEntity: { title: '', edit: boolean};
  addMode = false;
  displayedColumns = ['title', 'action'];
  newEntity =  {title: ''};

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.service.getAll().subscribe(
      response => {
        this.entityList = response;
      },
      error => {
        this.toastr.error(error);
      }
    );
    this.resetTempEntity();
    this.addMode = false;
  }

  update(entity) {
    this.turnUpdateOffOnAllEtries();
    entity.edit = true;
    this.resetTempEntity();
    this.temproraryEntity.title = entity.title;
    this.addMode = false;
  }
  delete(entity) {
    this.service.delete(entity).subscribe(
      response => {
        this.toastr.success('Deleted entity  : ' + entity.title);
        this.refresh();
      },
      error => {
        this.toastr.error('Could not delete entity: ' + entity.title);
      }
    );
  }

  createNewEntity() {
    this.service.create(this.newEntity).subscribe(
      response => {
        this.refresh();
        this.resetNewEntity();
      },
      error => {
        this.toastr.error(error);
      }
    );
  }

  cancel() {
    this.addMode = false;
    this.resetTempEntity();
  }



  turnUpdateOffOnAllEtries() {
    this.entityList.forEach(element => {
      element.edit = false;
    });
  }

  switchAddMode() {
    this.addMode = true;
    this.turnUpdateOffOnAllEtries();
    this.resetTempEntity();
  }

  editSave(entity) {
    if (entity.title === this.temproraryEntity.title) {
      entity.edit = false;
      this.toastr.info('No changes');
      return null;
    } else if (entity.title.length === 0) {
      entity.edit = false;
      entity.title = this.temproraryEntity.title;
      this.toastr.warning('Cannot save empty string');
      return null;
    } else {
      this.service.update(entity).subscribe(
        response => {
          this.toastr.success('Updated entity  ' + entity.title);
          this.refresh();
          entity.edit = false;
        },
        error => {
          this.toastr.error('Could not update entity : ' + entity.title);
          entity.edit = false;
        }
    );
  } this.temproraryEntity = new entity();
}
  editCancel(entity) {
    entity.edit = false;
    entity.title = this.temproraryEntity.title;
  }

  resetTempEntity() {
    this.temproraryEntity = { title: '', edit: false};
  }

  resetNewEntity() {
    this.newEntity = { title: ''};
  }

}
