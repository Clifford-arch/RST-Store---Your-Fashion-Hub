import {
  Button,
  Flex,
  Grid,
  Image,
  Heading,
  Text,
  Select,
  Box,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import {
  Link as RouterLink,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Rating from "../components/Rating";

import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";

import { useDispatch, useSelector } from "react-redux";
const ProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review submitted");
      setRating(1);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }

    dispatch(listProductDetails(id));
  }, [id, dispatch, successProductReview]);
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <>
      <Flex mb="4">
        <Button
          as={RouterLink}
          to="/"
          colorScheme="gray"
          textColor="white"
          bgColor="#8739F9"
          _hover={{ shadow: "md" }}
        >
          Go Back
        </Button>
      </Flex>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Grid templateColumns="3fr 3fr" gap="4" justifyContent="center">
          <Image
            objectFit="cover"
            justifyContent="center"
            src={product.image}
            alt={product.name}
            borderRadius="10"
            boxSize="2xl"
            ml="25"
          />
          <Grid templateRows="2fr 2fr " gap="1" justifyContent="center">
            <Flex
              direction="column"
              bgColor="#100F10"
              padding="6"
              borderRadius="20"
            >
              <Heading as="h4" fontSize="md" color="#8739F9">
                {product.brand}
              </Heading>
              <Heading as="h2" fontSize="4xl" color="whiteAlpha.800" mb="4">
                {product.name}
              </Heading>
              <Flex>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                ></Rating>
                <Text fontSize="xs" color="whiteAlpha.600" ml="3">
                  {product.rating}
                </Text>
              </Flex>
              <Heading
                as="h5"
                fontSize="4xl"
                fontWeight="bold"
                my="3"
                color="whiteAlpha.800"
              >
                ₹{product.price}
              </Heading>
              <Text color="whiteAlpha.800">{product.description}</Text>
            </Flex>
            <Flex
              direction="column"
              bgColor="#100F10"
              padding="5"
              borderRadius="20"
            >
              <Flex justifyContent="space-between" py="2">
                <Text color="#8739F9">Price: </Text>
                <Text fontWeight="bold" color="#8739F9">
                  ₹{product.price}
                </Text>
              </Flex>

              <Flex justifyContent="space-between" py="2">
                <Text color="#8739F9">Status: </Text>
                <Text fontWeight="bold" color="#8739F9">
                  {product.countInStock > 0 ? "In Stock" : "Not Available"}
                </Text>
              </Flex>

              {product.countInStock > 0 && (
                <Flex color="#8739F9" justifyContent="space-between" py="2">
                  <Text>Qty:</Text>
                  <Select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    width="30%"
                  >
                    {[...Array(product.countInStock).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Select>
                </Flex>
              )}

              <Button
                bg="#8739F9"
                colorScheme="gray"
                textColor="whiteAlpha.800"
                mt="10"
                textTransform="uppercase"
                letterSpacing="wide"
                isDisabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                Add to cart
              </Button>
            </Flex>
          </Grid>
        </Grid>
      )}

      {/* Review Form */}
      <Box p="10" bgColor="#100F10" rounded="md" mt="10" borderColor="gray.300">
        <Heading as="h3" size="lg" mb="6" textColor="#8739F9">
          Write a review
        </Heading>

        {product.reviews.length === 0 && <Message>No Reviews</Message>}

        {product.reviews.length !== 0 && (
          <Box
            p="4"
            bgColor="#100F10"
            textColor="#8739F9"
            rounded="md"
            mb="1"
            mt="5"
          >
            {product.reviews.map((review) => (
              <Flex direction="column" key={review._id} mb="5">
                <Flex justifyContent="space-between">
                  <Text fontSize="lg">
                    <strong>{review.name}</strong>
                  </Text>
                  <Rating value={review.rating} />
                </Flex>
                <Text mt="2">{review.comment}</Text>
              </Flex>
            ))}
          </Box>
        )}

        {errorProductReview && (
          <Message type="error">{errorProductReview}</Message>
        )}

        {userInfo ? (
          <form onSubmit={submitHandler}>
            <FormControl id="rating" mb="3">
              <FormLabel textColor="#8739F9">Rating</FormLabel>
              <Select
                textColor="silver"
                bgColor="#100F10"
                placeholder="Select Option"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option>Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Okay</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </Select>
            </FormControl>

            <FormControl id="comment" mb="3">
              <FormLabel textColor="#8739F9">Comment</FormLabel>
              <Textarea
                textColor="whiteAlpha.800"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></Textarea>
            </FormControl>

            <Button bgColor="#8739F9" type="submit">
              Post Review
            </Button>
          </form>
        ) : (
          <Message>Please login to write a review</Message>
        )}
      </Box>
    </>
  );
};

export default ProductScreen;
