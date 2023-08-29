import { IDataTabel } from '@/services';
import { IMODEL } from '.';

const columns: Array<IDataTabel<IMODEL>> = [
  {
    dataField: '#',
    text: '#',
    sort: false,
    hidden: false,
    classes: 'first-td',
    style: { width: 10 },
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
  },
  {
    dataField: 'imdbID',
    text: 'IMDB',
    sort: true,
    hidden: true,
    classes: 'd-none d-xl-table-cell',
  },
  {
    dataField: 'Type',
    text: 'Type',
    sort: true,
    hidden: true,
    classes: 'd-none d-xl-table-cell',
  },
  {
    dataField: 'Poster',
    text: 'Poster',
    sort: true,
    hidden: true,
    classes: 'd-none d-xl-table-cell',
    formatter: (cell: any) => cell,
  },
];

export default columns;
