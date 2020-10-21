import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LabelService} from '../../service/label/label.service';
import {log} from 'util';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InteractionService} from '../../service/search-data/interaction.service';

@Component({
  selector: 'app-create-label',
  templateUrl: './create-label.component.html',
  styleUrls: ['./create-label.component.scss']
})
export class CreateLabelComponent implements OnInit {
  flag = true;
  label: string;
  labelList = [];

  isLabelEdit = false;
  private message: any;
  private responseData: any;

  constructor(private labelService: LabelService,
              private snackBar: MatSnackBar,
              private interactionService: InteractionService) {
  }

  ngOnInit(): void {
    this.getLabelList();
  }

  labelEdit(): void {
    this.isLabelEdit = true;
  }

  reverseFlag(): void {
    this.flag = !this.flag;
  }

  addLabel(): void {
    const data = {
      label_Id: 0,
      note_Id: 0,
      labelName: this.label
    };
    this.callLabelService(data, 'create');
    this.label = '';
    this.isLabelEdit = false;
  }

  getLabelList(): void {
    this.labelService.getList()
      .subscribe(data => {
          this.labelList = data;
        },
        error => {
          this.responseData = error.error;
          this.openSnackBar('Dismiss');
        });
    this.interactionService.sendList(this.labelList);
  }

  openSnackBar(action): void {
    this.snackBar.open(this.responseData.message, action, {duration: 3000});
  }

  updateLabel(labelData: any): void {
    const data = {
      label_Id: labelData.label_Id,
      note_Id: 0,
      labelName: labelData.labelName
    };
    this.callLabelService(data, 'edit');
  }

  private callLabelService(data, url: string): void {
    this.labelService.createLabel(data, url)
      .subscribe(response => {
        this.responseData = response;
        this.openSnackBar('Dismiss');
        this.getLabelList();
      }, error => {
        this.responseData = error.error;
        this.openSnackBar('Dismiss');
      });
  }
}
