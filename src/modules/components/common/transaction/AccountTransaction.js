import React, { useEffect, useState } from "react";
import CommonHeader from "../CommonHeader";
import PropTypes from "prop-types";
import { Drawer } from "@mui/material";
import useSwipeClose from "../../hooks/useSwipeClose";
import { fetchTransactionsByAccount } from "../../../services/transaction/transactionService";
import { setNotification } from "../../../actions/state";
import { useAppContext } from "../../../providers/AppProvider";
import { useTranslation } from "react-i18next";

const AccountTransaction = ({
  isOpen,
  handleClose,
  currentAccount,
  transactionType = null,
}) => {
  const { dispatch } = useAppContext();
  const { t } = useTranslation("account_transaction");
  const [transactions, setTransactions] = useState([]);

  useSwipeClose({ isOpen: isOpen, onClose: (event) => handleClose(event) });

  useEffect(() => {
    // Ensure currentAccount is valid before fetching
    if (!currentAccount?.id) {
      console.info("ℹ️ No account ID provided. Skipping transaction fetch.");
      return;
    }

    const fetchTransactions = async () => {
      try {
        console.info(
          `ℹ️ Initiating fetch for transactions of account ID: ${currentAccount.id}`
        );

        const { data, success } = await fetchTransactionsByAccount(
          currentAccount.id
        );

        if (success && data) {
          console.info(
            `✅ Successfully fetched transactions for account ID: ${currentAccount.id}`
          );
          setTransactions(data);
        } else {
          // Handle unsuccessful responses
          console.warn(
            `⚠️ Failed to fetch transactions for account ID: ${currentAccount.id}.`
          );
          dispatch(
            setNotification({
              type: "error",
              info: t("get_transactions_error"),
            })
          );
        }
      } catch (error) {
        // Catch unexpected errors and notify the user
        console.error(
          `❌ Unexpected error while fetching transactions for account ID: ${currentAccount.id}`,
          error
        );
        dispatch(
          setNotification({
            type: "error",
            info: t("get_transactions_error"),
          })
        );
      }
    };

    fetchTransactions().then(); // Invoke the function
  }, [currentAccount, dispatch, t]);

  console.log(transactions[transactionType]);

  return (
    <>
      <Drawer
        key="transactionInfo"
        open={isOpen}
        onClose={handleClose}
        anchor="right"
        disableAutoFocus
        ModalProps={{ keepMounted: true }}
      >
        <CommonHeader handleClose={handleClose} title={transactionType} />
      </Drawer>
    </>
  );
};

AccountTransaction.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentAccount: PropTypes.object.isRequired,
  transactionType: PropTypes.string.isRequired,
};

export default AccountTransaction;
