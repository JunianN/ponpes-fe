import { RenderIf } from "@/components/elements/RenderIf";
import UserContext from "@/contexts/userContext";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useNavigate } from "react-router";

export default function DesktopNavbar() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <Box as="header" bg="green.500" textColor="white">
      <Container as="nav" maxW="8xl">
        <HStack justifyContent="space-between" py={4} minH="60px">
          <Box>
            <Button
              colorScheme="white"
              variant="link"
              onClick={() => navigate("/")}
            >
              <Text fontWeight="bold" pr={1} fontSize="xl">
                Database
              </Text>
              <Text fontWeight="normal" pr={1} fontSize="xl">
                Ponpes
              </Text>
            </Button>
            {/* <RenderIf when={user?.role === "USER"}>
              <Button
                colorScheme="white"
                variant="link"
                p={4}
                py={1}
                display={{ base: "none", md: "inline-block" }}
                onClick={() => navigate("/my/books")}
              >
                My Books
              </Button>
            </RenderIf> */}
            <RenderIf when={user?.role === "ADMIN"}>
              <Button
                colorScheme="white"
                variant="link"
                p={4}
                py={1}
                display={{ base: "none", md: "inline-block" }}
                onClick={() => navigate("/")}
              >
                Santri
              </Button>
              <Button
                colorScheme="white"
                variant="link"
                p={4}
                py={1}
                display={{ base: "none", md: "inline-block" }}
                onClick={() => navigate("/ustaz")}
              >
                Ustaz
              </Button>
              <Button
                colorScheme="white"
                variant="link"
                p={4}
                py={1}
                display={{ base: "none", md: "inline-block" }}
                onClick={() => navigate("/struktur")}
              >
                Struktur Kepengurusan
              </Button>
              <Button
                colorScheme="white"
                variant="link"
                p={4}
                py={1}
                display={{ base: "none", md: "inline-block" }}
                onClick={() => navigate("/sarpras")}
              >
                Sarpras
              </Button>
            </RenderIf>
          </Box>

          <HStack>
            <RenderIf when={!user}>
              <Button
                colorScheme="whiteAlpha"
                variant="solid"
                p={4}
                size="sm"
                display={{ base: "none", md: "flex" }}
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
            </RenderIf>

            <RenderIf when={user}>
              <Menu>
                <MenuButton>
                  <HStack h={6}>
                    <span>{user?.username}</span>
                    <HiOutlineUserCircle
                      style={{ width: "100%", height: "100%" }}
                    />
                  </HStack>
                </MenuButton>
                <MenuList textColor="black">
                  <MenuItem
                    onClick={() => {
                      setUser(null);
                      localStorage.setItem("accessToken", "");
                      navigate("/signin");
                    }}
                  >
                    Log Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </RenderIf>

            <IconButton
              aria-label="Open Menu"
              colorScheme="teal"
              size="md"
              mr={2}
              icon={<HamburgerIcon />}
              display={{ base: "flex", md: "none" }}
            />
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
