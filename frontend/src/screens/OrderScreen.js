import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Button,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  Link as RouterLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log(order.totalPrice);

  const orderPayment = useSelector((state) => state.orderPayment);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPayment;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, currVal) => acc + currVal.price * currVal.qty,
      0
    );
  }

  useEffect(() => {
    if (!order._id || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, order, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  const deliverHandler = () => dispatch(deliverOrder(order));

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : (
    <>
      <Flex w="full" py="5" direction="column">
        <Grid templateColumns="3fr 2fr" gap="20">
          {/* Column 1 */}
          <Flex direction="column">
            {/* Shipping */}
            <Box borderBottom="1px" py="6" borderColor="gray.300">
              <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
                Shipping
              </Heading>
              <Text>
                Name: <strong>{order.user.name}</strong>
              </Text>
              <Text>
                Email:{" "}
                <strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </strong>
              </Text>
              <Text>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </Text>
              <Text mt="4">
                {order.isDelivered ? (
                  <Message type="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message type="warning">Not Delivered</Message>
                )}
              </Text>
            </Box>

            {/* Payment Method */}
            <Box borderBottom="1px" py="6" borderColor="gray.300">
              <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
                Payment Method
              </Heading>
              <Text>
                <strong>Method: </strong>
                {order.paymentMethod}
              </Text>
              <Text mt="4">
                {order.isPaid ? (
                  <Message type="success">
                    Paid on {new Date(order.paidAt).toUTCString()}
                  </Message>
                ) : (
                  <Message type="warning">Not Paid</Message>
                )}
              </Text>
            </Box>

            {/* Order Items */}
            <Box borderBottom="1px" py="6" borderColor="gray.300">
              <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
                Order Items
              </Heading>
              <Box>
                {order.orderItems.length === 0 ? (
                  <Message>No Order Info</Message>
                ) : (
                  <Box py="2">
                    {order.orderItems.map((item, idx) => (
                      <Flex
                        key={idx}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Flex py="2" alignItems="center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            w="12"
                            h="12"
                            objectFit="cover"
                            mr="6"
                          />
                          <Link
                            fontWeight="bold"
                            fontSize="xl"
                            as={RouterLink}
                            to={`/products/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Flex>

                        <Text fontSize="lg" fontWeight="semibold">
                          {item.qty} x ₹{item.price} = ₹{+item.qty * item.price}
                        </Text>
                      </Flex>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Flex>

          {/* Column 2 */}
          <Flex
            direction="column"
            bgColor="#100F10"
            justifyContent="space-between"
            py="8"
            px="8"
            shadow="md"
            rounded="lg"
            borderColor="gray.300"
            textColor="#8739F9"
          >
            <Box>
              <Heading mb="6" as="h2" fontSize="3xl" fontWeight="bold">
                Order Summary
              </Heading>

              {/* Items Price */}
              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.200"
                alignitems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Items</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.itemsPrice}
                </Text>
              </Flex>

              {/* Shipping Price */}
              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.200"
                alignitems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Shipping</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.shippingPrice}
                </Text>
              </Flex>

              {/* Tax Price */}
              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.200"
                alignitems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Tax</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.taxPrice}
                </Text>
              </Flex>

              {/* Total Price */}
              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.200"
                alignitems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Total</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.totalPrice}
                </Text>
              </Flex>
            </Box>

            {/* PAYMENT BUTTON */}
            {!order.isPaid && (
              <Box>
                {loadingPay ? (
                  <Loader />
                ) : (
                  <PayPalScriptProvider
                    options={{
                      clientId:
                        "AcscDkYFaYwtIm_gBBEIMuhCTuFcfA8S3TPtlRS0viZsx2AlHGc3ngXiS8nLeUvVKEPJ0LDmBIsDStXj",
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: order.totalPrice,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                          console.log(details);
                          const paymentResult = {
                            id: details.id,
                            status: details.status,
                            update_time: details.update_time,
                            email_address: details.payer.email_address,
                          };
                          successPaymentHandler(paymentResult);
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                )}
              </Box>
            )}

            {/* Order deliver button */}
            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <Button
                  type="button"
                  colorScheme="teal"
                  onClick={deliverHandler}
                >
                  Mark as delivered
                </Button>
              )}
          </Flex>
        </Grid>
      </Flex>
    </>
  );
};

export default OrderScreen;
