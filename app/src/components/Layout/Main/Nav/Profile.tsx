import { useState } from 'react';

import avatar from '@assets/avatar.jpg';

import { Settings, User, PieChart, HelpCircle } from 'react-feather';

import config from '@/constants/config';

function Profile() {
  const [show, setShow] = useState<boolean>(false);
  return (
    <li className="nav-item dropdown">
      <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#">
        <Settings />
      </a>

      <a
        className={`nav-link dropdown-toggle d-none d-sm-inline-block ${
          show ? 'show' : ''
        }`}
        href="#"
        onClick={() => setShow(!show)}
      >
        <img
          src={avatar}
          className="avatar img-fluid rounded me-1"
          alt={config.author}
        />{' '}
        <span className="text-dark">{config.author}</span>
      </a>
      <div className={`dropdown-menu dropdown-menu-end ${show ? 'show' : ''}`}>
        <a className="dropdown-item" href="pages-profile.html">
          <User /> Profile
        </a>
        <a className="dropdown-item" href="#">
          <PieChart /> Analytics
        </a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="index.html">
          <Settings /> Settings & Privacy
        </a>
        <a className="dropdown-item" href="#">
          <HelpCircle /> Help Center
        </a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#">
          Log out
        </a>
      </div>
    </li>
  );
}

export default Profile;
