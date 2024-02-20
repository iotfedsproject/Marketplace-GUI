import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Cookies from 'universal-cookie';
import { Modal, Button, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import { dismissAlert, changeModalState, DISMISS_WRONG_CREDENTIALS_ALERT } from "../../actions/index";
import { AlertDismissable } from "../../helpers/errors";
import { userLogin } from "../../actions/user-actions";
import { setIotFedsPassword } from "../../actions/federation-actions"

class SignInModal extends Component {

    constructor(props) {
        super(props);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.modalName = this.props.modalName;

        this.dismissWrongCredentialsAlert = this.dismissWrongCredentialsAlert.bind(this);
        this.setPassword                  = this.setPassword.bind(this);
    }//end
//---------------------------------------------------------------------------
    open() {
        this.props.changeModalState(this.modalName, true);
    }

    close() {
        this.props.changeModalState(this.modalName, false);
        this.props.reset();
        this.dismissWrongCredentialsAlert();
    }

    dismissWrongCredentialsAlert() {
        this.props.dismissAlert(DISMISS_WRONG_CREDENTIALS_ALERT);
    }

    setPassword(password){
     this.props.setIotFedsPassword(password);
    }

    onSubmit(props) {
        const cookies = new Cookies();
        const previous_cookie = cookies.get('XSRF-TOKEN');
        console.log("sign-in-modal.js, onSubmit() props = " + props.password);
        this.props.userDetails.password = props.password;
        this.props.setIotFedsPassword(props.password);
        console.log("sign-in-modal.js, onSubmit() props1 = " + this.props.userDetails.password);

        this.props.userLogin(props, this.props.redirect_on_success,previous_cookie, (res) => {
            const new_cookie = cookies.get('XSRF-TOKEN');

            if (previous_cookie !== new_cookie) {
                this.props.changeModalState(this.modalName, false);
                this.props.history.push(this.props.redirect_on_success);
            }

        });
    }

    renderInputField = (field) => {
        const { input, type, placeholder, icon } = field;
        return (
            <InputGroup>
                <InputGroup.Addon>
                    <Glyphicon glyph={icon}/>
                </InputGroup.Addon>
                <FormControl
                    {...input}
                    type={type}
                    placeholder={placeholder} />
            </InputGroup>
        );
    };

    render() {
        const { handleSubmit, modalState, userLoginState, buttonTitle, buttonClass, buttonBsStyle } = this.props;

        return(
            <Fragment>
                <Button
                    className={buttonClass ? buttonClass : "button wordwrap"}
                    bsStyle={buttonBsStyle}
                    onClick={this.open}>
                    {buttonTitle}
                </Button>

                <Modal show={modalState[this.modalName]} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In to IotFeds Marketplace</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Modal.Body>
                            <Field
                                type="text"
                                icon="user" placeholder="Username"
                                name="username" component={this.renderInputField}
                            />
                            <Field
                                type="password"
                                icon="lock" placeholder="Password"
                                name="password" component={this.renderInputField}
                            />
                            <AlertDismissable alertStyle="danger" message={userLoginState.error}
                                              dismissHandler={this.dismissWrongCredentialsAlert} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" bsStyle="primary">Login</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </Fragment>
        );
    }

}

function mapStateToProps(state) {
    return {
        modalState: state.modalState,
        userLoginState: state.userLoginState,
        userDetails: state.userDetails,
    };
}

export default reduxForm({
    form: 'LoginForm'
})(
    connect(mapStateToProps, { userLogin, dismissAlert, changeModalState,setIotFedsPassword })(SignInModal)
);