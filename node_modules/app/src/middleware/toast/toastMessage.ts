import toastObjects from './index';

const toastMessage = (type: string) => toastObjects?.[type];

export default toastMessage;
