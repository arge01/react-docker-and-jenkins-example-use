import Messages from '@components/Layout/Main/Nav/Messages';
import Notifications from '@components/Layout/Main/Nav/Notifications';
import Profile from '@components/Layout/Main/Nav/Profile';

type Props = {
  children: JSX.Element | Array<JSX.Element>;
};

function Main({ children }: Props) {
  return (
    <div id="main" className="main">
      <nav className="navbar navbar-expand navbar-light navbar-bg">
        <a className="sidebar-toggle js-sidebar-toggle">
          <i className="hamburger align-self-center"></i>
        </a>

        <div className="navbar-collapse collapse">
          <ul className="navbar-nav navbar-align">
            <Notifications />
            <Messages />
            <Profile />
          </ul>
        </div>
      </nav>
      <main className="content">{children}</main>
    </div>
  );
}

export default Main;
