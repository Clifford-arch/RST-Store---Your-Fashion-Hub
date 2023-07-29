import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParam] = useSearchParams();
  let redirect = searchParam.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl" textColor="#8739F9">
          Login
        </Heading>

        {error && <Message type="error">{error}</Message>}

        <form onSubmit={submitHandler}>
          <FormControl id="email">
            <FormLabel htmlFor="email" textColor="#8739F9">
              Email address
            </FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="username@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              textColor="white"
            />
          </FormControl>

          <Spacer h="3" />

          <FormControl id="password">
            <FormLabel htmlFor="password" textColor="#8739F9">
              Password
            </FormLabel>
            <Input
              textColor="white"
              id="password"
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            background="#8739F9"
            _hover={{ shadow: "md", bg: "whiteAlpha.800" }}
            mt="4"
            isLoading={loading}
          >
            Login
          </Button>
        </form>

        <Flex pt="10" textColor="#8739F9">
          <Text fontWeight="semibold">
            New Customer?{" "}
            <Link as={RouterLink} to="/register">
              Click here to register
            </Link>
          </Text>
        </Flex>
      </FormContainer>
    </Flex>
  );
};

export default LoginScreen;
