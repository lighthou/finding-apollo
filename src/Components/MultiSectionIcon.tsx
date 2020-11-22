import React, { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faDotCircle,
  faExclamationCircle,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from "react-jss";

export enum MultiSelectionIconState {
  AVAILABLE = "#D2DDEF",
  UNAVAILABLE = "#D2DDEE",
  COMPLETED = "#384B5D",
  INVALID = "#C05F68",
}

const ACTIVE = "#6DC5AB";

interface MultiSelectionIconProps {
  state: MultiSelectionIconState;
  isActive: boolean;
  onClick: () => void;
}

const useStyles = createUseStyles({
  icon: {
    transition: "color 1s linear",
  },
});

const MultiSelectionIcon: FunctionComponent<MultiSelectionIconProps> = ({
  state,
  isActive,
  onClick,
}) => {
  const classes = useStyles();

  switch (state) {
    case MultiSelectionIconState.AVAILABLE:
      return (
        <FontAwesomeIcon
          className={classes.icon}
          color={isActive ? ACTIVE : MultiSelectionIconState.AVAILABLE}
          icon={faDotCircle}
          onClick={onClick}
        />
      );
    case MultiSelectionIconState.UNAVAILABLE:
      return (
        <FontAwesomeIcon
          className={classes.icon}
          color={isActive ? ACTIVE : MultiSelectionIconState.UNAVAILABLE}
          icon={faCircle}
          size={"xs"}
          // onClick should not trigger if the icon is unavailable
        />
      );
    case MultiSelectionIconState.COMPLETED:
      return (
        <FontAwesomeIcon
          className={classes.icon}
          color={isActive ? ACTIVE : MultiSelectionIconState.COMPLETED}
          icon={faCheckCircle}
          onClick={onClick}
        />
      );
    case MultiSelectionIconState.INVALID:
      return (
        <FontAwesomeIcon
          className={classes.icon}
          color={isActive ? ACTIVE : MultiSelectionIconState.INVALID}
          icon={faExclamationCircle}
          onClick={onClick}
        />
      );
  }
};

export default MultiSelectionIcon;
