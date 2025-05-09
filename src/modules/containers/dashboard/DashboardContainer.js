import React, { useEffect } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { useAppContext } from "../../providers/AppProvider";
import {
  setBalance,
  setCategories,
  setNotification,
} from "../../actions/state";
import LocalStorage from "../../utils/localStorage";
import { getUserBalances } from "../../services/user/userBalanceService";
import { useTranslation } from "react-i18next";
import { getAllCategories } from "../../services/category/categoryService";

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
  const { t } = useTranslation("dashboard");
  const { state, dispatch } = useAppContext();
  const { balance, authData } = state;
  const { id: userId } = authData || {}; // Fallback to prevent crashes

  useEffect(() => {
    const fetchBalances = async () => {
      if (!userId) return; // Avoid fetching if user is not authenticated

      try {
        const { data, success } = await getUserBalances(userId);
        if (success && data) {
          dispatch(setBalance(data));
          LocalStorage.setItem("balance", JSON.stringify(data));
        } else {
          console.warn(`⚠️ Failed to fetch balances.`);
          dispatch(
            setNotification({
              type: "error",
              info: t("get_balances_error"),
            })
          );
        }
      } catch (error) {
        console.error("❌ Error fetching balances:", error);
        dispatch(
          setNotification({
            type: "error",
            info: t("get_balances_error"),
          })
        );
      }
    };

    const fetchCategories = async () => {
      try {
        const { data, success } = await getAllCategories();
        if (success && data) {
          dispatch(setCategories(data));
          LocalStorage.setItem("categories", JSON.stringify(data));
        } else {
          console.warn(`⚠️ Failed to fetch categories.`);
          dispatch(
            setNotification({
              type: "error",
              info: t("get_categories_error"),
            })
          );
        }
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
        dispatch(
          setNotification({
            type: "error",
            info: t("get_categories_error"),
          })
        );
      }
    };

    fetchBalances().then(() => {});
    fetchCategories().then(() => {});
  }, [dispatch, t, userId]);

  return <Dashboard balance={balance} />;
};

export default DashboardContainer;
