// App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AdminProductForm from './pages/AdminProductForm';
import { AuthProvider } from './context/AuthContext';
import OrderHistory from './pages/OrderHistory';
import AdminOrders from './pages/AdminOrders';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/orders" element={<Orders />} /> */}
          <Route path="/admin/add" element={<AdminProductForm />} />
          <Route path="/admin/edit/:id" element={<AdminProductForm />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
