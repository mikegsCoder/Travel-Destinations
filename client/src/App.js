// import logo from './logo.svg';
//import './App.css';

import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext'

import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Logout from './components/Logout/Logout';
import Register from './components/Register';
import AllDestinations from './components/AllDestinations/';
import RecentDestinations from './components/RecentDestinations';
import ByCategory from './components/ByCategory';
import MyDestinations from './components/MyDestinations';

import CreateDestination from './components/CreateDestination';

import Footer from './components/Footer';

import Notification from './components/Common/Notification';

function App() {

    return (
        <AuthProvider>
            <NotificationProvider>
                <div className="App">
                    <Header />

                    <Notification />
                    <main id="site-content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/home-page" element={<HomePage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/all-destinations/*" element={<AllDestinations />} />
                            <Route path="/recent" element={<RecentDestinations />} />
                            <Route path="/by-category/:category" element={<ByCategory />} />
                            <Route path="/my-destinations" element={<PrivateRoute><MyDestinations /></PrivateRoute>} />
                            <Route path="/create" element={<CreateDestination />} />

                        </Routes>
                    </main>

                    <Footer />
                </div>
            </NotificationProvider>
        </AuthProvider>
    );
}

export default App;
