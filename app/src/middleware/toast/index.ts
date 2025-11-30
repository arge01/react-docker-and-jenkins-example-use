export interface ToastObj {
  [key: string]: string;
}

const toastObjects: ToastObj = {
  FINDALL_MOVIES: 'All Success',
  FINDBYID_MOVIES: 'Get Success',
  FINDBYNAME_MOVIES: 'Get Success',
  SAVE_MOVIES: 'Save Success',
  UPDATE_MOVIES: 'Update Success',
  DELETE_MOVIES: 'Delete Success',
};

export default toastObjects;
