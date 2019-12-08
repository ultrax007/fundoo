import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Navbar, Button, Tab, Tabs, Jumbotron, Table } from "react-bootstrap";
import flogo from "../assets/favicon.ico";

export default class Admin extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {  }
  // }
  render() {
    return (
      <Container fluid>
        <Navbar bg="dark" variant="dark" className="justify-content-sm-between">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={flogo}
              width="30"
              height="30"
              className="d-inline-block align-middle"
            />
            <Navbar.Text className="m-2 font-weight-bold align-middle text-light">
              Fundoo Admin
            </Navbar.Text>
          </Navbar.Brand>
          <Button variant="outline-light align-">Logout</Button>
        </Navbar>
        <Tabs fill id="controlled-tab-example" activeKey="home">
          <Tab eventKey="home" title="Home">
            <Table responsive striped bordered hover variant="dark" className="mt-sm-2">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry the Bird</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="profile" title="Profile">
            <Jumbotron>
              <h1>Hello, world!</h1>
              <p>
                This is a simple hero unit, a simple jumbotron-style component
                for calling extra attention to featured content or information.
              </p>
              <p>
                <Button variant="primary">Learn more</Button>
              </p>
            </Jumbotron>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
