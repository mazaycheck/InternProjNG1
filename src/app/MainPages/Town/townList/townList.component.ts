import { Component, OnInit } from '@angular/core';
import { TownService } from 'src/app/services/Repositories/town.service';
import { Town } from 'src/app/Models/Town';
import { ToastrService } from 'ngx-toastr';
import { faEdit, faTrash, faSave, faBan } from '@fortawesome/free-solid-svg-icons';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-townList',
  templateUrl: './townList.component.html',
  styleUrls: ['./townList.component.css']
})
export class TownListComponent implements OnInit {
  DeleteIcon = faTrash;
  EditIcon = faEdit;
  SaveIcon = faSave;
  CancelIcon = faBan;
  towns: Town[] = [];
  addMode = false;
  temporaryTown: Town;
  constructor(private repo: TownService, private toast: ToastrService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.repo.getAll().subscribe(
      response => {
        this.towns = response;
      },
      error => {
        this.toast.error(error);
      }
    );
    this.temporaryTown = new Town();
    this.addMode = false;
  }

  update(town: Town) {
    this.turnUpdateOffOnAllEtries();
    town.edit = true;
    this.temporaryTown.title = town.title;
    this.addMode = false;
  }
  delete(town: Town) {
    this.repo.delete(town).subscribe(
      response => {
        this.toast.success('Deleted town with id : ' + town.title);
        this.refresh();
      },
      error => {
        this.toast.error('Could not delete town: ' + town.title);
      }
    );
  }

  save() {
    this.repo.create(this.temporaryTown).subscribe(
      response => {
        this.refresh();
      },
      error => {
        this.toast.error(error);
      }
    );
  }

  cancel() {
    this.addMode = false;
    this.temporaryTown = new Town();
  }

  turnUpdateOffOnAllEtries() {
    this.towns.forEach(element => {
      element.edit = false;
    });
  }

  switchAddMode() {
    this.addMode = true;
    this.turnUpdateOffOnAllEtries();
    this.temporaryTown = new Town();
  }

  editSave(town: Town) {
    if (town.title === this.temporaryTown.title) {
      town.edit = false;
      this.toast.info('No changes');
      return null;
    } else if (town.title.length === 0) {
      town.edit = false;
      town.title = this.temporaryTown.title;
      this.toast.warning('Cannot save empty string');
      return null;
    }
    this.repo.update(town).subscribe(
      respnse => {
        this.toast.success('Updated town with id: ' + town.townId);
        town.edit = false;
      },
      error => {
        this.toast.error('Could not upda town with id : ' + town.townId);
        town.edit = false;
      }
    );
  }
  editCancel(town: Town) {
    town.edit = false;
    town.title = this.temporaryTown.title;
  }

}
