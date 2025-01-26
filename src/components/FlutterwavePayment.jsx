import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import api from "../services/DataService";

const FlutterwavePayment = ({ config, onSuccess, onError, onClose }) => {
  const toast = useToast();

  const handleTransactionUpdate = async (response, status) => {
    try {
      // Send transaction data to backend
      const transactionResponse = await api.post(
        "/api/v1/transactions/callback",
        {
          transaction_id: response.transaction_id,
          tx_ref: response.tx_ref,
        },
      );

      if (!transactionResponse.data.success) {
        throw new Error(
          transactionResponse.data.error || "Failed to verify transaction",
        );
      }

      return transactionResponse.data;
    } catch (error) {
      console.error("Transaction update error:", error);
      throw error;
    }
  };

  const loadFlutterwaveScript = (retryCount = 3) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.flutterwave.com/v3.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        if (retryCount > 0) {
          setTimeout(
            () =>
              loadFlutterwaveScript(retryCount - 1)
                .then(resolve)
                .catch(reject),
            1000,
          );
        } else {
          reject(new Error("Failed to load payment script"));
        }
      };
      document.body.appendChild(script);
    });
  };

  const initializePayment = async () => {
    try {
      await loadFlutterwaveScript();

      const paymentConfig = {
        ...config,
        callback: async (response) => {
          try {
            if (response) {
              // Verify payment with backend
              const verifyResponse = await api.post(
                "/api/v1/transactions/callback",
                {
                  transaction_id: response.transaction_id,
                  tx_ref: response.tx_ref,
                  payment_type: response.payment_type,
                },
              );

              console.log("Payment verification response:", verifyResponse);

              if (verifyResponse.data.success) {
                // Update transaction status
                await handleTransactionUpdate(response, "completed");

                toast({
                  title: "Payment Successful",
                  description: "Your payment has been verified successfully",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });

                onSuccess(response);
              } else {
                throw new Error("Payment verification failed");
              }
            } else {
              // Handle failed payment
              await handleTransactionUpdate(response, "failed");
              throw new Error("Please hold on while admin verify your payment");
            }
          } catch (error) {
            console.error("Payment callback error:", error);
            onError(error);
          }
        },
        onclose: async () => {
          try {
            // Handle payment modal close
            if (window.paymentInitiated) {
              await handleTransactionUpdate(
                { tx_ref: config.tx_ref },
                "cancelled",
              );
            }
            toast({
              title: "Payment Cancelled",
              description: "You have cancelled the payment",
              status: "warning",
              duration: 5000,
              isClosable: true,
            });
            onClose?.();
          } catch (error) {
            console.error("Error handling payment close:", error);
          }
        },
      };

      window.paymentInitiated = true;
      if (typeof window.FlutterwaveCheckout === "function") {
        window.FlutterwaveCheckout(paymentConfig);
      } else {
        throw new Error("Flutterwave not initialized properly");
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      onError(error);
    }
  };

  useEffect(() => {
    initializePayment();
    return () => {
      window.paymentInitiated = false;
    };
  }, []);

  return null;
};

export default FlutterwavePayment;
