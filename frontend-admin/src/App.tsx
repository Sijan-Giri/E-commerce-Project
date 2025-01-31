import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import { Provider } from 'react-redux';
import store from './store/store';
import FormCategory from './pages/Form/FormCategory';
import OrderDetail from './pages/OrderDetail';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
<>
   <Provider store={store}>
      <Routes>
        <Route
          path='/admin/dashboard'
          element={
            <>
            <DefaultLayout>
              <PageTitle title="eCommerce Dashboard | AdminDashboard - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
            <DefaultLayout>
              <PageTitle title="Profile | AdminDashboard - Tailwind CSS Admin Dashboard Template" />
              <Profile />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
            <DefaultLayout>
              <PageTitle title="Form Elements | AdminDashboard - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
            <DefaultLayout>
              <PageTitle title="Form Layout | AdminDashboard - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/forms/form-category"
          element={
            <>
            <DefaultLayout>
              <PageTitle title="Form Layout | AdminDashboard - Tailwind CSS Admin Dashboard Template" />
              <FormCategory />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
            <DefaultLayout>
              <PageTitle title="Tables | AdminDashboard - Tailwind CSS Admin Dashboard Template" />
              <Tables />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/order/:id"
          element={
            <>
            <DefaultLayout>
              <PageTitle title="Order | AdminDashboard - Tailwind CSS Admin Dashboard Template" />
              <OrderDetail />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
            <DefaultLayout>
              <PageTitle title="Settings | AdminDashboard - Tailwind CSS Admin Dashboard Template" />
              <Settings />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
            <DefaultLayout>
              <PageTitle title="Basic Chart | AdminDashboard - Tailwind CSS Admin Dashboard Template" />
              <Chart />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
            <DefaultLayout>
              <PageTitle title="Alerts | AdminDashboard - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
            <DefaultLayout>
              <PageTitle title="Buttons | AdminDashboard - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
              </DefaultLayout>
            </>
          }
        />
        <Route
          index
          element={
            <>
              <SignIn />
            </>
          }
        />
      </Routes>
   </Provider>
</>
  );
}

export default App;
