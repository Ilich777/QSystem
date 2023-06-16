import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogActions,
	Button
} from "@mui/material";

interface NotificationDialog {
  isOpen: boolean,
	closeHandler: () => void,
	children: string
}

const AlertDialog:React.FC<NotificationDialog> = ({children, isOpen, closeHandler}) => {
	return(
		<Dialog
			open={isOpen}
			onClose={closeHandler}
			aria-labelledby="alert-dialog-title"
		>
			<DialogTitle id="alert-dialog-title" sx={{ whiteSpace: "pre-wrap" }}>
				{children}
			</DialogTitle>
			<DialogActions>
				<Button onClick={closeHandler} autoFocus>Ok</Button>
			</DialogActions>
		</Dialog>
	);
};
export default AlertDialog;
