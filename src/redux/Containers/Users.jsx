import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import UsersList from "./UsersList";
import AddUser from "../../Components/User/AddUser";

const useStyles = makeStyles(() => ({
    container: {
        padding: 0,
        paddingTop: "100px"
    }
}));

const Users = () =>{
    const classes = useStyles();
    return(
        <Container className={classes.container}>
            <AddUser/>
            <UsersList/>
        </Container>
    );
}

export default Users;