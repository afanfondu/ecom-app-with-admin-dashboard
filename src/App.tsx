import { Route } from 'react-router'
import { BrowserRouter } from 'react-router'
import { Routes } from 'react-router'
import Navbar from './components/shared/navbar'
import LoginPage from './pages/login'
import HomePage from './pages/home'
import CartPage from './pages/cart'
import ProductDetailsPage from './pages/product-details'
import AdminLayout from './pages/dashboard/layout'
import DashboardPage from './pages/dashboard/root'
import ProductsManagementPage from './pages/dashboard/products-management'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route path="/dashboard" index element={<DashboardPage />} />
          <Route
            path="/dashboard/management/products"
            index
            element={<ProductsManagementPage />}
          />
        </Route>

        <Route path="/" element={<Navbar />}>
          <Route path="/" index element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
