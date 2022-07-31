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
import Details from './components/Details';
import EditDestination from './components/EditDestination';
import CreateComment from './components/CreateComment';
import CommentList from './components/CommentList';
import EditComment from './components/EditComment';
import Footer from './components/Footer';
import NotFound from './components/404';
import Notification from './components/Common/Notification';

import ApplicationNotification from './components/Common/ApplicationNotification';

import PrivateRoute from './components/Common/PrivateRoute';
import GuardedRoute from './components/Common/GuardedRoute';
import ErrorBoundary from './components/Common/ErrorBoundary';

function App() {

    return (
        <ErrorBoundary>

            <AuthProvider>
                <NotificationProvider>
                    <div className="App">
                        <Header />
                        <ApplicationNotification />

                        <Notification />
                        <main id="site-content">
                            <Routes>

                                <Route path="/" element={<HomePage />} />
                                <Route path="/home-page" element={<HomePage />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/all-destinations/*" element={<AllDestinations />} />
                                <Route path="/recent" element={<RecentDestinations />} />
                                <Route path="/by-category/:category" element={<ByCategory />} />
                                <Route path="/details/:destinationId" element={<Details />} />
                                <Route path="/comments/:destinationId" element={<CommentList />} />

                                <Route path="/edit/:destinationId" element={<PrivateRoute><EditDestination /></PrivateRoute>} />
                                <Route path="/edit-comment/:commentId" element={<PrivateRoute><EditComment /></PrivateRoute>} />

                                <Route element={<GuardedRoute />} >
                                    <Route path="/logout" element={<Logout />} />
                                    <Route path="/my-destinations" element={<MyDestinations />} />
                                    <Route path="/create" element={<CreateDestination />} />
                                    <Route path="/add-comment/:destinationId" element={<CreateComment />} />
                                </Route>

                                <Route path="*" element={<NotFound />} />

                            </Routes>
                        </main>

                        <Footer />
                    </div>
                </NotificationProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;
