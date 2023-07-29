import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import { Flex } from "@chakra-ui/react";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Flex
        as="main"
        mt="72px"
        direction="column"
        py="6"
        px="6"
        bgColor="#ABABAB"
      >
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen></CartScreen>}></Route>
          <Route path="/cart/:id" element={<CartScreen></CartScreen>}></Route>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>
          <Route
            path="/profile"
            element={<ProfileScreen></ProfileScreen>}
          ></Route>
          <Route
            path="/shipping"
            element={<ShippingScreen></ShippingScreen>}
          ></Route>
          <Route
            path="/payment"
            element={<PaymentScreen></PaymentScreen>}
          ></Route>
          <Route
            path="/placeorder"
            element={<PlaceOrderScreen></PlaceOrderScreen>}
          ></Route>
          <Route
            path="/order/:id"
            element={<OrderScreen></OrderScreen>}
          ></Route>
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          <Route path="/admin/productlist" element={<ProductListScreen />} />
          <Route
            path="/admin/product/:id/edit"
            element={<ProductEditScreen />}
          />
          <Route path="/admin/orderlist" element={<OrderListScreen />} />
        </Routes>
      </Flex>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
