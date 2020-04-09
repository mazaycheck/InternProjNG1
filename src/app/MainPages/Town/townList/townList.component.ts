import { Component, OnInit } from '@angular/core';
import { TownService } from 'src/app/services/Repositories/town.service';
import { Town } from 'src/app/Models/Town';
import { ToastrService } from 'ngx-toastr';
import { faEdit, faTrash, faSave, faBan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-townList',
  templateUrl: './townList.component.html',
  styleUrls: ['./townList.component.css']
})
export class TownListComponent implements OnInit {
  DeleteIcon = faTrash;
  EditIcon = faEdit;
  SaveIcon = faSave;
  CancelIcon = faBan;
  towns: Town[];
  addMode = false;
  newTown: Town;
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
    this.newTown = new Town();
    this.addMode = false;
  }

  update(town: Town) {
    town.edit = true;
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
    this.repo.create(this.newTown).subscribe(
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
  }

  switchAddMode() {
    this.addMode = true;
  }

  editSave(town: Town) {
    town.title = this.newTown.title;
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
  }

}
