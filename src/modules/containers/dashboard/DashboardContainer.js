import React, { useEffect, useCallback } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { useAppContext } from "../../providers/AppProvider";
import { setBalance } from "../../actions/state";
import LocalStorage from "../../utils/localStorage";
import { getUserBalances } from "../../services/user/userBalanceService";

/**
 * DashboardContainer Component
 *
 * This container component serves as a wrapper for `Dashboard`.
 * It manages high-level state and logic before rendering the dashboard UI.
 * The component fetches account balances and updates the global state when it mounts.
 *
 * @returns {React.JSX.Element} The rendered dashboard component.
 */
const DashboardContainer = () => {
  const { state, dispatch } = useAppContext();
  const { balance, authData } = state;
  const { id: userId } = authData || {}; // Fallback to prevent crashes

  const fetchBalances = useCallback(async () => {
    if (!userId) return; // Avoid fetching if user is not authenticated

    try {
      const [currentBalances, status] = await getUserBalances(userId);

      if (status === 200 && currentBalances) {
        dispatch(setBalance(currentBalances));
        LocalStorage.setItem("balance", JSON.stringify(currentBalances));
      } else {
        console.warn(`⚠️ Failed to fetch balances. Status: ${status}`);
      }
    } catch (error) {
      console.error("❌ Error fetching balances:", error);
    }
  }, [userId, dispatch]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  return <Dashboard balance={balance} />;
};

export default DashboardContainer;
