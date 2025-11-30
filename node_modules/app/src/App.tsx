import Layout from '@components/Layout';

import { createHashRouter, RouterProvider } from '@arifgevenci/router-library';

import Dashboard from '@views/Dashboard';
import Detail from '@views/Detail';

const router = createHashRouter([
  {
    path: '/',
    element: <Dashboard /> as any,
  },
  {
    path: '/detail',
    element: <Detail />,
  },
]);

function App() {
  return (
    <Layout>
      <Layout.NavBar />
      <Layout.Main>
        <RouterProvider router={router} />
        <Layout.Footer />
      </Layout.Main>
    </Layout>
  );
}

export default App;
