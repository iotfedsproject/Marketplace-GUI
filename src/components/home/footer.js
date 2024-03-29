import React from "react";
import homepage  from "../../images/symbiote-homepage.png";
import iot_epi_logo from "../../images/IoT-EPI-logo1.png";
import ech2020 from "../../images/ECH2020.png";
import {Col, Row} from "react-bootstrap";

const Footer = () => {
    return (
        <div className="footer" style={{backgroundColor: "#2b567c"}}>
            <Row>
                <Col xs={12} sm={6} md={3} lg={3}>
                    <a className="external symbiote" href="http://www.symbiote-h2020.eu/">
                        <img src={homepage} alt="symbiote-homepage.png" />
                    </a>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3}>
                    <a className="external epi" href="http://iot-epi.eu/">
                        <img src={iot_epi_logo} alt="IoT-EPI-logo1.png" />
                    </a>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <a className="external commision">
                        <img src={ech2020} alt="ECH2020.png" />
                    </a>
                </Col>
            </Row>
        </div>
    )
};

export default Footer;