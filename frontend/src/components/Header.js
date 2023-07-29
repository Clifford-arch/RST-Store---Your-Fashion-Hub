import {
  Box,
  Heading,
  Link,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { HiShoppingCart, HiMenuAlt3 } from "react-icons/hi";
import { BiLogIn } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import HeaderMenuItem from "./HeaderMenuItem";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Flex
      align="center"
      bgColor="#100F10"
      wrap="wrap"
      w="100%"
      py="6"
      px="6"
      pos="fixed"
      top="0"
      left="0"
      justifyContent="space-between"
      zIndex="1"
    >
      {/*Logo-title */}
      <Link
        as={RouterLink}
        to="/"
        _hover={{ textDecor: `none` }}
        display="flex"
      >
        <Heading
          as="h1"
          color="#8739F9"
          fontWeight="bold"
          size="md"
          letterSpacing="wide"
          fontFamily="sans-serif"
          mr="1"
        >
          RST
        </Heading>
        <Heading
          as="h1"
          color="whiteAlpha.900"
          size="md"
          letterSpacing="wide"
          fontFamily="sans-serif"
        >
          Store
        </Heading>
      </Link>

      {/* Hamburger Menu */}
      <Box onClick={() => setShow(!show)}>
        <Icon
          display={{ base: "block", md: "none" }}
          as={HiMenuAlt3}
          color="white"
          w="6"
          h="6"
        />
      </Box>
      {/*Menu */}
      <Box
        display={{ base: show ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        mt={{ base: "4", md: "0" }}
      >
        <Box
          mr="5"
          display="flex"
          size="xs"
          bgColor="#8739F9"
          paddingLeft="2"
          borderRadius="5"
          justifyContent="center"
          mt="1"
          _hover={{ bgColor: "whiteAlpha.900", color: "#8739F9" }}
        >
          <Icon as={BsSearch} mr="2" w="4" h="4" mt="0.7em"></Icon>
          <Input
            borderLeftRadius="0"
            borderRightRadius="5"
            bgColor="#ABABAB"
            border="none"
          ></Input>
        </Box>
        <HeaderMenuItem
          url={"/cart"}
          icon={HiShoppingCart}
          label="Cart"
        ></HeaderMenuItem>
        {userInfo ? (
          <Menu>
            <MenuButton
              bgColor="#8739F9"
              _hover={{ textColor: "#8739F9", bgColor: "whiteAlpha.900" }}
              as={Button}
              rightIcon={<IoChevronDown />}
            >
              {userInfo.name}
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <HeaderMenuItem url="/login" label="Login" icon={BiLogIn} />
        )}

        {/* Admin Menu */}
        {userInfo && userInfo.isAdmin && (
          <Menu>
            <MenuButton
              ml="3"
              fontSize="sm"
              fontWeight="semibold"
              as={Button}
              textTransform="uppercase"
              _hover={{ textDecor: "none", opacity: "0.7" }}
            >
              Manage <Icon as={IoChevronDown} />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/admin/userlist">
                All Users
              </MenuItem>
              <MenuItem as={RouterLink} to="/admin/productlist">
                All Products
              </MenuItem>
              <MenuItem as={RouterLink} to="/admin/orderlist">
                All Orders
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
