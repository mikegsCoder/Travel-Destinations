// import logo from './logo.svg';
//import './App.css';

import { Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';

function App() {

    return (
        <div className="App">
            
            <main id="site-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home-page" element={<HomePage />} />
                    
                </Routes>
            </main>

        </div>
    );
}

export default App;
