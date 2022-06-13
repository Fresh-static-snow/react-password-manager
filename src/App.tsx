import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { Layout } from "./layout/Layout";
import { useAuth } from "./hooks/use-auth";

function App() {
  const { isAuth } = useAuth();

  const routes = useRoutes(isAuth);

  return (
    <Router>
      <Layout>{routes}</Layout>
    </Router>
  );
}

export default App;
