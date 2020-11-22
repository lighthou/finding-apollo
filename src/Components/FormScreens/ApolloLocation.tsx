import React, { FunctionComponent, useState } from "react";
import { MultiSelectionFormSectionProps } from "../MultiSelectionForm";
import { MultiSelectionIconState } from "../MultiSectionIcon";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  imageButton: {
    margin: 10,
  },
  image: {
    width: 400,
    height: 250,
  },
  buttonDiv: {
    display: "flex",
  },
  divider: {
    height: 3,
    width: "100%",
    background: "#D2DDEE",
    marginBottom: 10,
  },
  header: { color: "#384B5D" },
});

const ApolloLocation: FunctionComponent<MultiSelectionFormSectionProps> = ({
  title,
  setSectionState,
  defaultSelection,
  setStateCallback,
}) => {
  const classes = useStyles();

  const [selectedButton, setSelectedButton] = useState(defaultSelection);

  const ImageButton = (src: string, id: number, text: string) => (
    <>
      <button
        className={classes.imageButton}
        style={{
          background: selectedButton === id ? "#6DC5AB" : "#D2DDEE",
        }}
        onClick={() => setSelectedButton(id)}
      >
        <h3 className={classes.header}>{text}</h3>

        <img className={classes.image} src={src} alt={text} />
      </button>
    </>
  );

  const onSubmit = () => {
    setStateCallback(selectedButton);
    setSectionState(
      selectedButton !== -1
        ? MultiSelectionIconState.COMPLETED
        : MultiSelectionIconState.INVALID
    );
  };

  return (
    <div>
      <h1 className={classes.header}> {title} </h1>
      <div className={classes.divider} />

      <div className={classes.buttonDiv}>
        {ImageButton("https://bit.ly/35PcQtY", 0, "At the Beach")}
        {ImageButton("https://bit.ly/2UIFJBY", 1, "In Space")}
      </div>

      <div className={classes.buttonDiv}>
        {ImageButton("https://bit.ly/2IZjbKl", 2, "At the Office")}
        {ImageButton("https://bit.ly/3nGM8Kk", 3, "Out Hiking")}
      </div>

      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default ApolloLocation;
