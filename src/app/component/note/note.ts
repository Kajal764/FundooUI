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
}
