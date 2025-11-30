import config from '@/constants/config';

import { Info, Sliders } from 'react-feather';

type Props = {
  navbar?: boolean;
};

function NavBar({ navbar = true }: Props) {
  return (
    <>
      {navbar && (
        <nav id="sidebar" className="sidebar js-sidebar">
          <div className="sidebar-content js-simplebar">
            <a className="sidebar-brand" href="index.html">
              <span className="align-middle">{config.desc}</span>
            </a>

            <ul className="sidebar-nav">
              <li className="sidebar-item active">
                <a className="sidebar-link" href="/">
                  <Sliders /> <span className="align-middle">Dashboard</span>
                </a>
              </li>

              <li className="sidebar-item">
                <a className="sidebar-link" href="/informations">
                  <Info /> <span className="align-middle">Informations</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
