import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { Layout } from './layout/Layout';
import { useActions, useTypedSelector } from './hooks/redux';
import { useEffect } from 'react';
import { localStorageUtil } from './utils/localStorage';

export const App = () => {
  const auth = useTypedSelector((state) => state.user.auth);
  const setUser = useActions().setUser;
  const routes = useRoutes(auth);

  useEffect(() => {
    if (localStorageUtil.getItem({ key: 'userEmail' })) {
      setUser({
        email: localStorageUtil.getItem({ key: 'userEmail' }),
        auth: true,
      });
    }
  }, [setUser]);

  return (
    <Router>
      <Layout>{routes}</Layout>
    </Router>
  );
};
