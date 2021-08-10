import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import AuthenticationPage from './pages/authentication/AuthenticationPage';
import SearchPage from './pages/search/SearchPage';
import PrivateRoute from './modules/auth/PrivateRoute';
import { AuthProvider } from './modules/auth/AuthContext';

axios.defaults.baseURL = 'http://localhost:8080/api';

const DebugRouter = ({ children }: { children: any }) => {
  const { location } = useHistory();
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `Route: ${location.pathname}${location.search}, State: ${JSON.stringify(
        location.state
      )}`
    );
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <DebugRouter>
          <div className="app">
            <header className="app-header">
              <a href="/">Movies</a>
            </header>
            <div className="app-content">
              <Switch>
                <Route path="/authentication">
                  <AuthenticationPage />
                </Route>
                <PrivateRoute path="/search">
                  <SearchPage />
                </PrivateRoute>
                <Redirect to="/search" />
              </Switch>
            </div>
          </div>
        </DebugRouter>
      </Router>
    </AuthProvider>
  );
}

export default App;
