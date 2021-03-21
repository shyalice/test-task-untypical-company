import React from "react";
import {BrowserRouter} from "react-router-dom"
import Routing from "./Components/Routing";
import Header from "./Components/Header";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(() => ({
    container: {
        marginTop: "100px"
    }
}));

function App() {
	const classes = useStyles();
	return (
		<BrowserRouter>
			<Container className={classes.container}>
				<Header/>
				<Routing/>
			</Container>
		</BrowserRouter>
	);
}

export default App;
