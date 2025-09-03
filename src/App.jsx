// import tw from "tailwind-styled-components";
// import "./index.css";
// import './styles/index.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from './styles/GlobalStyles'
import Dashboard from "./pages/Dashboard";
import Users from './pages/Users';
import Account from './pages/Account'
import Bookings from './pages/Bookings'
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import AppLayout from './ui/Applayout'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";

// This is the main entry point of the application
// It sets up the React Router, global styles, and the query client for data fetching
// The QueryClientProvider wraps the application to provide query functionality
// The ReactQueryDevtools is used for debugging and inspecting queries in development mode
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="bookings" element={<Bookings />} />

              <Route path="booking/:bookingId" element={<Booking />} />
              <Route path="cabins" element={<Cabins />} />

              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: "8px",
          }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;

 
