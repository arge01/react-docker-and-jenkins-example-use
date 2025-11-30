import { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/Card';
import Form from '@/components/Forms';

import { IState } from '@/redux/reducers';
import { Iinital } from '@/services';
import { actions } from '@/services/movies';

import { IENTITY, IMODEL } from '@/services/movies/initial';
import columns from '@/services/movies/initial/IDatatable';

import Table from './Table';
import './style.scss';
import IntoToArray from '@/utils/IntoToArray';

import { Button } from 'reactstrap';

export default function Main() {
  const dispatch: Dispatch<any> = useDispatch();
  const movies: Iinital<IMODEL, IENTITY> = useSelector(
    (state: IState) => state.movies,
  );

  const s: string | number | false | undefined =
    !Array.isArray(movies.criteria) && movies.criteria?.s;
  const y: string | number | false | undefined =
    !Array.isArray(movies.criteria) && movies.criteria?.y;

  useEffect(() => {
    dispatch(
      actions.findAll(
        { page: movies?.pageable?.numberOfElements || 1, size: 10 },
        movies.criteria,
      ),
    );
  }, [dispatch]);

  const onSubmit = (values: any) => {
    dispatch(actions.findAll({ page: 1, size: 10 }, values));
  };

  const goToPage = (page: number) => {
    dispatch(actions.findAll({ page, size: 10 }, movies.criteria));
  };
  return (
    <>
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12 d-flex">
            <Card>
              <div className="card-forms d-flex w-100">
                <Form onSubmit={onSubmit}>
                  <Form.Text
                    field="s"
                    label="Search"
                    min={3}
                    defaultValue={s?.toString()}
                  />
                  <Form.Number
                    field="y"
                    label="Date"
                    required={false}
                    defaultValue={y}
                    min={4}
                  />
                </Form>
              </div>
            </Card>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-8 col-xxl-9 d-flex">
            <Card>
              <div className="table-controls">
                <Table<IMODEL>
                  isSuccess={movies.isSuccess}
                  columns={columns}
                  loading={movies.loading}
                  entities={movies.entities}
                  pageable={movies.pageable}
                ></Table>
              </div>
            </Card>
          </div>
          <div className="col-12 col-lg-4 col-xxl-3 d-flex">
            <Card className="w-100">
              <section className="button-group">
                {IntoToArray(movies?.pageable?.totalPages || 0).map((_, k) => (
                  <Button
                    key={k}
                    color="primary"
                    disabled={
                      Number(k) + 1 ===
                      Number(movies?.pageable?.numberOfElements)
                    }
                    onClick={() => goToPage(k + 1)}
                  >
                    {k + 1}
                  </Button>
                ))}
              </section>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
