import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import AppointmentType from './pages/AppointmentType';
import ExpenseType from './pages/ExpenseType';
import Appointment from './pages/Appointment';
import Finances from './pages/Finances';
import User from './pages/User.jsx';
import ChangePassword from './pages/ChangePassword';
import MainLayout from './layouts/MainLayout';
import Profile from './pages/Profile';
import { PrivateRoute } from './routes/PrivateRoute';
import { AdminRoute } from './routes/AdminRoute';
import { UserRoute } from './routes/UserRoute.jsx';
import { UserOrPatientRoute } from './routes/UserOrPatientRoute.jsx';
import Patient from "./pages/Patient";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<About />} />
          <Route path="about" element={<About />} />

          <Route path="home" element={<UserOrPatientRoute><Home /></UserOrPatientRoute>} />

          <Route path="appointment-type" element={<UserRoute><AppointmentType /></UserRoute>} />
          <Route path="expense-type" element={<UserRoute><ExpenseType /></UserRoute>} />
          <Route path="appointment" element={<UserRoute><Appointment /></UserRoute>} />
          <Route path="finances" element={<UserRoute><Finances /></UserRoute>} />
          <Route path="patient" element={<UserRoute><Patient /></UserRoute>} />

          <Route path="user" element={<AdminRoute><User /></AdminRoute>}/>
          <Route path="profile" element={<Profile />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
