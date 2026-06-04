import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { Toaster } from 'react-hot-toast';

// Common
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';

// Public Layout & Pages
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Reservation from './pages/Reservation';
import Gallery from './pages/Gallery';
import Ticketing from './pages/Ticketing';

// Admin Layout & Pages
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEvents from './pages/admin/AdminEvents';
import AdminTickets from './pages/admin/AdminTickets';
import AdminReservations from './pages/admin/AdminReservations';
import { 
  AdminUsers, AdminSettings, AdminReports 
} from './pages/admin/AdminPlaceholders';
import AdminClients from './pages/admin/AdminClients';
import AdminPayments from './pages/admin/AdminPayments';
import AdminGallery from './pages/admin/AdminGallery';
import AdminNewsletters from './pages/admin/AdminNewsletters';

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main style={{ flexGrow: 1 }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AdminProvider>
          <BrowserRouter>
            <Toaster position="top-right" toastOptions={{
              className: '',
              style: {
                background: '#1A1D24',
                color: '#fff',
                border: '1px solid #2A2D36',
              },
              success: {
                iconTheme: {
                  primary: '#00E35F',
                  secondary: '#000',
                },
              },
            }} />
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/events/:id/tickets" element={<Ticketing />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/gallery" element={<Gallery />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/events" element={<AdminEvents />} />
                  <Route path="/admin/tickets" element={<AdminTickets />} />
                  <Route path="/admin/reservations" element={<AdminReservations />} />
                  <Route path="/admin/clients" element={<AdminClients />} />
                  <Route path="/admin/payments" element={<AdminPayments />} />
                  <Route path="/admin/gallery" element={<AdminGallery />} />
                  <Route path="/admin/newsletters" element={<AdminNewsletters />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                  <Route path="/admin/reports" element={<AdminReports />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
