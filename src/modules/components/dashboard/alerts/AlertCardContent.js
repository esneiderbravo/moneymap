import React from "react";
import PropTypes from "prop-types";
import {
  AlertContainer,
  AlertSection,
} from "../../../styles/dashboard/alerts/AlertsContent.styled";
import { Chip, Grid2, Typography } from "@mui/material";
import { formatCurrency } from "../../../utils/common/currency";

/**
 * Renders an individual alert card with an icon, label count, title, and optional amount.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ElementType} props.icon - The icon component to display.
 * @param {number} props.count - The number to display inside the Chip.
 * @param {string} props.title - The title/label for the alert type.
 * @param {number} [props.amount] - Optional amount to display below the title (formatted as currency).
 * @param {"success" | "error"} props.color - The color theme for the Chip and amount text.
 * @param {Function} props.onClick - Callback function triggered when the card is clicked.
 * @returns {JSX.Element} A styled alert card.
 */
const AlertCard = ({ icon: Icon, count, title, amount, color, onClick }) => (
  <AlertSection
    sx={{ backgroundColor: "secondary.main", p: 2 }}
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
          {formatCurrency(amount)}
        </Typography>
      )}
    </Grid2>
  </AlertSection>
);

AlertCard.propTypes = {
  icon: PropTypes.elementType,
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AlertCard;
