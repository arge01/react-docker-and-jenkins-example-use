/* eslint-disable react/no-unescaped-entities */
import React, { Dispatch, useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import ReduxDataTable, { IProvider } from '..';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import { IDataTabel } from '@/services';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Loading from '@/components/StatusPages/Loading';
import ReduxForm from '@/components/ReduxForm';
import { MethodAction } from '@/constants/MethodAction';
import Filtered from './Filtered';

import Authorized from '@components/Authority/Authorized';

type IProp = {
  children?: React.ReactNode;
  isSelect?: boolean;
  topButton?:
    | {
        new?: boolean | string;
        update?: boolean | string;
        delete?: boolean | string;
      }
    | undefined;
  url?: string;
  extendButton?: {
    name: string;
    action: any;
  };
  defaultValue?: any;
};

function Filterable({
  children,
  isSelect = true,
  url,
  topButton = { new: true, update: true, delete: true },
  extendButton,
  defaultValue,
}: IProp) {
  const dispatch: Dispatch<any> = useDispatch();
  const {
    keyField,
    name,
    data,
    columns: column,
    setColumns,
    pages,
    criteria,
    option,
    actions,
    selected,
    next,
    formInputs,
  }: IProvider<any, IDataTabel<any>> = useContext(ReduxDataTable.Context);

  const key = keyField || 'id';
  const id = data?.id || 'no-data';
  const role = data?.role || {
    save: undefined,
    update: undefined,
    delete: undefined,
    view: undefined,
  };

  const [fillData, setFillData] = useState<Array<any> | undefined>(undefined);
  const [searchVal, setSearchVal] = useState<any>(
    JSON.parse(localStorage.getItem('search-val') || '{}'),
  );

  useEffect(() => {
    localStorage.setItem('search-val', JSON.stringify(searchVal));
  }, [searchVal]);
  const onSearch = (searchText: string, types: boolean = true) => {
    setSearchVal({ ...searchVal, [id]: searchText });
    const data: Array<any> =
      handleData.filter((f: any) => {
        for (const key in f) {
          const col: IDataTabel<any> | undefined = column.find(
            (find: any) => find?.dataField === key,
          );

          if (!col?.hidden) {
            if (typeof f[key] === 'string') {
              const n: string = f[key]?.toUpperCase();
              const t: string = searchText?.toUpperCase();

              if (n?.indexOf(t) > -1) {
                return { ...f };
              }
            } else if (typeof f[key] === 'object') {
              if (col?.searchText) {
                if (Array.isArray(col?.searchText)) {
                  for (let i = 0; i < col?.searchText?.length; i++) {
                    const element = col?.searchText?.[i];
                    if (typeof f[key]?.[element] === 'string') {
                      const n: string = f[key]?.[element]?.toUpperCase();
                      const t: string = searchText?.toUpperCase();

                      if (n?.indexOf(t) > -1) {
                        return { ...f };
                      }
                    }
                  }
                } else {
                  if (typeof f[key]?.[col?.searchText] === 'string') {
                    const n: string = f[key]?.name?.toUpperCase();
                    const t: string = searchText?.toUpperCase();

                    if (n?.indexOf(t) > -1) {
                      return { ...f };
                    }
                  }
                }
              } else {
                if (typeof f[key]?.name === 'string') {
                  const n: string = f[key]?.name?.toUpperCase();
                  const t: string = searchText?.toUpperCase();

                  if (n?.indexOf(t) > -1) {
                    return { ...f };
                  }
                }
              }
            }
          }
        }

        return false;
      }) || [];

    if (searchText) {
      setFillData(data);
      types &&
        selected?.setSelected({ all: data, select: selected.selected?.select });
      //onSelectAll(true, data);
    } else {
      setFillData(undefined);
      types &&
        selected?.setSelected({
          all: handleData,
          select: selected.selected?.select,
        });
      //onSelectAll(false, []);
    }
  };
  const onSearchClean = () => {
    setSearchVal({});
    setFillData(undefined);
    selected?.setSelected({
      all: handleData,
      select: selected.selected?.select,
    });
  };

  const exportCsv = false;
  const importCsv = false;

  const options = {
    page: pages?.page.page ? pages?.page.page + 1 : 1,
    pageStartIndex: 1,
    sizePerPage: pages?.page?.size,
    hideSizePerPage: false,
    hidePageListOnlyOnePage: false,
    totalSize: data?.pageable?.totalElements || 0,
    showTotal: true,
    sizePerPageList: [
      {
        text: '2',
        value: 2,
      },
      {
        text: '5',
        value: 5,
      },
      {
        text: '10',
        value: 10,
      },
      {
        text: '20',
        value: 20,
      },
      {
        text: '50',
        value: 50,
      },
      {
        text: '1000',
        value: 1000,
      },
      {
        text: 'All',
        value: data?.pageable?.totalElements || 0,
      },
    ],
    ...option,
  };

  const handleTableChange = (
    type: string,
    { page, sizePerPage, sortField, sortOrder }: any,
  ) => {
    setSearchVal({});
    setFillData(undefined);

    if (type === 'pagination') {
      pages?.setPage({
        ...pages?.page,
        page: page - 1,
        size: sizePerPage,
        change: true,
      });
    } else if (type === 'sort') {
      if (sortField === '#') {
        let direction: 'ASC' | 'DESC' = 'ASC';

        if (sortOrder === 'asc') {
          direction = 'ASC';
        } else if (sortOrder === 'desc') {
          direction = 'DESC';
        }

        pages?.setPage({
          ...pages?.page,
          page: page - 1,
          size: sizePerPage,
          change: false,
          sort: sortField,
          direction,
        });
      } else {
        let direction: 'ASC' | 'DESC' = 'ASC';

        if (sortOrder === 'asc') {
          direction = 'ASC';
        } else if (sortOrder === 'desc') {
          direction = 'DESC';
        }

        pages?.setPage({
          ...pages?.page,
          page: page - 1,
          size: sizePerPage,
          change: true,
          sort: sortField,
          direction,
        });
      }
    }
  };

  const ReactSwal = withReactContent(Swal);

  const [select, setSelect]: Array<any> = useState([]);
  const [selectOnOne, setSelectOnOne]: Array<any> = useState(false);

  const handleSelectDelete = () => {
    if (select.length > 0) {
      ReactSwal.fire({
        title: 'Are you sure?',
        text: 'You can not take this back!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await selected?.selected?.all.map((v: any) =>
            dispatch(actions?.delete(v)),
          );
          refresh();
        }
      });
    }
  };

  const onSelect = (row: any, isSelect: any) => {
    if (isSelect) {
      setSelect([...select, row]);
      setSelectOnOne(row);

      delete row?.['#'];
      selected?.setSelected({ select: row, all: [...select, row] });
    } else {
      const newSelect = select?.filter((f: any) => f?.[key] !== row?.[key]);
      setSelect([...newSelect]);
      setSelectOnOne(false);

      selected?.setSelected({ select: {}, all: [...newSelect] });
    }
  };

  const onSelectAll = (isSelect: any, rows: any) => {
    if (isSelect) {
      setSelect([...select, ...rows]);
      setSelectOnOne(false);

      selected?.setSelected({ select: {}, all: [...select, ...rows] });
    } else {
      setSelect([]);
      setSelectOnOne(false);

      selected?.setSelected({ select: {}, all: [] });
    }
  };

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: false,
    clickToExpand: true,
    onSelect,
    onSelectAll,
    selected: Array.isArray(selected?.selected?.all)
      ? selected?.selected?.all.map((v) => v?.id)
      : [],
    expandColumnPosition: 'right',
  };

  useEffect(() => {
    if (data?.isSuccess) {
      setSelect([]);
      setSelectOnOne(false);
    }
  }, [data?.isSuccess]);

  const nextPage = (event: any) => {
    if (!isSelect && event?.target.id === 'page-all') {
      selected?.setSelected({ all: handleData, select: {} });
    }
    if (event.target.id) {
      next?.setNextPage(event?.target.id);
    } else {
      next?.setNextPage(false);
    }
  };

  const [handleData, setHandleData] = useState<Array<any>>(
    data?.isSuccess ? data?.entities : [],
  );
  useEffect(() => {
    if (data?.isSuccess) {
      const newData =
        data?.entities?.map((v: any, k: any) => {
          const page: number = pages?.page.page || 0;
          const size: number = pages?.page.page ? pages?.page.size || 0 : 0;

          return {
            '#': page * size + k + 1,
            ...v,
          };
        }) || [];
      setHandleData(newData);
    }
    if (data?.updateSuccess) {
      const newData = handleData?.map((v: any) => {
        if (v.id === data.entity.id) {
          return {
            ...v,
            ...data.entity,
          };
        }
        return {
          ...v,
        };
      });
      setHandleData(newData);

      const selected_all =
        selected?.selected?.all.map((v) => {
          if (v.id === data.entity.id) {
            return { ...v, ...data.entity };
          }
          return v;
        }) || [];
      const selected_select = data.entity;
      selected?.setSelected({ all: selected_all, select: selected_select });
    }
  }, [data]);
  useEffect(() => {
    onSearch(searchVal?.[id], false);
  }, [data?.loading]);

  const handleSelectChange = () => {
    if (selectOnOne?.id) {
      const newData = data?.entities?.map((v: any, k: any) => {
        const page: number = pages?.page.page || 0;
        const size: number = pages?.page.page ? pages?.page.size || 0 : 0;

        return {
          '#': page * size + k + 1,
          ...v,
        };
      });
      setHandleData(newData || []);
      next?.setNextPage('update');
    }
  };

  const handleNewData = () => {
    next?.setNextPage('new');
  };

  const history = useNavigate();

  const [filter, setFilter] = useState(false);
  const ActionGroup = ({ columns, onColumnToggle, toggles }: any) => {
    const extendNewUrl = () => history(url || '/');

    const [columnElement, setColumnElemnt] = useState(false);
    return (
      <div className="action-group">
        <div className="btn-group">
          {extendButton && (
            <button className="btn" onClick={extendButton.action}>
              {extendButton.name}
            </button>
          )}
          <button
            onClick={() => setColumnElemnt(!columnElement)}
            className={`btn column-select ${
              columnElement ? 'in-active' : 'in-passive'
            }`}
          >
            Sütunlar <i className="fas fa-chevron-down"></i>
          </button>
          {columnElement && (
            <div className="btn-group-dropdown">
              {columns
                .map((column: any) => ({
                  ...column,
                  toggle: toggles[column.dataField],
                }))
                .map((col: any, k: number) => (
                  <button
                    key={col.dataField + '-' + k}
                    className={`btn ${col.toggle ? 'active' : ''}`}
                    data-toggle="button"
                    aria-pressed={col.toggle ? 'true' : 'false'}
                    onClick={() => {
                      onColumnToggle(col.dataField);
                      const f: Array<IDataTabel<any>> =
                        column.map((v: IDataTabel<any>) => {
                          if (v.dataField === col.dataField) {
                            v.hidden = !v.hidden;
                          }
                          return v;
                        }) || [];
                      setColumns && setColumns(f);
                    }}
                  >
                    <span
                      className={`selected-span ${col.toggle ? 'active' : ''}`}
                    ></span>{' '}
                    {col.text}
                  </button>
                ))}
            </div>
          )}
        </div>
        {topButton?.new && (
          <>
            <Authorized authority={role.save}>
              <button
                className={`btn ${next?.nextPage === 'new' ? 'active' : ''}`}
                onClick={!url ? handleNewData : extendNewUrl}
              >
                <i className="fas fa-plus"></i> <span>Yeni</span>
              </button>
            </Authorized>
          </>
        )}
        {topButton?.update && (
          <Authorized authority={role.update}>
            <button
              className={`btn ${next?.nextPage === 'update' ? 'active' : ''}`}
              onClick={handleSelectChange}
              disabled={!selectOnOne}
            >
              <i className="fas fa-edit"></i>{' '}
              <span>Yalnızca Seçileni Güncelle</span>
            </button>
          </Authorized>
        )}
        {topButton?.delete && (
          <Authorized authority={role.delete}>
            <button
              className="btn"
              onClick={handleSelectDelete}
              disabled={!select.length}
            >
              <i className="fas fa-minus"></i>{' '}
              <span>Seçilenlerin Tümünü delete</span>
            </button>
          </Authorized>
        )}
        <button
          className={`btn btn-transparent ${
            criteria?.criteria?.length ? 'in-fl-active' : 'in-fl-passive'
          }`}
          onClick={() => setFilter(!filter)}
        >
          <i style={{ fontSize: '10pt' }} className="fas fa-filter"></i>
        </button>
        <button
          className={`btn btn-transparent ${
            select.length || next?.nextPage ? 'in-f-active' : 'in-f-passive'
          }`}
          onClick={nextPage}
        >
          {!next?.nextPage && (
            <i id="page-all" className="fas fa-angle-right"></i>
          )}
          {next?.nextPage && <i className="fas fa-angle-left"></i>}
        </button>
      </div>
    );
  };

  const ExtendGroup = (props: any) => {
    const handleExportClick = () => {
      props.onExport();
    };
    const handleImportClick = () => {
      props.onImport();
    };
    return (
      <div className="extend-group action-group">
        <h4 className="table-title" style={{ marginRight: 7 }}>
          {name}
        </h4>
        {exportCsv && (
          <button className="btn " onClick={handleExportClick}>
            CSV'ye aktar
          </button>
        )}
        {importCsv && (
          <button className="btn " onClick={handleImportClick}>
            CSV ekle
          </button>
        )}
      </div>
    );
  };

  const refresh = () => {
    setSearchVal({});
    setFillData(undefined);

    dispatch(
      actions?.findAll(
        {
          page: pages?.page.page || data?.pageable?.number || 0,
          size: pages?.page.size || data?.pageable?.size || 1000,
        },
        criteria?.criteria,
      ),
    );

    setSelect([]);
    setSelectOnOne(false);
    selected?.setSelected(undefined);
    next?.setNextPage(false);
    pages?.setPage({
      ...pages.page,
      page: pages?.page.page || data?.pageable?.number || 0,
      size: pages?.page.size || data?.pageable?.size || 1000,
      change: false,
      sort: 'id',
      direction: 'ASC',
    });
  };

  const [searchSelectText, setSearchSelectText] = useState(undefined);
  const [searchText, setSearchText] = useState(undefined);
  // const onSearchChange = (e: any) => {
  //   if (e.target.name === "search-select") {
  //     setSearchSelectText(e.target.value);
  //   }
  //   if (e.target.name === "search-text") {
  //     setSearchText(e.target.value);
  //   }
  // };

  const searchButton = () => {
    const value = searchText || '';
    const key = searchSelectText || '';

    if (value && key) {
      criteria?.setCriteria([
        {
          key,
          operator: 4,
          value,
        },
      ]);

      pages?.setPage({
        ...pages.page,
        page: 0,
        size: 1000,
        change: true,
      });
    }
  };

  const clearButton = () => {
    setSearchSelectText(undefined);
    setSearchText(undefined);

    criteria?.setCriteria([]);

    pages?.setPage({
      ...pages.page,
      page: 0,
      size: 1000,
      change: true,
    });
  };

  const contentTable = ({ paginationTableProps }: any) => (
    <ToolkitProvider
      keyField={key}
      columns={column}
      data={fillData ? fillData : handleData}
      search
      columnToggle
    >
      {(props: any) => (
        <>
          <div className="btn-grp-wa row">
            <div className="col">
              <ExtendGroup {...props.csvProps} />
            </div>
            <div className="col-auto">
              <ActionGroup {...props.columnToggleProps} />
            </div>
          </div>
          <div className="col">
            <div className="row">{filter && <Filtered />}</div>
          </div>
          <div className="row d-search-index">
            <div className="col-auto i-left">
              <button
                className="btn btn-link refresh"
                onClick={() => refresh()}
              >
                <i className="fas fa-sync"></i>
              </button>
            </div>
            <div className="col i-right">
              <input
                id={id}
                placeholder="Arama..."
                name={`search-text`}
                onChange={(e) => onSearch(e?.target?.value)}
                type="text"
                className={`search-bar-active search-text`}
                value={searchVal?.[id] || ''}
              />

              <button
                onClick={searchButton}
                className="btn btn-link search-button"
              >
                <i className="fas fa-search"></i>
              </button>
              <button
                onClick={onSearchClean || clearButton}
                className="btn btn-link search-button-close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          {!next?.nextPage && (
            <BootstrapTable
              id={'table-' + id}
              bootstrap4
              striped
              hover
              remote
              {...props.baseProps}
              {...paginationTableProps}
              onTableChange={handleTableChange}
              pagination={paginationFactory(options)}
              selectRow={isSelect ? selectRow : undefined}
            />
          )}
          {next?.nextPage === 'page-all' && (
            <ReduxDataTable.Basic
              columns={[
                {
                  dataField: '#',
                  text: '#',
                  sort: true,
                  hidden: false,
                  classes: 'first-td',
                },
                ...column.filter((f) => f.dataField !== '#'),
              ]}
              data={{ ...data, entities: selected?.selected?.all || [] }}
            />
          )}
          {next?.nextPage === 'update' && (
            <>
              {children ? (
                <>{children}</>
              ) : (
                <ReduxForm
                  success={true}
                  formInputs={formInputs}
                  actions={{
                    entity: selected?.selected?.select,
                    action: MethodAction.Update,
                    method: actions,
                  }}
                />
              )}
            </>
          )}
          {next?.nextPage === 'new' && (
            <>
              {children ? (
                <>{children}</>
              ) : (
                <ReduxForm
                  formInputs={formInputs}
                  actions={{
                    entity: defaultValue || {},
                    action: MethodAction.Save,
                    method: actions,
                  }}
                  defaultValue={defaultValue}
                  refresh={() =>
                    dispatch(
                      actions?.findAll(
                        {
                          page: pages?.page.page || data?.pageable?.number || 0,
                          size:
                            pages?.page.size || data?.pageable?.size || 1000,
                        },
                        criteria?.criteria,
                      ),
                    )
                  }
                />
              )}
            </>
          )}
        </>
      )}
    </ToolkitProvider>
  );
  return (
    <section className="react-data-table-elements layout">
      <section
        className={`${
          data?.loading ? 'loading' : 'no-loading'
        } bootstrap-table`}
      >
        {data?.loading && <Loading />}
        <PaginationProvider pagination={paginationFactory(options)}>
          {contentTable}
        </PaginationProvider>
      </section>
    </section>
  );
}

export default Filterable;
