import React, {useState, useEffect, MouseEvent} from "react";
import FacultyButton from "./FacultyButton";
import Container from "@mui/material/Container/Container";
import {
	Typography,
	FormControl,
	Dialog,
	DialogTitle,
	DialogActions,
	Button
} from "@mui/material";

interface Services {
	service_id: string,
	service_name: string,
	abbreviation: string
}
type Body = {
	service: {
		service_id: string;
	};
	TypeRequest: {
		typeRequest_id: number;
	};
}

const Home = () => {
	const serv: Services[] = [];
	const [services, setServices]= useState(serv);
	const [service_idState, setservice_idState] = useState("");
	const [wasSubmitted, setWasSubmitted] = useState(false);
	const [code, setCode] = useState("");

	async function postData(url: string, obj: Body) {
		try {
			const init = {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(obj)
			};
			const result = await fetch(url, init);
			return result;
		}
		catch (er) {
			console.error("Ошибка:", er);
		}
	}

	useEffect(() => {
		try {
			fetch("/services/")
				.then((response) => {
					if(response !== undefined) 
						return response.json();
					else
						throw new Error("Services not found.");
				})
				.then((json: Services[]) => setServices(json));
		} catch(e){
			console.log(e);
		}
	}, []);

	useEffect(() => {
		if (service_idState !== ""){

			const body: Body = {
				service: {
					service_id: service_idState
				},
				TypeRequest: {
					typeRequest_id: 3
				}
			};
			try {
				postData("/requests/create", body)
					.then((response) => { 
						if(response !== undefined) 
							return response.json();
						else
							throw new Error("Request wasn't create.");
					})
					.then((json: string) => setCode(json))
					.then(()=>setWasSubmitted(true));
			} catch(e){
				console.log(e);
			}
		}
	},[service_idState]);

	/*const handleOpenDialog = () => {
    setisOpen(true);
  };*/

	function handleCloseDialog() {
		setWasSubmitted(false);
		setservice_idState("");
		setCode("");
	}

	return (
		<Container maxWidth="sm">
			<Typography variant="h4" mt={5} gutterBottom sx={{ color: "#161227" }}> 
        Выберите факультет
			</Typography>
			<form>
				<FormControl fullWidth margin="normal">
					<div className="services-list">
						{/* Map over 'services' and render each service */}
						{services.map(service => {
							const {service_id, service_name} = service;
							return (
								<FacultyButton
									id={service_id}
									key={service_id}
									faculty={service_name}
									onClick={(e:MouseEvent<HTMLButtonElement>)=>{
										const service_id = e.target as HTMLButtonElement;
										setservice_idState(service_id.id);
									}}
								></FacultyButton>
							);
						})}
					</div>
				</FormControl>
			</form>
			<Dialog
				open={wasSubmitted}
				onClose={handleCloseDialog}
				aria-labelledby="alert-dialog-title"
			>
				<DialogTitle id="alert-dialog-title" sx={{ whiteSpace: "pre-wrap" }}>
					{`Номер вашей заявки:\n                 ${code}`}
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseDialog} autoFocus>Ok</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

export default Home;
