import React, { useEffect, useState } from "react";
import { Tooltip, IconButton, Popover } from "@mui/material";
import PropTypes from "prop-types";
import { getIconComponent } from "../../utils/common/icon";
import {
  ColorSectionBox,
  PopOverBox,
  QuickColorBox,
  Title,
  TooltipBox,
} from "../../styles/common/ColorSelector.styled";
import getIconColor from "../../utils/common/color";

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
    "#EF476F", // Vibrant Pink
    "#06D6A0", // Bright Mint
    "#FFD166", // Soft Gold
    "#F15BB5", // Bubblegum Pink
    "#FF006E", // Magenta Red
  ]);

  // Full color palette
  const fullPalette = [
    "#EF476F", // Vibrant Pink
    "#FFD166", // Soft Gold
    "#06D6A0", // Bright Mint
    "#F15BB5", // Bubblegum Pink
    "#FF006E", // Magenta Red
    "#FFBE0B", // Honey Yellow
    "#FB8500", // Orange Punch
    "#E76F51", // Terracotta
    "#F4A261", // Light Orange
    "#9B5DE5", // Soft Purple
    "#8338EC", // Vivid Purple
    "#3A86FF", // Sky Blue
    "#F72585", // Flamingo Pink
    "#FFB5A7", // Pastel Coral
    "#B5179E", // Deep Magenta
    "#AACC00", // Lime Green
    "#80FF72", // Neon Mint
    "#72EFDD", // Bright Aqua
    "#FF8FAB", // Soft Rose
    "#D00000", // Pure Red
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
            sx={{ color: getIconColor(color), fontSize: size * 0.6 }}
          />
        )}
      </TooltipBox>
    </Tooltip>
  );

  useEffect(() => {
    if (selectedColor && !quickColors.includes(selectedColor)) {
      setQuickColors((prevColors) => [
        selectedColor,
        ...prevColors.slice(0, 4),
      ]);
    }
  }, [quickColors, selectedColor]);

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
