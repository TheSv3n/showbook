import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
import ShowReviewScreen from "./screens/ShowReviewScreen";
import UserScreen from "./screens/UserScreen";
import VenueReviewScreen from "./screens/VenueReviewScreen";
import CompanyReviewScreen from "./screens/CompanyReviewScreen";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<MainFeedScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/show/:id" element={<ShowScreen />} />
            <Route path="/show/:id/cast" element={<CastScreen />} />
            <Route path="/venue/:id" element={<VenueScreen />} />
            <Route path="/castmember/:id" element={<CastMemberScreen />} />
            <Route path="/company/:id" element={<CompanyScreen />} />
            <Route path="/user/:id" element={<UserScreen />} />
            <Route path="/showreview/:id" element={<ShowReviewScreen />} />
            <Route path="/venuereview/:id" element={<VenueReviewScreen />} />
            <Route
              path="/companyreview/:id"
              element={<CompanyReviewScreen />}
            />
            <Route path="/addshow" element={<NewShowScreen />} />
            <Route path="/addvenue" element={<NewVenueScreen />} />
            <Route path="/addcastmember" element={<NewCastMemberScreen />} />
            <Route path="/addcompany" element={<NewCompanyScreen />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
