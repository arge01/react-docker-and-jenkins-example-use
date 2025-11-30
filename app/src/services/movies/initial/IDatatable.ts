import { IDataTabel } from '@/services';
import { IMODEL } from '.';

const columns: Array<IDataTabel<IMODEL>> = [
  {
    dataField: 'Poster',
    text: 'Poster',
    sort: true,
    hidden: true,
    classes: 'd-none d-xl-table-cell',
    formatter: (cell: any) => cell,
  },
  {
    dataField: 'Title',
    text: 'Name',
    sort: true,
    hidden: false,
    style: { width: '100%' },
    link: true,
  },
  {
    dataField: 'Year',
    text: 'Year',
    sort: true,
    hidden: true,
    classes: 'd-none d-xl-table-cell',
    style: { minWidth: '200px' },
  },
  {
    dataField: 'Type',
    text: 'Type',
    sort: true,
    hidden: true,
    classes: 'd-none d-xl-table-cell',
  },
];

export default columns;
