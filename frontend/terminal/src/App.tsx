import React from "react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { ThemeProvider } from "@mui/system";
import theme from "./components/theme";

function App() {
	return (
		<div className="App">
    	<ThemeProvider theme={theme}>
				<Wrapper>
					<Header />
					<Home />
					<Footer />
				</Wrapper>
			</ThemeProvider>
		</div>
	);
}

export default App;
