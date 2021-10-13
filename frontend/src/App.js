import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import NavBar from "./components/NavBar";
import MainFeedScreen from "./screens/MainFeedScreen";
import ShowScreen from "./screens/ShowScreen";
import LoginScreen from "./screens/LoginScreen";
import VenueScreen from "./screens/VenueScreen";

function App() {
  return (
    <>
      <Router>
        {/*<Sidebar />*/}
        <NavBar />
        <Route path="/" component={MainFeedScreen} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/show/:id" component={ShowScreen} />
        <Route path="/venue/:id" component={VenueScreen} />
      </Router>
    </>
  );
}

export default App;
