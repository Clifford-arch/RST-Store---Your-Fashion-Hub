import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate(`/admin/productlist`);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`/api/uploads`, formData, config);
      setImage(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button
        marginTop="2"
        marginRight="90%"
        as={RouterLink}
        to="/admin/productlist"
        colorScheme="gray"
        textColor="white"
        bgColor="#8739F9"
        _hover={{ shadow: "md", bgColor: "white", textColor: "#8739F9" }}
      >
        Go Back
      </Button>
      {/* <Link as={RouterLink} to="/admin/productlist">
        Go Back
      </Link> */}

      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer>
          <Heading as="h1" mb="8" fontSize="3xl" textColor="#8739F9">
            Edit Product
          </Heading>

          {loadingUpdate && <Loader />}
          {errorUpdate && <Message type="error">{errorUpdate}</Message>}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="error">{error}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              {/* NAME */}
              <FormControl id="name" isRequired>
                <FormLabel textColor="#8739F9">Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  textColor="whiteAlpha.800"
                />
              </FormControl>
              <Spacer h="3" />

              {/* PRICE */}
              <FormControl id="price" isRequired>
                <FormLabel textColor="#8739F9">Price</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  textColor="whiteAlpha.800"
                />
              </FormControl>
              <Spacer h="3" />

              {/* IMAGE */}
              <FormControl id="image" isRequired>
                <FormLabel>Image</FormLabel>
                <Input
                  textColor="whiteAlpha.800"
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <Input
                  type="file"
                  onChange={uploadFileHandler}
                  textColor="whiteAlpha.800"
                />
              </FormControl>
              <Spacer h="3" />

              <Spacer h="3" />

              {/* DESCRIPTION */}
              <FormControl id="description" isRequired>
                <FormLabel textColor="#8739F9">Description</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  textColor="whiteAlpha.800"
                />
              </FormControl>
              <Spacer h="3" />

              {/* BRAND */}
              <FormControl id="brand" isRequired>
                <FormLabel textColor="#8739F9">Brand</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  textColor="whiteAlpha.800"
                />
              </FormControl>
              <Spacer h="3" />

              {/* CATEGORY */}
              <FormControl id="category" isRequired>
                <FormLabel textColor="#8739F9">Category</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  textColor="whiteAlpha.800"
                />
              </FormControl>
              <Spacer h="3" />

              {/* COUNT IN STOCK */}
              <FormControl id="countInStock" isRequired>
                <FormLabel textColor="#8739F9">Count In Stock</FormLabel>
                <Input
                  type="number"
                  placeholder="Product in stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  textColor="whiteAlpha.800"
                />
              </FormControl>
              <Spacer h="3" />

              <Button
                type="submit"
                isLoading={loading}
                bgColor="#8739F9"
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

export default ProductEditScreen;
