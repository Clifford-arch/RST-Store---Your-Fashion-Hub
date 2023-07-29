import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, user, successUpdate, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Button
        marginTop="2"
        marginRight="90%"
        as={RouterLink}
        to="/admin/userlist"
        colorScheme="gray"
        textColor="white"
        bgColor="#8739F9"
        _hover={{ shadow: "md", bgColor: "white", textColor: "#8739F9" }}
      >
        Go Back
      </Button>
      {/* <Link as={RouterLink} to="/admin/userlist">
        Go Back
      </Link> */}
      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer>
          <Heading as="h1" mb="8" fontSize="3xl" textColor="#8739F9">
            Edit User
          </Heading>

          {loadingUpdate && <Loader />}
          {errorUpdate && (
            <Message type="error" textColor="#8739F9">
              {errorUpdate}
            </Message>
          )}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="error">{error}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              <FormControl id="name" isRequired>
                <FormLabel textColor="#8739F9">Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  textColor="white"
                />
              </FormControl>
              <Spacer h="3" />

              <FormControl id="email" isRequired>
                <FormLabel textColor="#8739F9">Email Address</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  textColor="white"
                />
              </FormControl>
              <Spacer h="3" />

              <FormControl id="isAdmin" isRequired>
                <FormLabel textColor="#8739F9">Is Admin?</FormLabel>
                <Checkbox
                  size="lg"
                  colorScheme="teal"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  textColor="white"
                >
                  Is Admin?
                </Checkbox>
              </FormControl>
              <Spacer h="3" />

              <Button
                type="submit"
                isLoading={loading}
                bgColor="#8739F9"
                textColor="whiteAlpha.900"
                _hover={{ bgColor: "whiteAlpha.900", textColor: "#8739F9" }}
                mt="4"
              >
                Update
              </Button>
            </form>
          )}
        </FormContainer>
      </Flex>
    </>
  );
};

export default UserEditScreen;
