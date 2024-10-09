import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import ProdPage from './pages/Prod/ProdPage';
import CartPage from './pages/Cart/CartPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import AuthRoute from './components/AuthRoute/AuthRoute';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import PaymentPage from './pages/Payment/PaymentPage';
import ProfilePage from './pages/Profile/ProfilePage';
import OrdersPage from './pages/Orders/OrdersPage';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminRoute from './components/AdminRoute/AdminRoute';
import ProdsAdminPage from './pages/ProdsAdmin/ProdsAdminPage';
import ProdEditPage from './pages/ProdEdit/ProdEditPage';
import UsersPage from './pages/UsersPage/UsersPage';
import UserEditPage from './pages/UserEdit/UserEditPage';


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:searchTerm" element={<HomePage />} />
            <Route path="/tag/:tag" element={<HomePage />} />
            <Route path="/prod/:id" element={<ProdPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<AuthRoute>
                <CheckoutPage />
            </AuthRoute>
            }
            />
            <Route path="/payment" element={<AuthRoute>
                <PaymentPage />
            </AuthRoute>
            }
            />
            <Route path="/profile" element={<AuthRoute>
                <ProfilePage />
            </AuthRoute>
            }
            />
            <Route path="/orders" element={<AuthRoute>
                <OrdersPage />
            </AuthRoute>
            }
            />
            <Route path="/dashboard" element={<AuthRoute>
                <Dashboard />
            </AuthRoute>
            }
            />
            <Route path="/admin/prods/:searchTerm?" element={<AdminRoute>
                <ProdsAdminPage />
            </AdminRoute>
            }
            />
            <Route path="/admin/addProd" element={<AdminRoute>
                <ProdEditPage />
            </AdminRoute>
            }
            />
            <Route path="/admin/editProd/:prodId?" element={<AdminRoute>
                <ProdEditPage />
            </AdminRoute>
            }
            />
            <Route path="/admin/users/:searchTerm?" element={<AdminRoute>
                <UsersPage />
            </AdminRoute>
            }
            />
            <Route path="/admin/editUser/:userId" element={<AdminRoute>
                <UserEditPage />
            </AdminRoute>
            }
            />
        </Routes>
    );
}
