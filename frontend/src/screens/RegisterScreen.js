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

import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let redirect = searchParams.get("redirect") || "/";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl" textColor="#8739F9">
          Register
        </Heading>

        {error && <Message type="error">{error}</Message>}
        {message && <Message type="error">{message}</Message>}

        <form onSubmit={submitHandler}>
          <FormControl id="name">
            <FormLabel htmlFor="name" textColor="#8739F9">
              Your Name
            </FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              textColor="white"
            />
          </FormControl>

          <Spacer h="3" />

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
              id="password"
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              textColor="white"
            />
          </FormControl>

          <Spacer h="3" />

          <FormControl id="confirmPassword">
            <FormLabel htmlFor="confirmPassword" textColor="#8739F9">
              Confirm Password
            </FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              textColor="white"
            />
          </FormControl>

          <Button type="submit" bgColor="#8739F9" mt="4" isLoading={loading}>
            Register
          </Button>
        </form>

        <Flex pt="10">
          <Text fontWeight="semibold" textColor="#8739F9">
            Already a Customer?{" "}
            <Link as={RouterLink} to="/login">
              Click here to login
            </Link>
          </Text>
        </Flex>
      </FormContainer>
    </Flex>
  );
};

export default RegisterScreen;
