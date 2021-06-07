import React from "react";
import PropTypes from "prop-types";
import {
  TextField,
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const styled = (theme) => ({
  notchedOutline: {
    borderColor: "black !important",
    borderWidth: "3px",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

function Text(props) {
  const { classes } = props;
  return (
    <ThemeProvider theme={theme}>
      <TextField
        label={props.label}
        variant="outlined"
        onChange={props.onChange}
        name={props.name}
        value={props.value}
        style={props.style}
        fullWidth
        type={props.type}
        autoFocus={props.autoFocus}
        InputProps={{
          className: "col",
          classes: {
            notchedOutline: classes.notchedOutline,
          },
        }}
        className={classes.textField}
      />
    </ThemeProvider>
  );
}

Text.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styled)(Text);
