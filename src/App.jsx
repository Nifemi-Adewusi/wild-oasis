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
              <Route path="cabins" element={<Cabins />} />

              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;

 
