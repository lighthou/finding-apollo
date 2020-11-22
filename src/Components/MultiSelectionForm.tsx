import React, { FunctionComponent, useState } from "react";
import { createUseStyles } from "react-jss";

import MultiSelectionIcon, {
  MultiSelectionIconState,
} from "./MultiSectionIcon";
import ApolloLocation from "./ApolloLocation";
import ApolloTime from "./ApolloTime";
import ApolloOwnerInformation, {
  OwnerInformationProps,
} from "./ApolloOwnerInformation";

export interface MultiSelectionFormSectionProps {
  title: string;
  setSectionState: (updatedValue: MultiSelectionIconState) => void;
  defaultSelection: number | string | OwnerInformationProps;
  setStateCallback: (updatedValue: any) => void;
}

interface MultiSelectionFormProps {}

const useStyles = createUseStyles({
  root: { display: "flex", margin: 50 },
  iconDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  iconDivider: { height: 25, width: 3, margin: "2px 0px" },
  body: { flex: 7 },

  // This is not the css arrow styling suggested.
  // I was struggling to use the cssarrowplease as recommended so I did my own thing
  // That being said this relied on content for the actual message rather than a child component
  // So for now the tooltips say "Title" which is a bit annoying but I didn't want to really spend a ton of more time.
  arrow_box: {
    padding: "5px 10px",
    position: "relative",
    textAlign: "center",
    "&:before": {
      backgroundColor: "#6DC5AB",
      content: "' '",
      display: "none",
      position: "absolute",
      width: "10px",
      height: "10px",
      zIndex: 999,
      top: "50%",
      right: "0",
      transform: "translate(calc(100% + 5px), -50%) rotate(45deg)",
    },
    "&:after": {
      backgroundColor: "#6DC5AB",
      borderRadius: 5,
      color: "#FFF",
      display: "none",
      padding: "5px 15px",
      position: "absolute",
      textAlign: "center",
      zIndex: 999,
      content: "'Title'",
      top: 0,
      right: 0,
      transform: "translateX(calc(100% + 10px))",
    },
    "&:hover": {
      animation: "fadeIn ease 1s",
      "&:after": {
        display: "block",
      },
      "&:before": {
        display: "block",
      },
    },
  },
});

const NUMBER_OF_SECTIONS = 3;

const MultiSelectionForm: FunctionComponent<MultiSelectionFormProps> = () => {
  const classes = useStyles();

  const initialIconState: MultiSelectionIconState[] = [
    MultiSelectionIconState.AVAILABLE,
  ];

  for (let i = 1; i < NUMBER_OF_SECTIONS; i++) {
    initialIconState.push(MultiSelectionIconState.UNAVAILABLE);
  }

  const [sectionState, setSectionState] = useState(initialIconState);
  const [activeSection, setActiveSection] = useState(0);

  const [sectionOneValue, setSectionOneValue] = useState(-1);
  const [sectionTwoValue, setSectionTwoValue] = useState("12:00");
  const [sectionThreeValue, setSectionThreeValue] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const setSectionStateForIndex = (index: number) => {
    return (updatedValue: MultiSelectionIconState) => {
      const shallowCopy = [...sectionState];
      shallowCopy[index] = updatedValue;

      // On an update if it's completed then move to the next section
      if (updatedValue === MultiSelectionIconState.COMPLETED) {
        setActiveSection(index + 1);

        // If the next section is unavailable then make it available now
        if (sectionState[index + 1] === MultiSelectionIconState.UNAVAILABLE) {
          shallowCopy[index + 1] = MultiSelectionIconState.AVAILABLE;
        }
      }

      setSectionState(shallowCopy);
    };
  };

  const actualSections = [
    <ApolloLocation
      title="Where was Apollo last seen?"
      setSectionState={setSectionStateForIndex(0)}
      defaultSelection={sectionOneValue}
      setStateCallback={setSectionOneValue}
    />,
    <ApolloTime
      title="When did you last see Apollo?"
      setSectionState={setSectionStateForIndex(1)}
      defaultSelection={sectionTwoValue}
      setStateCallback={setSectionTwoValue}
    />,
    <ApolloOwnerInformation
      title="Who are you and why are you looking for Apollo?"
      setSectionState={setSectionStateForIndex(2)}
      defaultSelection={sectionThreeValue}
      setStateCallback={setSectionThreeValue}
    />,
  ];

  const navBar = sectionState.map((iconState, index) => {
    const lineColour = sectionState[index + 1];

    const verticalDivider = (
      <div className={classes.iconDivider} style={{ background: lineColour }} />
    );

    return (
      <>
        <div className={classes.arrow_box}>
          <MultiSelectionIcon
            state={iconState}
            isActive={index === activeSection}
            onClick={() => setActiveSection(index)}
          />
        </div>

        {lineColour ? verticalDivider : null}
      </>
    );
  });

  return (
    <div className={classes.root}>
      <div className={classes.iconDiv}>{navBar}</div>
      <div className={classes.body}>{actualSections[activeSection]}</div>
    </div>
  );
};

export default MultiSelectionForm;
