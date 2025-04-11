import React from "react";
import PropTypes from "prop-types";
import {
  AlertContainer,
  AlertSection,
} from "../../../styles/dashboard/alerts/Alerts.styled";
import { Chip, Grid2, Typography } from "@mui/material";
import { formatCurrency } from "../../../utils/common/currency";
import { getIconComponent } from "../../../utils/common/icon";

/**
 * Renders an individual alert card with an icon, label count, title, and optional amount.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ElementType} props.icon - The icon component to display.
 * @param {number} props.count - The number to display inside the Chip.
 * @param {string} props.title - The title/label for the alert type.
 * @param {number} [props.amount] - Optional amount to display below the title (formatted as currency).
 * @param {string} props.color - The color theme for the Chip and amount text.
 * @param {Function} props.onClick - Callback function triggered when the card is clicked.
 * @param {boolean} props.showBalances - Flag indicating whether the amounts should be shown.
 * @returns {JSX.Element} A styled alert card.
 */
const AlertCard = ({
  icon: Icon,
  count,
  title,
  amount,
  color,
  onClick,
  showBalances,
}) => {
  const HorizontalRuleRoundedIcon = getIconComponent("HorizontalRuleRounded");
  return (
    <AlertSection
      sx={{ backgroundColor: "secondary.main", p: 3 }}
      onClick={onClick}
    >
      <AlertContainer item mb={amount ? 0 : 2}>
        {Icon && <Icon fontSize="large" />}
        <Chip label={count} color={color} />
      </AlertContainer>
      <Grid2 item>
        <Typography color="text.secondary" variant="caption">
          {title}
        </Typography>
        {typeof amount === "number" && (
          <Typography color={`text.${color}`} variant="h6">
            {showBalances ? (
              formatCurrency(amount)
            ) : (
              <HorizontalRuleRoundedIcon fontSize="large" />
            )}
          </Typography>
        )}
      </Grid2>
    </AlertSection>
  );
};

AlertCard.propTypes = {
  icon: PropTypes.elementType,
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  showBalances: PropTypes.func.isRequired,
};

export default AlertCard;
