import React, { ReactNode } from "react";

interface MyComponentProps {
  children: ReactNode;
}

const Wrapper: React.FC<MyComponentProps> = ({ children }) => {
	return (
		<div className="wrapper">
			{children}
		</div>
	);
};

export default Wrapper;
