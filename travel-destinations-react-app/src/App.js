// import logo from './logo.svg';
//import './App.css';

import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';


import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';

import Footer from './components/Footer';

function App() {

    return (
        <AuthProvider>
            <div className="App">
                <Header />

                <main id="site-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home-page" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />

                    </Routes>
                </main>

                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
