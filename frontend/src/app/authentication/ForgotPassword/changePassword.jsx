import {
  Container,
  Box,
  Text,
  FormControl,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { PasswordInput, TextInput } from "../../../components/inputs";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, getError } from "./redux/selector";
import { change_password } from "./redux/reducer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const toast = useToast();
  const params = useParams();
  const passwordRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const handleSubmit = (doc) => {
    dispatch(change_password({ id: params.id, data: doc }));
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const Schema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is required.")
      .min(8, "Password is too short - should be at least 8 characters.")
      .matches(passwordRegex, "No special character"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword")],
      "Password doesn't match new password",
    ),
  });

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
          <Text textStyle={"heading"} color={"teal.500"} textAlign={"center"}>
            Set New Password
          </Text>
          <Text
            textStyle={"md"}
            color={"gray.600"}
            textAlign={"center"}
            mt="8px"
          >
            Please enter a new password. It must be different from the previous
            one.
          </Text>

          <Formik
            initialValues={{ email: "", newPassword: "", confirmPassword: "" }}
            onSubmit={handleSubmit}
            validationSchema={Schema}
          >
            {({ values, handleChange, dirty, handleBlur, errors, touched }) => (
              <Form>
                <Box mt="40px" display={"flex"} flexDir={"column"} gap="16px">
                  <FormControl isRequired>
                    <FormLabel
                      fontSize={"10px"}
                      fontWeight={"500"}
                      color={"gray.600"}
                    >
                      Email Address
                    </FormLabel>
                    <TextInput
                      name="email"
                      value={values.email}
                      placeholder={"Email Address "}
                      handleChange={handleChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel
                      fontSize={"10px"}
                      fontWeight={"500"}
                      color={"gray.600"}
                    >
                      New Password
                    </FormLabel>
                    <PasswordInput
                      name="newPassword"
                      value={values.newPassword}
                      placeholder={"New Password"}
                      handleChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.newPassword && touched.newPassword && (
                      <Text color="red" mt="5px" fontSize="12px">
                        {errors.newPassword}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel
                      fontSize={"10px"}
                      fontWeight={"500"}
                      color={"gray.600"}
                    >
                      Confirm Password
                    </FormLabel>
                    <PasswordInput
                      name="confirmPassword"
                      value={values.confirmPassword}
                      placeholder={"Confirm Password"}
                      handleChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Text color="red" mt="5px" fontSize="12px">
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </FormControl>
                </Box>
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
                  Reset Password
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePassword;
