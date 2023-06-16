import React from "react";
import FacultyButton from "./FacultyButton";

interface Services {
	service_id: string,
	service_name: string,
	abbreviation: string
}
interface ArrayServices {
	services: Services[],
	afterLoading: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const ServicesList: React.FC<ArrayServices> = ({services, afterLoading}) => {
	return (
		<div className="services-list">
			{services.map(service => {
				const {service_id, service_name} = service;
				return (
					<FacultyButton
						id={service_id}
						key={service_id}
						faculty={service_name}
						onClick={afterLoading}
					></FacultyButton>
				);
			})}
		</div>
	);
};

export default ServicesList;

