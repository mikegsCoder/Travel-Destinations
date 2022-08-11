import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ApplicationNotificationProvider } from './contexts/ApplicationNotificationContext';
import { InvalidDataNotificationProvider } from './contexts/InvalidDataNotificationContext';

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
import MapComponent from './components/MapComponent';
import ProfileStatistics from './components/ProfileStatistics';

import ApplicationNotification from './components/Common/ApplicationNotification';
import InvalidDataNotification from './components/Common/InvalidDataNotification';

import ErrorBoundary from './components/Common/ErrorBoundary';
import GuardedRoute from './components/Common/GuardedRoute';
import DestinationOwner from './components/Common/DestinationOwner';
import CommentOwner from './components/Common/CommentOwner';

function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <ApplicationNotificationProvider>
                    <InvalidDataNotificationProvider>
                        <div className="App">
                            <Header />
                            <ApplicationNotification />
                            <InvalidDataNotification />
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
                                    <Route path="/map/:destinationId" element={<MapComponent />} />

                                    <Route element={<DestinationOwner />}>
                                        <Route path="/edit/:destinationId" element={<EditDestination />} />
                                    </Route>

                                    <Route element={<CommentOwner />}>
                                        <Route path="/edit-comment/:commentId" element={<EditComment />} />
                                    </Route>

                                    <Route element={<GuardedRoute />}>
                                        <Route path="/logout" element={<Logout />} />
                                        <Route path="/profile" element={<ProfileStatistics />} />
                                        <Route path="/my-destinations" element={<MyDestinations />} />
                                        <Route path="/create" element={<CreateDestination />} />
                                        <Route path="/add-comment/:destinationId" element={<CreateComment />} />
                                    </Route>

                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </main>

                            <Footer />
                        </div>
                    </InvalidDataNotificationProvider>
                </ApplicationNotificationProvider>
            </AuthProvider>
        </ErrorBoundary>
    )
}

export default App;