import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import MainFeedScreen from "./screens/MainFeedScreen";
import ShowScreen from "./screens/ShowScreen";

function App() {
  return (
    <>
      <Router>
        {/*<Sidebar />*/}
        <Route path="/" component={MainFeedScreen} exact />
        <Route path="/show/:id" component={ShowScreen} />
      </Router>
    </>
  );
}

export default App;
