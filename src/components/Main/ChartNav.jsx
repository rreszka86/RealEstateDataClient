import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from "react";

const ChartNav = ({ region, setRegion, market, setMarket, type, setType, dataHousing, dataRates, setPickedOption}) => {
	const [showOffcanvas, setShowOffcanvas] = useState(false);

	const toUpper = (string) => {
		return string.toUpperCase()
	}

	const handleRegionPick = (eventKey) => {
		setRegion(eventKey);
	};

	const handleMarketPick = (eventkey) => {
		setMarket(eventkey)
	}

	const handleTypePick = (eventkey) => {
		setType(eventkey)
	}

	const handleLogout = () => {
		localStorage.removeItem("jwtToken")
		window.location.reload()
	}

	const handleExport = (eventkey) => {
		var jsonString
		if (eventkey == "housingData") {
			jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
				JSON.stringify(dataHousing)
			)}`
		} else {
			jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
				JSON.stringify(dataRates)
		)}`
	}
		const link = document.createElement("a")
		link.href = jsonString
		link.download = "data.json"
		link.click()
	}

	const handleOpenOffcanvas = () => setShowOffcanvas(true);
	const handleCloseOffcanvas = () => setShowOffcanvas(false);

	const handleOptionPick = (e) => {
		setPickedOption(e);
	};

return (
	<Navbar bg="primary" data-bs-theme="dark" className="bg-body-tertiary">
		<Button onClick={handleOpenOffcanvas} variant="dark" style={{marginLeft: "10px"}}>
			<span className="navbar-toggler-icon"></span>
		</Button>
		<Container>
			<Navbar.Brand>Ustawienia</Navbar.Brand>
			<Nav className="me-auto">
				<NavDropdown title={"Region: " + region} onSelect={handleRegionPick}>
					<NavDropdown.Item eventKey="POLSKA">POLSKA</NavDropdown.Item>
					<NavDropdown.Item eventKey="MAŁOPOLSKIE">MAŁOPOLSKIE</NavDropdown.Item>
					<NavDropdown.Item eventKey="ŚLĄSKIE">ŚLĄSKIE</NavDropdown.Item>
					<NavDropdown.Item eventKey="LUBUSKIE">LUBUSKIE</NavDropdown.Item>
					<NavDropdown.Item eventKey="WIELKOPOLSKIE">WIELKOPOLSKIE</NavDropdown.Item>
					<NavDropdown.Item eventKey="ZACHODNIOPOMORSKIE">ZACHODNIOPOMORSKIE</NavDropdown.Item>
					<NavDropdown.Item eventKey="DOLNOŚLĄSKIE">DOLNOŚLĄSKIE</NavDropdown.Item>
					<NavDropdown.Item eventKey="OPOLSKIE">OPOLSKIE</NavDropdown.Item>
					<NavDropdown.Item eventKey="KUJAWSKO-POMORSKIE">KUJAWSKO-POMORSKIE</NavDropdown.Item>
					<NavDropdown.Item eventKey="POMORSKIE">POMORSKIE</NavDropdown.Item>
					<NavDropdown.Item eventKey="ŁÓDZKIE">ŁÓDZKIE</NavDropdown.Item>
					<NavDropdown.Item eventKey="ŚWIĘTOKRZYSKIE">ŚWIĘTOKRZYSKIE</NavDropdown.Item>
					<NavDropdown.Item eventKey="LUBELSKIE">LUBELSKIE</NavDropdown.Item>
					<NavDropdown.Item eventKey="PODKARPACKIE">PODKARPACKIE</NavDropdown.Item>
					<NavDropdown.Item eventKey="PODLASKIE">PODLASKIE</NavDropdown.Item>
					<NavDropdown.Item eventKey="MAZOWIECKIE">MAZOWIECKIE</NavDropdown.Item>
				</NavDropdown>
				<NavDropdown title={"Rynek: " + toUpper(market)} onSelect={handleMarketPick}>
					<NavDropdown.Item eventKey="rynek pierwotny">RYNEK PIERWOTNY</NavDropdown.Item>
					<NavDropdown.Item eventKey="rynek wtórny">RYNEK WTÓRNY</NavDropdown.Item>
					<NavDropdown.Item eventKey="oba rynki">OBA RYNKI</NavDropdown.Item>
				</NavDropdown>
				<NavDropdown title={"Typ: " + toUpper(type)} onSelect={handleTypePick}>
					<NavDropdown.Item eventKey="do 40 m2">DO 40 M2</NavDropdown.Item>
					<NavDropdown.Item eventKey="od 40,1 do 60 m2">OD 40,1 DO 60 M2</NavDropdown.Item>
					<NavDropdown.Item eventKey="od 60,1 do 80 m2">OD 60,1 DO 80 M2</NavDropdown.Item>
					<NavDropdown.Item eventKey="od 80,1 m2">OD 80,1 M2</NavDropdown.Item>
				</NavDropdown>
			</Nav>
			<Nav>
				<DropdownButton
					size="md"
					variant="outline-light"
					title="Eksportuj"
					className="me-1"
					onSelect={handleExport}
				>
					<Dropdown.Item eventKey="housingData" active={false} >Dane mieszkaniowe</Dropdown.Item>
					<Dropdown.Item eventKey="ratesData" active={false}>Dane stóp procentowych</Dropdown.Item>
				</DropdownButton>
				<Button variant="outline-light" onClick={handleLogout}>
					Wyloguj się
				</Button>
			</Nav>
		</Container>
		<Offcanvas bg="primary" data-bs-theme="dark" show={showOffcanvas} onHide={handleCloseOffcanvas}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Wybierz opcję</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<ListGroup onSelect={handleOptionPick}>
					<ListGroup.Item action variant="light" eventKey="linearChart" className="text-center">Wykres cen mieszkań</ListGroup.Item>
					<ListGroup.Item action variant="light" eventKey="percentageChart" className="text-center">Wykres procentowy cen mieszkań</ListGroup.Item>
					<ListGroup.Item action variant="light" eventKey="barChart" className="text-center">Wykres słupkowy cen mieszkań</ListGroup.Item>
				</ListGroup>
			</Offcanvas.Body>
		</Offcanvas>
	</Navbar>
);
};

export default ChartNav;
