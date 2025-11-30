/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import React, { useContext, useEffect, useState } from 'react';

import { Iinital } from '@/services';

import ReduxDataTable, { IProvider } from '..';

import BootstrapTable from 'react-bootstrap-table-next';

//import { isArray } from "util";
import Loading from '@/components/StatusPages/Loading';

type Props<MODEL extends any, IENTITY extends any, COLUMNS extends any> = {
  keyField?: string;
  data?: Iinital<MODEL, IENTITY> | any | undefined;
  columns?: Array<COLUMNS> | undefined;
  children?: React.ReactNode;
};

const BootstrapTableComponent = BootstrapTable as any;

function Basic<MODEL extends any, IENTITY extends any, COLUMNS extends any>(
  props: Props<MODEL, IENTITY, COLUMNS>,
) {
  const value: IProvider<any, any> = useContext(ReduxDataTable.Context);

  const keyField = props?.keyField || 'id';
  const data = props?.data || value.data;
  const columns = props?.columns || value.columns;

  const [handleData, setHandleData] = useState(data?.entities || []);
  useEffect(() => {
    if (data?.isSuccess) {
      const handleData = data?.entities?.map((v: any, k: any) => {
        delete v['#'];
        return {
          '#': k + 1,
          ...v,
        };
      });
      setHandleData(handleData);
    }
  }, [data]);

  return (
    <>
      <section className="react-data-table-elements layout">
        <section
          className={`${
            data?.loading ? 'loading' : 'no-loading'
          } bootstrap-table`}
          style={{ padding: 0, border: 'none' }}
        >
          {data?.loading && <Loading />}
          <BootstrapTableComponent
            keyField={keyField}
            columns={columns}
            data={
              data?.isSuccess
                ? Array.isArray(data?.entities)
                  ? handleData
                  : []
                : []
            }
          />
        </section>
      </section>
      {props.children}
    </>
  );
}

export default Basic;
