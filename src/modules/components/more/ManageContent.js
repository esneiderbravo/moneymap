import React from "react";
import { MoreOptionsContainer } from "../../styles/more/MoreContent.styled";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AccountBalance } from "@mui/icons-material";

/**
 * ManageContent Component
 * Renders the ManageContent component.
 *
 * @returns {React.JSX.Element} The rendered ManageContent component.
 */
const ManageContent = () => {
  const optionElements = [
    { name: "Accounts", icon: <AccountBalance />, color: "icon.white" },
  ];
  return (
    /* OptionsContainer */
    <MoreOptionsContainer item sx={{ backgroundColor: "primary.main" }}>
      <Box>
        <nav>
          <List>
            {/* Logout Option */}
            {optionElements.map((option) => (
              <>
                <ListItem disablePadding sx={{ mb: 2 }}>
                  <ListItemButton onClick={() => {}} aria-label={option.name}>
                    <ListItemIcon sx={{ color: option.color }}>
                      {option.icon}
                    </ListItemIcon>
                    <ListItemText primary={option.name} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </nav>
      </Box>
    </MoreOptionsContainer>
  );
};

/**
 * More component propTypes
 */
ManageContent.propTypes = {};

export default ManageContent;
