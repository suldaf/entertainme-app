import Home from "./views/Home";
import Detail from './views/Detail'
import Nav from './components/Nav'
import { Route, Switch } from 'react-router-dom'
import Create from "./views/Create";
import Edit from './views/Edit'
import Favorites from "./views/Favorites";

function App() {
  return (
    <div className="App container-fluid" style={{ marginTop: "10px" }}>
      <Nav />
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/details/:id">
            <Detail />
          </Route>
          <Route path="/edit/:id">
            <Edit />
          </Route>
          <Route path="/add/movies">
            <Create />
          </Route>
          <Route path="/add/series">
            <Create />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
