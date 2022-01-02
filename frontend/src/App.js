import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import MainFeedScreen from "./screens/MainFeedScreen";
import ShowScreen from "./screens/ShowScreen";
import LoginScreen from "./screens/LoginScreen";
import VenueScreen from "./screens/VenueScreen";
import CastMemberScreen from "./screens/CastMemberScreen";
import CompanyScreen from "./screens/CompanyScreen";
import NewShowScreen from "./screens/NewShowScreen";
import NewVenueScreen from "./screens/NewVenueScreen";
import NewCastMemberScreen from "./screens/NewCastMemberScreen";
import NewCompanyScreen from "./screens/NewCompanyScreen";
import CastScreen from "./screens/CastScreen";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Route path="/" component={MainFeedScreen} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/show/:id" component={ShowScreen} exact />
        <Route path="/show/:id/cast" component={CastScreen} />
        <Route path="/venue/:id" component={VenueScreen} />
        <Route path="/castmember/:id" component={CastMemberScreen} />
        <Route path="/company/:id" component={CompanyScreen} />
        <Route path="/addshow" component={NewShowScreen} />
        <Route path="/addvenue" component={NewVenueScreen} />
        <Route path="/addcastmember" component={NewCastMemberScreen} />
        <Route path="/addcompany" component={NewCompanyScreen} />
      </Router>
    </>
  );
}

export default App;
