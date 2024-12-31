import React from "react";
import {
  Container,
  Box,
  Text,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { colors } from "src/constants/colors";
import { Form, Formik } from "formik";
import { TextInput } from "src/components/inputs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoading } from "./redux/selector";
import { forgot_password } from "./redux/reducer";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

  let initialValues = {
    email: "",
  };

  const handleSubmit = (doc) => {
    dispatch(forgot_password(doc));
  };
  return (
    <Container maxW="container.xl">
      <Box h="100vh" display={"grid"} placeItems="center">
        <Box
          px="24px"
          py="40px"
          border="0.5px solid #D0D5DD"
          w={{ base: "full", md: "400px" }}
          borderRadius={"10px"}
        >
          <Text textStyle={"heading"} color={colors.text} textAlign={"center"}>
            Reset Password
          </Text>
          <Text
            textStyle={"md"}
            color={colors.sub}
            textAlign={"center"}
            mt="8px"
          >
            Please enter the email address associated with your account
          </Text>

          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange, dirty }) => (
              <Form>
                <Box mt="40px">
                  <FormControl isRequired>
                    <FormLabel
                      fontSize={"10px"}
                      fontWeight={"500"}
                      color={colors.text}
                    >
                      Email Address
                    </FormLabel>
                    <TextInput
                      name="email"
                      type="email"
                      handleChange={handleChange}
                      value={values.email}
                      placeholder={"Email Address"}
                    />
                  </FormControl>

                  <Button
                    variant="solid"
                    isDisabled={!dirty}
                    mt="24px"
                    w="full"
                    type="submit"
                    isLoading={loading}
                    _hover={{
                      opacity: 0.8,
                    }}
                  >
                    Send Reset Link
                  </Button>

                  <Text
                    textAlign={"center"}
                    mt="16px"
                    textStyle={"sm"}
                    color={colors.secondary}
                  >
                    <Link to="/login">Back To Sign In</Link>
                  </Text>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
