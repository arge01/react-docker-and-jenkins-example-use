import { IDataTabel, Pageable } from '@/services';

import IntoToArray from '@/utils/IntoToArray';
import { useState } from 'react';
import PopUpModal from './PopUpModal';
import { useNavigate } from 'react-router-dom';

type Props<IMODEL> = {
  isSuccess: boolean;
  columns: Array<IDataTabel<IMODEL>>;
  loading: boolean;
  entities: Array<IMODEL>;
  pageable?: Pageable;
};

function Table<IMODEL>({
  isSuccess,
  columns,
  loading = true,
  entities,
  pageable,
}: Props<IMODEL>) {
  const history = useNavigate();

  const [modal, setModal] = useState<undefined | string>(undefined);
  return (
    <>
      <PopUpModal data={modal} setData={setModal} />
      {isSuccess && (
        <table className="table table-hover my-0">
          <thead>
            <tr>
              {columns.map((c, k) => (
                <th
                  key={c?.dataField + '-' + k}
                  className={c.classes}
                  style={c.style}
                >
                  {c.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <>
              {loading ? (
                <>
                  {IntoToArray<number>(pageable?.size || 10).map((_, k) => {
                    return (
                      <tr key={k}>
                        <td
                          colSpan={columns.length}
                          className="js-table-row-loader"
                        >
                          <div className="row-loader u-flex">
                            <div className="u-flex__cell u-mg--sm u-pd--sm loading-animation u-show-large-only--flex"></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  {entities.map((v: any, k: number) => {
                    return (
                      <tr id={k + '-' + v?.imdbID} key={k + '-' + v?.imdbID}>
                        {columns
                          .filter((f) => f.dataField !== '#')
                          .map((c, ck) => {
                            return (
                              <>
                                {c.formatter ? (
                                  <td key={ck + '-' + k + '-' + c.dataField}>
                                    <span
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => setModal(v[c.dataField])}
                                    >
                                      <img src={v[c.dataField]} style={{ maxHeight: 150 }} />
                                    </span>
                                  </td>
                                ) : (
                                  <td key={ck + '-' + k}>
                                    {c?.link ? (
                                      <a
                                        onClick={(
                                          e: React.MouseEvent<
                                            HTMLAnchorElement,
                                            MouseEvent
                                          >,
                                        ) => {
                                          e.preventDefault();
                                          return history('/detail', {
                                            state: { imdbID: v?.imdbID },
                                          });
                                        }}
                                        href="#"
                                      >
                                        {v[c.dataField]}
                                      </a>
                                    ) : (
                                      v[c.dataField]
                                    )}
                                  </td>
                                )}
                              </>
                            );
                          })}
                      </tr>
                    );
                  })}
                </>
              )}
            </>
          </tbody>
        </table>
      )}
    </>
  );
}

export default Table;
