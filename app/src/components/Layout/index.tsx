import '@styles/index.scss';

import NavBar from '@components/Layout/NavBar';
import Main from '@/components/Layout/Main/Main';
import Footer from '@components/Layout/Footer';

type Props = {
  children: JSX.Element | Array<JSX.Element>;
};

function index({ children }: Props) {
  return <div className="wrapper">{children}</div>;
}

const Layout = Object.assign(index, {
  NavBar,
  Main,
  Footer,
});
export default Layout;
