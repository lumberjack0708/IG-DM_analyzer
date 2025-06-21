import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const style = {
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto",
  },
};

function GridContainer({ ...props }) {
  const { classes, children, className, justify, ...rest } = props;
  const gridProps = { ...rest };

  if (justify !== undefined) {
    gridProps.justifyContent = justify;
  }

  return (
    <Grid container {...gridProps} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: "",
};

GridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  justify: PropTypes.oneOf([
    "flex-start",
    "center",
    "flex-end",
    "space-between",
    "space-around",
    "space-evenly",
  ]),
};

export default withStyles(style)(GridContainer);
