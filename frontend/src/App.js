import "./css/App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import MainFeedScreen from "./screens/MainFeedScreen";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Route path="/" component={MainFeedScreen} exact />
      </Router>
    </>
  );
}

export default App;
