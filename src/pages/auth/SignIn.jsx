import { PasswordInput } from "@/components/elements/PasswordInput";
import { SignInLayout } from "@/components/layouts/SignInLayout";
import UserContext from "@/contexts/userContext";
import { useRole } from "@/utils/hooks/useRole";
import { fetcher } from "@/utils/services/fetcher";
import {
  Box,
  Button,
  Center,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";

export function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const signInHandler = async () => {
    try {
      const res = await fetcher.post("/auth/signin", {
        username: username,
        password: password,
      });

      if (!res.status) throw new Error(res.error);

      const user = res.data.data.user;

      setUser({
        id: user._id,
        username: user.username,
        role: user.role,
      });

      localStorage.setItem("accessToken", res.data.data.accessToken);

      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        toast({
          title: "Username atau password salah",
          status: "error",
          isClosable: true,
          // position: "top",
          duration: 5000,
        });
      }
      if (error.response.status === 400) {
        toast({
          title: "Masukkan username dan password",
          status: "error",
          isClosable: true,
          // position: "top",
          duration: 5000,
        });
      }
    }
  };

  return (
    <SignInLayout title="Sign In - Database Ponpes">
      <Text as="h1" fontSize="3xl" fontWeight="bold">
        Sign In
      </Text>
      <Text fontSize="lg" fontWeight="bold">
        Database Ponpes
      </Text>
      <Stack m={4}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <PasswordInput
          text={password}
          setText={setPassword}
          placeholder="Password"
          required
        />
      </Stack>
      <Button colorScheme="green" minW="30%" onClick={signInHandler}>
        Sign In
      </Button>
    </SignInLayout>
  );
}
