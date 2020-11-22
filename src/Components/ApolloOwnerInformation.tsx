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
  inputRow: {
    display: "flex",
    margin: 8,
  },
  inputText: {
    width: 150,
    margin: 8,
  },
});

export interface OwnerInformationProps {
  name: string;
  email: string;
  phone: string;
}

const ApolloOwnerInformation: FunctionComponent<MultiSelectionFormSectionProps> = ({
  title,
  setSectionState,
  defaultSelection,
  setStateCallback,
}) => {
  const classes = useStyles();

  defaultSelection = defaultSelection as OwnerInformationProps;

  const [name, setName] = useState(defaultSelection.name);
  const [email, setEmail] = useState(defaultSelection.email);
  const [phone, setPhone] = useState(defaultSelection.phone);

  const onSubmit = () => {
    if (!(name.length && email.length && phone.length)) {
      setSectionState(MultiSelectionIconState.INVALID);
    } else {
      setSectionState(MultiSelectionIconState.COMPLETED);
    }
  };

  const onNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    onAnyInputChanged();
  };

  const onEmailChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    onAnyInputChanged();
  };

  const onPhoneChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
    onAnyInputChanged();
  };

  const onAnyInputChanged = () => {
    // Using lengths to avoid cases where it shows an error when you have just a 0 in the input since it's falsy.
    // I mean yes that's still technically invalid but I'm not doing full on error checking here.

    if (!(name.length && email.length && phone.length)) {
      setSectionState(MultiSelectionIconState.INVALID);
    } else {
      setSectionState(MultiSelectionIconState.AVAILABLE);
    }
    setStateCallback({ name: name, email: email, phone: phone });
  };

  return (
    <div>
      <h1 className={classes.header}> {title} </h1>
      <div className={classes.divider} />

      <div className={classes.inputRow}>
        <p className={classes.inputText}>Full Name</p>
        <input type="text" value={name} onChange={onNameChanged} />
      </div>

      <div className={classes.inputRow}>
        <p className={classes.inputText}>Email:</p>
        <input type="email" value={email} onChange={onEmailChanged} />
      </div>

      <div className={classes.inputRow}>
        <p className={classes.inputText}>Mobile Phone:</p>
        <input type="phone" value={phone} onChange={onPhoneChanged} />
      </div>

      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default ApolloOwnerInformation;
