import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Box,
} from "@chakra-ui/react";
import { IoCaretForwardSharp } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Flex justifyContent="center" mb="8">
      <Box
        mr="5"
        display="flex"
        size="xs"
        bgColor="white"
        padding="3"
        borderRadius="5"
        justifyContent="center"
        mt="1"
      >
        <Breadcrumb separator={<IoCaretForwardSharp />}>
          {/* Step 1 */}
          <BreadcrumbItem>
            {step1 ? (
              <BreadcrumbLink
                _hover={{ textDecor: "none", color: "orange.400" }}
                as={RouterLink}
                to="/login"
              >
                Login
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink
                disabled
                color="gray.600"
                _hover={{ textDecor: "line-through" }}
              >
                Login
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>

          {/* Step 2 */}
          <BreadcrumbItem>
            {step2 ? (
              <BreadcrumbLink
                as={RouterLink}
                to="/shipping"
                _hover={{ textDecor: "none", color: "orange.400" }}
              >
                Shipping
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink
                disabled
                color="gray.600"
                _hover={{ textDecor: "line-through" }}
              >
                Shipping
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>

          {/* Step 3 */}
          <BreadcrumbItem>
            {step3 ? (
              <BreadcrumbLink
                as={RouterLink}
                to="/payment"
                _hover={{ textDecor: "none", color: "orange.400" }}
              >
                Payment
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink
                disabled
                color="gray.600"
                _hover={{ textDecor: "line-through" }}
              >
                Payment
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>

          {/* Step 4 */}
          <BreadcrumbItem>
            {step4 ? (
              <BreadcrumbLink
                as={RouterLink}
                to="/placeorder"
                _hover={{ textDecor: "none", color: "orange.400" }}
              >
                Place Order
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink
                disabled
                color="gray.600"
                _hover={{ textDecor: "line-through" }}
              >
                Place Order
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
    </Flex>
  );
};

export default CheckoutSteps;
