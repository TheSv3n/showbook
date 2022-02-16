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
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ReviewScreen from "./screens/ReviewScreen";
import UserScreen from "./screens/UserScreen";
import VenueReviewScreen from "./screens/VenueReviewScreen";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Route path="/" component={MainFeedScreen} exact />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/show/:id" component={ShowScreen} exact />
        <Route path="/show/:id/cast" component={CastScreen} />
        <Route path="/venue/:id" component={VenueScreen} />
        <Route path="/castmember/:id" component={CastMemberScreen} />
        <Route path="/company/:id" component={CompanyScreen} />
        <Route path="/user/:id" component={UserScreen} exact />
        <Route path="/showreview/:id" component={ReviewScreen} />
        <Route path="/venuereview/:id" component={VenueReviewScreen} />
        <Route path="/addshow" component={NewShowScreen} />
        <Route path="/addvenue" component={NewVenueScreen} />
        <Route path="/addcastmember" component={NewCastMemberScreen} />
        <Route path="/addcompany" component={NewCompanyScreen} />
      </Router>
    </>
  );
}

export default App;
