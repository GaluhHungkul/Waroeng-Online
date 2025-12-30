export {};

declare global {
  type MidtransTransactionStatus =
    | "capture"
    | "settlement"
    | "pending"
    | "deny"
    | "cancel"
    | "expire";

  interface MidtransSnapResult {
    transaction_status: MidtransTransactionStatus;
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_id: string;
    fraud_status?: "accept" | "challenge" | "deny";
    status_code: string;
    status_message: string;
  }

  interface Window {
    snap: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: MidtransSnapResult) => void;
          onPending?: (result: MidtransSnapResult) => void;
          onError?: (result: MidtransSnapResult) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}
