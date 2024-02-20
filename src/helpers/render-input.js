import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Row, Col, HelpBlock, InputGroup, Glyphicon } from "react-bootstrap";
import { getValidationState } from "../validation/helpers";
import { FieldError } from "./errors";


 export const renderInputField = (field) => {
                    const { input, type, placeholder, componentClass, rows, subElement, errorField,
                        label, helpMessage, maxLength, meta : { touched, invalid, error } } = field;
                    const validationState = getValidationState(input.value, touched, invalid);

                    return (
                        <FormGroup controlId={input.name} validationState={validationState}>
                            {label ? <ControlLabel>{label}</ControlLabel> : ""}
                            <FormControl
                                { ...input } componentClass={componentClass} rows={rows}
                                type={type} placeholder={placeholder} maxLength={maxLength} />
                            <FormControl.Feedback className={subElement ? "sub-element" : ""}/>
                            <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
                            <FieldError error={errorField} />
                        </FormGroup>
                    );
                };