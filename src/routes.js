// Note: Routes component...!

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
}
  from "react-router-dom";

// Note: Importing reuseabale components...!
import Navigation from "./components/navigation/navigation";
import SignUp from "./components/auth-components/signup";
import LogIn from "./components/auth-components/login";
import Home from "./components/home-component/home";
import Profile from "./components/profile-component/profile";
import NotFound from "./components/not-found-component/not-found";

const AppRoutes = () => {

  return (
    <React.Fragment>
      <Router>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default AppRoutes;