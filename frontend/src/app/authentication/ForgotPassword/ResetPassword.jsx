import { useEffect } from "react";
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
import { TextInput } from "../../../components/Inputs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, getError } from "./redux/selector";
import { forgot_password } from "./redux/reducer";
import * as Yup from "yup";
import { useColors } from '../../../utils/colors';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const toast = useToast();
  const colors = useColors();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(forgot_password(values));
    setSubmitting(false);
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

  return (
    <Container maxW="container.xl" bg={colors.bgColor} color={colors.textColor}>
      <Box h="100vh" display={"grid"} placeItems="center">
        <Box
          px="24px"
          py="40px"
          border="0.5px solid #D0D5DD"
          w={{ base: "full", md: "400px" }}
          borderRadius={"10px"}
        >
          <Text textStyle={"heading"} olor={colors.textColor} textAlign={"center"}>
            Reset Password
          </Text>
          <Text
            textStyle={"md"}
            color={colors.textColor}
            textAlign={"center"}
            mt="8px"
          >
            Please enter the email address associated with your account
          </Text>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                <Box mt="40px">
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
                      type="email"
                      handleChange={handleChange}
                      value={values.email}
                      placeholder={"Email Address"}
                    />
                  </FormControl>

                  <Button
                    variant="solid"
                    isDisabled={loading || isSubmitting}
                    mt="24px"
                    w="full"
                    type="submit"
                    isLoading={loading || isSubmitting}
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
                    color={colors.textColor}
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
