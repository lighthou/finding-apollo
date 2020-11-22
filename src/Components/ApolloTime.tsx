import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { MultiSelectionFormSectionProps } from "./MultiSelectionForm";
import { createUseStyles } from "react-jss";
import { MultiSelectionIconState } from "./MultiSectionIcon";

const useStyles = createUseStyles({
  divider: {
    height: 3,
    width: "100%",
    background: "#D2DDEE",
    marginBottom: 10,
  },
  header: { color: "#384B5D" },
});

const ApolloTime: FunctionComponent<MultiSelectionFormSectionProps> = ({
  title,
  setSectionState,
  defaultSelection,
  setStateCallback,
}) => {
  const classes = useStyles();

  const [selectedTime, setSelectedTime] = useState(defaultSelection);

  const onTimeChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setSelectedTime(newTime);
    setStateCallback(newTime);

    setSectionState(
      newTime
        ? MultiSelectionIconState.AVAILABLE
        : MultiSelectionIconState.INVALID
    );
  };

  const onSubmit = () => {
    setSectionState(
      selectedTime
        ? MultiSelectionIconState.COMPLETED
        : MultiSelectionIconState.INVALID
    );
  };

  return (
    <div>
      <h1 className={classes.header}> {title} </h1>
      <div className={classes.divider} />

      <input
        type="time"
        value={selectedTime as string}
        onChange={onTimeChanged}
      />

      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default ApolloTime;
