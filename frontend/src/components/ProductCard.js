import { Flex, Box, Heading, Image, Link, Text } from "@chakra-ui/react";
import Rating from "./Rating";
import { Link as RouterLink } from "react-router-dom";
const ProductCard = ({ product }) => {
  return (
    <Link
      as={RouterLink}
      to={`/product/${product._id}`}
      _hover={{ textDecor: "none" }}
    >
      <Box borderRadius="lg" bgColor="#100F10" _hover={{ shadow: "xl" }}>
        <Image
          src={product.image}
          alt={product.name}
          w="full"
          h="200px"
          objectFit="cover"
        ></Image>
        <Flex py="4" px="4" direction="column" justifyContent="space-between">
          <Heading as="h4" fontSize="lg" mb="3" color="whiteAlpha.800">
            {product.name}
          </Heading>
          <Flex alignItems="center" justifyContent="space-between">
            <Rating value={product.rating}></Rating>
            <Text fontSize="lg" fontWeight="bold" color="#8739F9">
              ₹{product.price}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default ProductCard;
