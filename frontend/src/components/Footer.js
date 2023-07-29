import { Flex, Text } from "@chakra-ui/react";
const Footer = () => {
  return (
    <Flex
      alignItems="center"
      as="footer"
      py="5"
      justifyContent="center"
      width="100%"
      bgColor="#100F10"
    >
      <Text
        textAlign="center"
        color="whiteAlpha.800"
        bgColor="#8739F9"
        width="27%"
        paddingBottom="4"
        paddingTop="4"
        marginRight="1"
        ml="1"
        borderRadius="20"
      >
        @Copyright {new Date().getFullYear()}. RST Store. All Rights are
        reserved
      </Text>
    </Flex>
  );
};

export default Footer;
