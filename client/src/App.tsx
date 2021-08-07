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

axios.defaults.baseURL = 'http://localhost:8080/api';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <header>
            <a href="/">Movie Search</a>
          </header>

          <Switch>
            <Route path="/authentication">
              <AuthenticationPage />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Redirect to="/search" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
