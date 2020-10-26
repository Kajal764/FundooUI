import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {NoteService} from '../../service/note/note.service';
import {InteractionService} from '../../service/search-data/interaction.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateLabelComponent} from '../create-label/create-label.component';
import {ILabel} from '../create-label/ILabel';
import {LabelService} from '../../service/label/label.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('sidenav')
  sidenav: MatSidenav;

  isExpanded = true;
  isShowing = false;
  message = 'Fundoo';
  isRefresh = true;
  isGrid = true;
  username = 'kajal waghmare';
  emailId = 'kajalw1998@gmail.com';
  search: string;
  noteType: 'note';
  labelList: ILabel[];
  private responseData: any;
  public imgUrl = '../../../assets/avatar4.jpg';

  constructor(private router: Router,
              private noteService: NoteService,
              private interactionService: InteractionService,
              public dialog: MatDialog,
              private labelService: LabelService) {
  }

  toggle(): void {
    this.sidenav.toggle();
  }

  ngOnInit(): void {
    this.getSubscribeList();
    this.getLabelList();

  }

  getLabelList(): void {
    this.labelService.getList()
      .subscribe(data => {
          this.labelList = data;
          this.interactionService.sendList(this.labelList);
        },
        error => {
          this.responseData = error.error;
        });
  }

  private getSubscribeList(): void {
    this.interactionService.labelData$
      .subscribe(data => {
        this.labelList = data;
      });
  }

  refresh(): void {
    this.isRefresh ? this.isRefresh = false : this.isRefresh = true;
  }

  grid(): void {
    this.isGrid ? this.isGrid = false : this.isGrid = true;
    this.interactionService.sendBoolean(this.isGrid);
  }

  mouseenter(): void {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave(): void {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.redirectToLogin();
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  searchData(searchValue: any): void {
    this.interactionService.sendData(searchValue);
    this.router.navigate(['home/search']);
  }

  openLabelPopup(): void {
    const dialogRef = this.dialog.open(CreateLabelComponent,
      {width: 'auto', panelClass: 'custom-box', data: {}});
  }


  redirectToMapNote(labelData: ILabel): void {
    this.interactionService.sendObject(labelData);
    this.router.navigate(['home/label-map']);
  }


  // onSelectFile(event): void {
  //   if (event.target.files) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload = (ev: any) => {
  //       console.log(ev.target.result);
  //       this.imgUrl = ev.target.result;
  //     };
  //   }
  // }

  fileToUpload: any;
  // imageUrl: any;

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
}
