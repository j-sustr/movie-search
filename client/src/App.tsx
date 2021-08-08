import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import AuthenticationPage from './pages/authentication/AuthenticationPage';
import SearchPage from './pages/search/SearchPage';
import PrivateRoute from './modules/auth/PrivateRoute';
import { AuthProvider } from './modules/auth/AuthContext';

axios.defaults.baseURL = 'http://localhost:8080/api';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <header>
            <a href="/">Movie Search</a>
          </header>

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
      </Router>
    </AuthProvider>
  );
}

export default App;
