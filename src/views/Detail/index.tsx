/* eslint-disable react/no-unescaped-entities */
import { Dispatch, useEffect } from 'react';

import './style.scss';

import { IState } from '@/redux/reducers';
import { Iinital } from '@/services';

import { actions } from '@/services/movies';
import { IENTITY, IMODEL } from '@/services/movies/initial';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Loading from '@/components/StatusPages/Loading';
import Error from '@/components/StatusPages/Error';

function Detail() {
  const location = useLocation();
  const { state } = location;

  const dispatch: Dispatch<any> = useDispatch();
  const movies: Iinital<IMODEL, IENTITY> = useSelector(
    (state: IState) => state.movies,
  );

  useEffect(() => {
    dispatch(actions.findByName(state.imdbID));
  }, [state]);
  return (
    <div
      className="container-fluid p-0"
      style={{ position: 'relative', minHeight: 'calc(100vh - 215px)' }}
    >
      {!movies.loading ? (
        <>
          {movies?.findSuccess ? (
            <>
              <div className="row">
                <div className="col-md-12 col-xl-12">
                  <div className="card mb-3">
                    <div className="card-body text-center">
                      <img
                        src={movies?.entity?.Poster}
                        alt="Christina Mason"
                        className="img-fluid mb-2"
                        style={{ maxHeight: 300 }}
                      />
                      <br />
                      <h5 className="card-title mb-0">
                        {movies?.entity?.Title}
                      </h5>
                      <div className="text-muted mb-0">
                        {movies?.entity?.Director}
                      </div>

                      <div>
                        <a
                          className="btn btn-primary btn-sm"
                          target="_blank"
                          href={`https://www.google.com/search?q=${movies?.entity?.Title} izle türkçe dublaj`}
                        >
                          Go To Movie
                        </a>
                        <a className="btn btn-danger btn-sm" href="#">
                          <span data-feather="message-square"></span> Back
                        </a>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex w-100 aligns-items-center justify-content-center flex-wrap">
                        <h5 className="h6 card-title w-100 text-center">
                          Ratings
                        </h5>
                        {movies?.entity?.Ratings?.map((v, k) => (
                          <a
                            key={k + "-" + v?.Source}
                            href="#"
                            className="badge bg-primary me-1 my-1"
                          >
                            {v?.Value}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="d-flex flex-wrap w-100 card-bottom">
                      <div className="card-body col-lg-4">
                        <ul className="list-unstyled mb-0">
                          <li className="mb-1">
                            <span
                              data-feather="home"
                              className="feather-sm me-1"
                            ></span>{' '}
                            Released <a href="#">{movies?.entity?.Released}</a>
                          </li>

                          <li className="mb-1">
                            <span
                              data-feather="briefcase"
                              className="feather-sm me-1"
                            ></span>{' '}
                            Runtime <a href="#">{movies?.entity?.Runtime}</a>
                          </li>
                          <li className="mb-1">
                            <span
                              data-feather="map-pin"
                              className="feather-sm me-1"
                            ></span>{' '}
                            Genre <a href="#">{movies?.entity?.Genre}</a>
                          </li>
                          <li className="mb-1">
                            <span
                              data-feather="map-pin"
                              className="feather-sm me-1"
                            ></span>{' '}
                            Country <a href="#">{movies?.entity?.Country}</a>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="card-body col-lg-4">
                        <ul className="list-unstyled mb-0">
                          <li className="mb-1">
                            <span
                              data-feather="home"
                              className="feather-sm me-1"
                            ></span>{' '}
                            Director <a href="#">{movies?.entity?.Director}</a>
                          </li>

                          <li className="mb-1">
                            <span
                              data-feather="briefcase"
                              className="feather-sm me-1"
                            ></span>{' '}
                            Writer <a href="#">{movies?.entity?.Writer}</a>
                          </li>
                          <li className="mb-1">
                            <span
                              data-feather="map-pin"
                              className="feather-sm me-1"
                            ></span>{' '}
                            Actors <a href="#">{movies?.entity?.Actors}</a>
                          </li>
                          <li className="mb-1">
                            <span
                              data-feather="map-pin"
                              className="feather-sm me-1"
                            ></span>{' '}
                            Plot <a href="#">{movies?.entity?.Plot}</a>
                          </li>
                        </ul>
                      </div>

                      <div className="card-body col-lg-4">
                        <ul className="list-unstyled mb-0">
                          <li className="mb-1">
                            <span
                              data-feather="home"
                              className="feather-sm me-1"
                            ></span>{' '}
                            Country <a href="#">{movies?.entity?.Country}</a>
                          </li>

                          <li className="mb-1">
                            <span
                              data-feather="briefcase"
                              className="feather-sm me-1"
                            ></span>{' '}
                            Language <a href="#">{movies?.entity?.Language}</a>
                          </li>
                          <li className="mb-1">
                            <span
                              data-feather="map-pin"
                              className="feather-sm me-1"
                            ></span>{' '}
                            Production <a href="#">{movies?.entity?.Production}</a>
                          </li>
                          <li className="mb-1">
                            <span
                              data-feather="map-pin"
                              className="feather-sm me-1"
                            ></span>{' '}
                            BoxOffice <a href="#">{movies?.entity?.BoxOffice}</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <section
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                top: 0,
                left: 0,
              }}
            >
              <Error />
            </section>
          )}
        </>
      ) : (
        <section
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
          }}
        >
          <Loading />
        </section>
      )}
    </div>
  );
}

export default Detail;
