import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  // Link,
  Spacer,
  // Table,
  // Tbody,
  // Td,
  // Text,
  // Th,
  // Thead,
  // Tr,
  // Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { listMyOrders } from "../actions/orderActions";

import { getUserDetails, updateUserProfile } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
// import Loader from "../components/Loader";

import Message from "../components/Message";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails());
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, user, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ name, email, password }));
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
  };

  return (
    <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr" }} py="5" gap="10">
      <Flex
        w="full"
        alignItems="center"
        justifyContent="center"
        py="5"
        color="#8739F9"
      >
        <FormContainer>
          <Heading as="h1" mb="8" fontSize="3xl">
            User Profile
          </Heading>

          {error && <Message type="error">{error}</Message>}
          {message && <Message type="error">{message}</Message>}

          <form onSubmit={submitHandler}>
            <FormControl id="name">
              <FormLabel htmlFor="name">Your Name</FormLabel>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="email">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="username@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="password">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="confirmPassword">
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>

            <Button
              bgColor="#8739F9"
              color="whiteAlpha.800"
              _hover={{ color: "#8739F9", bgColor: "whiteAlpha.800" }}
              type="submit"
              mt="4"
              isLoading={loading}
            >
              Update
            </Button>
          </form>
        </FormContainer>
      </Flex>
      {/* Orders */}
      {/* <Flex direction="column">
        <Heading as="h2" mb="4">
          My Orders
        </Heading>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message type="error">{errorOrders}</Message>
        ) : (
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>DATE</Th>
                <Th>TOTAL</Th>
                <Th>PAID</Th>
                <Th>DELIVERED</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders?.map((order) => (
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                  <Td>Rs. {order.totalPrice}</Td>
                  <Td>
                    {order.isPaid ? (
                      new Date(order.paidAt).toDateString()
                    ) : (
                      <Icon color="red" as={IoWarning} />
                    )}
                  </Td>
                  <Td>
                    {order.isDelivered ? (
                      new Date(order.deliveredAt).toDateString()
                    ) : (
                      <Icon color="red" as={IoWarning} />
                    )}
                  </Td>
                  <Td>
                    <Button
                      as={RouterLink}
                      to={`/order/${order._id}`}
                      colorScheme="teal"
                      size="sm"
                    >
                      Details
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Flex> */}
    </Grid>
  );
};

export default ProfileScreen;
