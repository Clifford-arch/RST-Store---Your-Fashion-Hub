import { Grid, Heading } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      <Heading
        as="h1"
        mb="8"
        fontSize="xl"
        color="whiteAlpha.800"
        mt="5"
        h="10"
        bgColor="#8739F9"
        pt="1"
        textAlign="center"
        borderRadius="50"
      >
        New Arrivals
      </Heading>

      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Grid templateColumns="1fr 1fr 1fr 1fr" gap="8">
          {products?.map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default HomeScreen;
