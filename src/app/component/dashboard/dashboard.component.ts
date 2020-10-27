import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {NoteService} from '../../service/note/note.service';
import {InteractionService} from '../../service/search-data/interaction.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateLabelComponent} from '../create-label/create-label.component';
import {ILabel} from '../create-label/ILabel';
import {LabelService} from '../../service/label/label.service';
import {UserService} from '../../service/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IUser} from '../collaborator/IUser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav: MatSidenav;
  public userLogin: IUser;
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
  selectedFiles: FileList;
  private currentFileUpload: File;

  constructor(private router: Router,
              private noteService: NoteService,
              private interactionService: InteractionService,
              public dialog: MatDialog,
              private labelService: LabelService,
              private userService: UserService,
              private snackBar: MatSnackBar) {
  }

  toggle(): void {
    this.sidenav.toggle();
  }

  ngOnInit(): void {
    this.getSubscribeList();
    this.getLabelList();
    this.getLoginUser();
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

  onSelectFile(event: Event): void {
    // @ts-ignore
    this.selectedFiles = event.target.files;
    const reader = new FileReader();
    reader.onload = (ev: any) => {
      this.imgUrl = ev.target.result;
    };
    reader.readAsDataURL(this.selectedFiles.item(0));
  }

  uploadImage(): void {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.userService.pushFileToStorage(this.currentFileUpload)
      .subscribe(data => {
          this.responseData = data;
          localStorage.setItem('image', this.imgUrl);
          this.openSnackBar('Dismiss', 'Profile uploaded');
        },
        error => {
          this.responseData = error.error;
          this.openSnackBar('Dismiss', 'Error uploading profile');
        });
  }

  openSnackBar(action, message): void {
    this.snackBar.open(message, action, {duration: 3000});
  }

  private getLoginUser(): void {
    this.userService.getLoginUser(localStorage.getItem('email'))
      .subscribe(data => {
          this.userLogin = data;
        },
        error => {
          this.responseData = error.error;
        });
  }
}
