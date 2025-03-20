import React, { useState, useContext, createContext } from "react";

import Layout from "./layout";
import Login from "../login-registration-supplier/login";
import RegistrationForm from "../login-registration-supplier/registration-form-supplier/registration-form";

import ManagementPanel from "../management-panel/management-panel";
import RegisterOfGoods from "../management-panel/routes/commodity/register-goods";
import ProductUpdate from "../management-panel/routes/commodity/product-update";
import BrandRegistration from "../management-panel/routes/brand/brand-registration";
import SalesDiscounts from "../management-panel/routes/sales-rules/sales-discounts";
import confirmationSupplier from "../management-panel/routes/confirmation-registered-persons/confirmation-supplier";
import ConfirmationShopper from "../management-panel/routes/confirmation-registered-persons/confirmation-shopper";
import Packaging from "../management-panel/routes/basic-definitions/packaging";
import Unit from "../management-panel/routes/basic-definitions/unit";
import ClassificationOfGoods2 from "../management-panel/routes/basic-definitions/classification-goods/classification-goods2";
import ClassificationOfGoods3 from "../management-panel/routes/basic-definitions/classification-goods/classification-goods3";
import ClassificationOfGoods1 from "../management-panel/routes/basic-definitions/classification-goods/classification-goods1";
import Colleagues from "../management-panel/routes/colleagues/colleagues";
import Representatives from "../management-panel/routes/colleagues/representatives";
import ProfileSupplier from "../management-panel/routes/profile/profile-supplier";
import ProfileShopper from "../management-panel/routes/profile/profile-shopper";
import MessageList from "../management-panel/routes/message/message-list";
import GallerySupplier from "../management-panel/routes/profile/gallery-supplier/gallery-supplier";
import AfterSalesService from "../management-panel/routes/colleagues/after-sales-service";
import Cartable from "../management-panel/routes/cartable/cartable";
import BrandCatalog from "../management-panel/routes/brand/brand-catalog/brand-catalog";
import AdminSuggestions from "../management-panel/routes/admin-suggestions/admin-suggestions";
import CertificateAuthenticity from "../management-panel/routes/certificate-authenticity/certificate-authenticity";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useDispatch } from "react-redux";
import { setToken } from "@/Store/store.js";

import { useSelector } from "react-redux";
import CheckManagementPage from "../management-panel/routes/finance/check-management";

// import PageOpen from "../../page/pageOpen.jsx";
// *****
// import Landing from "../../landing/landing.jsx";
// import Home from "../../landing/home/home.jsx";
// import Brand from "../../landing/home/component/brand.jsx";

export const AuthContext = createContext();

function AppRouter() {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
  });

  const login = (role) => {
    setAuth({
      isAuthenticated: true,
      role: role,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login }}>
      <Router>
        <Routes>
          <Route element={<Layout />}>

            {/* صفحه لاگین */}
            <Route path="/" element={<Login />} />

            <Route
              path="/registrationForm"
              element={
                <ProtectedRoute roles={[""]} component={RegistrationForm} />
              }
            />

            {/* پنل ادمین */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  roles={["Admin", "Supplier"]}
                  component={ManagementPanel}
                />
              }
            >
              <Route path="registerOfGoods" element={<RegisterOfGoods />} />
              <Route path="productUpdate" element={<ProductUpdate />} />
              <Route path="colleagues" element={<Colleagues />} />
              <Route path="representatives" element={<Representatives />} />
              <Route path="afterSalesService" element={<AfterSalesService />} />
              <Route
                path="brandRegistration"
                element={
                  <ProtectedRoute
                    roles={["Admin"]}
                    component={BrandRegistration}
                  />
                }
              />
              <Route
                path="brandCatalog"
                element={
                  <ProtectedRoute
                    roles={["Admin"]}
                    component={BrandCatalog}
                  />
                }
              />
              <Route
                path="adminSuggestions"
                element={
                  <ProtectedRoute
                    roles={["Admin"]}
                    component={AdminSuggestions}
                  />
                }
              />
              <Route
                path="certificateAuthenticity"
                element={
                  <ProtectedRoute
                    roles={["Admin"]}
                    component={CertificateAuthenticity}
                  />
                }
              />
              <Route path="salesDiscounts" element={<SalesDiscounts />} />
              <Route
                path="confirmation"
                element={
                  <ProtectedRoute
                    roles={["Admin"]}
                    component={confirmationSupplier}
                  />
                }
              />
              <Route
                path="ConfirmationOfBuyers"
                element={
                  <ProtectedRoute
                    roles={["Admin"]}
                    component={ConfirmationShopper}
                  />
                }
              />
              <Route path="Packaging" element={<Packaging />} />
              <Route path="UnitOfGoods" element={<Unit />} />
              <Route path="ProfileSupplier" element={<ProfileSupplier />} />
              <Route path="GallerySupplier" element={<GallerySupplier />} />
              <Route path="Cartable" element={<Cartable />} />
              <Route
                path="finance/check-management"
                element={<CheckManagementPage />}
              />
              <Route
                path="ProfileShopper"
                element={
                  <ProtectedRoute
                    roles={["Admin"]}
                    component={ProfileShopper}
                  />
                }
              />
              <Route
                path="ClassificationOfGoods1"
                element={
                  <ProtectedRoute
                    roles={["Admin"]}
                    component={ClassificationOfGoods1}
                  />
                }
              />
              <Route
                path="ClassificationOfGoods2"
                element={
                  <ProtectedRoute
                    roles={["Admin"]}
                    component={ClassificationOfGoods2}
                  />
                }
              />
              <Route
                path="ClassificationOfGoods3"
                element={
                  <ProtectedRoute
                    roles={["Admin"]}
                    component={ClassificationOfGoods3}
                  />
                }
              />
              <Route
                path="MessageList"
                element={
                  <ProtectedRoute roles={["Admin"]} component={MessageList} />
                }
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}
function ProtectedRoute({ roles, component: Component }) {
  // خواندن کوکی
  const dispatch = useDispatch();
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // خواندن توکن و نقش از کوکی
  const authToken = getCookie("authToken");
  const roleCookie = getCookie("role");
  dispatch(setToken(authToken));

  // اگر توکن وجود ندارد، کاربر را به صفحه لاگین هدایت کنید
  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  // اگر نقش کاربر با نقش‌های مجاز مطابقت ندارد، کاربر را به صفحه لاگین هدایت کنید
  if (roles && roles.length > 0 && !roles.includes(roleCookie)) {
    return <Navigate to="/" replace />;
  }

  // اگر همه چیز درست است، کامپوننت مورد نظر را رندر کنید
  return <Component />;
}

export default AppRouter;
