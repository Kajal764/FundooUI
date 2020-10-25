import {IUser} from '../collaborator/IUser';

export interface INote {
  note_Id: number;
  title: string;
  description: string;
  color: string;
  remainder: string;
  archive: boolean;
  collaborateNote: boolean;
  trash: boolean;
  pin: boolean;
  labelList: [{
    label_Id: number,
    labelName: string
  }];
  userList: [{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    varified: boolean;
  }];
}
