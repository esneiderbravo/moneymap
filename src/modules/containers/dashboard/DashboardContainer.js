import React, { useEffect } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { useAppContext } from "../../providers/AppProvider";
import { setBalance } from "../../actions/state";
import LocalStorage from "../../utils/localStorage";

/**
 * DashboardContainer Component
 *
 * This container component serves as a wrapper for `Dashboard`.
 * It manages high-level state and logic before rendering the dashboard UI.
 *
 * @returns {React.JSX.Element} The rendered dashboard content component.
 */
const DashboardContainer = () => {
  const { state, dispatch } = useAppContext();
  const { balance } = state;
  useEffect(() => {
    // Simulating fetching account balances from an API
    let currentBalances = {
      accounts: [
        {
          balance: 10000000,
          name: "Account 1",
          icon: "AccountBalance",
          color: "white",
        },
        {
          balance: 10000000,
          name: "Account 2",
          icon: "AttachMoney",
          color: "green",
        },
        { balance: 5000000, name: "Savings", icon: "Savings", color: "pink" },
      ],
      totalBalance: 20000000,
    };
    dispatch(setBalance(currentBalances));
    LocalStorage.setItem("balance", JSON.stringify(currentBalances));
  }, [dispatch]);
  return <Dashboard balance={balance} />;
};

export default DashboardContainer;
