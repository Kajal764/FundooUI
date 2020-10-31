import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LabelService} from '../../service/label/label.service';
import {log} from 'util';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InteractionService} from '../../service/search-data/interaction.service';
import {NgxSpinnerService} from 'ngx-spinner';

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
              private interactionService: InteractionService,
              private spinner: NgxSpinnerService) {
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
    this.spinner.show();
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
    this.spinner.show();
    this.labelService.getList()
      .subscribe(data => {
          this.labelList = data;
          this.spinner.hide();
          this.interactionService.sendList(this.labelList);
        },
        error => {
          this.responseData = error.error;
          this.spinner.hide();
          this.openSnackBar('Dismiss');
        });
  }

  openSnackBar(action): void {
    this.snackBar.open(this.responseData.message, action, {duration: 3000});
  }

  updateLabel(labelData: any): void {
    this.flag = !this.flag;
    const data = {
      label_Id: labelData.label_Id,
      note_Id: 0,
      labelName: labelData.labelName
    };
    this.callLabelService(data, 'edit');
  }

  private callLabelService(data, url: string): void {
    this.labelService.postLabel(data, url)
      .subscribe(response => {
        this.responseData = response;
        this.spinner.hide();
        this.openSnackBar('Dismiss');
        this.getLabelList();
      }, error => {
        this.responseData = error.error;
        this.spinner.hide();
        this.openSnackBar('Dismiss');
      });
  }

  deleteLabel(labelData: any): void {
    this.spinner.show();
    this.labelService.deleteLabel(labelData.label_Id, 'delete')
      .subscribe(response => {
        this.responseData = response;
        this.spinner.hide();
        this.openSnackBar('Dismiss');
        const index = this.labelList.indexOf(labelData);
        if (index !== -1) {
          this.labelList.splice(index, 1);
        }
      }, error => {
        this.responseData = error.error;
        this.spinner.hide();
        this.openSnackBar('Dismiss');
      });
  }
}
