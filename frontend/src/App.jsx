import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CarListPage from './pages/CarListPage';
import CarDetailsPage from './pages/CarDetailsPage';
import CarCreationPage from './pages/CarCreationPage';
import CarEditPage from './pages/CarEditPage';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<PrivateRoute element={<CarListPage />} />}
            />
            <Route
              path="/createCar"
              element={<PrivateRoute element={<CarCreationPage />} />}
            />
            <Route
              path="/car/:carId"
              element={<PrivateRoute element={<CarDetailsPage />} />}
            />
            <Route
              path="/editCar/:carId"
              element={<PrivateRoute element={<CarEditPage />} />}
            />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>

      </UserProvider>
    </Router>
  );
}

export default App;