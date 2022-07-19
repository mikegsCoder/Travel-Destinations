// import logo from './logo.svg';
//import './App.css';

import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext'

import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';

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

                        </Routes>
                    </main>

                    <Footer />
                </div>
            </NotificationProvider>
        </AuthProvider>
    );
}

export default App;
