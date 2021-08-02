import Movies from "./components/forms/movies";
import Customers from "./components/forms/customers";
import Rentals from "./components/forms/rentals";
import Movie from "./components/forms/movie";
import Login from "./components/forms/login";
import Register from "./components/forms/register";
import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import AuthProvider from "./components/authContext";
import Logout from "./components/forms/logout";

function App() {
  return (
    <AuthProvider>
      <div>
        <ToastContainer />
        <Router>
          <Navbar />
          <main className="container">
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <ProtectedRoute path="/movies/new">
                <Movie />
              </ProtectedRoute>
              <ProtectedRoute path="/movies/:id">
                <Movie />
              </ProtectedRoute>
              <Route path="/movies">
                <Movies property1="salam" />
              </Route>
              <Route path="/customers">
                <Customers />
              </Route>
              <Route path="/rental">
                <Rentals />
              </Route>
              <Redirect exact from="/" to="/movies" />
              <Route path="*">
                <p>Not Found</p>
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
