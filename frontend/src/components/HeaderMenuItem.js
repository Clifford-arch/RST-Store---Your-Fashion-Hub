import { Link, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
const HeaderMenuItem = ({ url, icon, label }) => {
  return (
    <Link
      _hover={{ textDecor: "none", color: "white" }}
      as={RouterLink}
      to={url}
      color="whiteAlpha.800"
      textTransform="uppercase"
      letterSpacing="wide"
      alignItems="center"
      fontSize="md"
      mr="5"
      display="flex"
    >
      <Icon as={icon} mr="1" w="4" h="4" mt="0.2em"></Icon>
      {label}
    </Link>
  );
};

export default HeaderMenuItem;
