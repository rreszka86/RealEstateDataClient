import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

const ChartNav = ({ region, setRegion }) => {
	const handleRegionPick = (eventKey) => {
		setRegion(eventKey);
	};

	return (
		<Navbar bg="primary" data-bs-theme="dark" className="bg-body-tertiary">
			<Container>
				<Nav className="me-auto">
					<NavDropdown title={"Region: " + region} onSelect={handleRegionPick}>
						<NavDropdown.Item eventKey="LUBELSKIE">LUBELSKIE</NavDropdown.Item>
						<NavDropdown.Item eventKey="MAZOWIECKIE">
							MAZOWIECKIE
						</NavDropdown.Item>
					</NavDropdown>
					<Button variant="outline-light" href="/logout">
						Wyloguj się
					</Button>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default ChartNav;
