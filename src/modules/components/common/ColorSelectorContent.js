import React, { useState } from "react";
import { Tooltip, IconButton, Popover } from "@mui/material";
import PropTypes from "prop-types";
import { getIconComponent } from "../../utils/common/icon";
import {
  ColorSectionBox,
  PopOverBox,
  QuickColorBox,
  Title,
  TooltipBox,
} from "../../styles/common/ColorSelectorContent.styled";

/**
 * ColorSelector Component
 *
 * Allows users to select a color from a predefined palette or a quick selection.
 * Selected colors update the form data and are added to the quick selection if new.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.formData - The current form data containing the selected color
 * @param {Function} props.onColorChange - Callback function to handle color changes
 */
const ColorSelector = ({ formData, onColorChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { color: selectedColor } = formData;

  // Quick selection colors
  const [quickColors, setQuickColors] = useState([
    "#FF6B6B", // Coral Red
    "#6BFF95", // Mint Green
    "#4A90E2", // Soft Blue
    "#FFC94A", // Warm Gold
    "#A288E3",
  ]);

  // Full color palette
  const fullPalette = [
    "#FF6B6B",
    "#6BFF95",
    "#4A90E2",
    "#FFC94A",
    "#A288E3",
    "#FF8E8E",
    "#56CCF2",
    "#FFAA4C",
    "#43D7B7",
    "#7B61FF",
    "#FFCC29",
    "#FF5A5F",
    "#9C6ADE",
    "#00C2FF",
    "#E57373",
    "#6D9886",
    "#C7A8F1",
    "#B1E6D1",
    "#FF4081",
    "#1ABC9C",
  ];

  const CheckIcon = getIconComponent("Check");
  const ColorLensIcon = getIconComponent("ColorLens");
  const EditIcon = getIconComponent("Edit");

  /**
   * Opens the full color palette popover.
   * @param {Event} event - Click event
   */
  const handleOpenPalette = (event) => setAnchorEl(event.currentTarget);

  /**
   * Closes the color palette popover.
   */
  const handleClosePalette = () => setAnchorEl(null);

  /**
   * Determines the best checkmark color for contrast.
   * @param {string} color - The selected color in hex format.
   * @returns {string} - "black" or "white" for optimal contrast.
   */
  const getCheckIconColor = (color) => {
    // Remove the hash and split the hex color into RGB components
    const [r, g, b] = color
      .replace(/^#/, "")
      .match(/.{2}/g)
      .map((hex) => parseInt(hex, 16));

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return black or white based on the luminance
    return luminance > 0.5 ? "black" : "white";
  };

  /**
   * Handles color selection, updating form data and quick selection list.
   * @param {string} color - The newly selected color
   */
  const handleColorChange = (color) => {
    onColorChange({ ...formData, color });
    if (!quickColors.includes(color)) {
      setQuickColors((prevColors) => [color, ...prevColors.slice(0, 4)]);
    }
    setAnchorEl(null);
  };

  /**
   * Renders a selectable color option.
   * @param {string} color - The color to render
   * @param {number} [size=40] - The size of the color box
   * @returns {JSX.Element} - The color selection box
   */
  const renderColorOption = (color, size = 40) => (
    <Tooltip key={color} title={color}>
      <TooltipBox
        size={size}
        color={color}
        onClick={() => handleColorChange(color)}
      >
        {selectedColor === color && (
          <CheckIcon
            sx={{ color: getCheckIconColor(color), fontSize: size * 0.6 }}
          />
        )}
      </TooltipBox>
    </Tooltip>
  );

  return (
    <ColorSectionBox>
      <Title variant="subtitle1">
        {ColorLensIcon && <ColorLensIcon sx={{ mr: 1 }} />} Color
      </Title>
      <QuickColorBox>
        {quickColors.map((color) => renderColorOption(color))}
        <IconButton onClick={handleOpenPalette} sx={{ color: "white", ml: 1 }}>
          {EditIcon && <EditIcon />}
        </IconButton>
      </QuickColorBox>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePalette}
      >
        <PopOverBox>
          {fullPalette.map((color) => renderColorOption(color, 36))}
        </PopOverBox>
      </Popover>
    </ColorSectionBox>
  );
};

ColorSelector.propTypes = {
  formData: PropTypes.object.isRequired,
  onColorChange: PropTypes.func.isRequired,
};

export default ColorSelector;
