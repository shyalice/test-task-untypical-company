import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 6, 3),
        border: "none",
        outline: "none",
        borderRadius: "5px"
    },
    groupTitle: {
        display: "flex",
        alignItems: "center"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        '& > *': {
            marginBottom: "20px"
        },
    }
}));

const UserModalField = (props) => {
    const {title, isOpen, handleClose, handleChange, onClick, user} = props;
    const classes = useStyles();
    console.log()
    return(
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <div className={classes.paper}>
                    <Typography variant="h6" style={{ marginBottom: "20px" }}>{title}</Typography>
                    {!!user && (
                        <form noValidate autoComplete="off" className={classes.form}>
                            <TextField required value={user.name} onChange={(e) => handleChange("name", e.target.value)} label="Name" />
                            <TextField required value={user.lastName} onChange={(e) => handleChange("lastName", e.target.value)} label="Last Name" />
                            <TextField required value={user.birthday} onChange={(e) => handleChange("birthday", e.target.value)} label="Birthday" type="date" 
                                InputProps={{inputProps: {max: new Date().toISOString().slice(0,10)} }} InputLabelProps={{shrink: true}}/>
                            <>
                                <Typography variant="caption" style={{marginBottom: "10px"}}>Gender *</Typography>
                                <ButtonGroup>
                                    <Button variant="outlined" style={user.gender === "male" ? {backgroundColor: "#e6e6e6"} : {backgroundColor: "#fff"}}
                                        onClick={() => handleChange("gender", "male")}>Male</Button>
                                    <Button variant="outlined" style={user.gender === "female" ? {backgroundColor: "#e6e6e6"} : {backgroundColor: "#fff"}}
                                        onClick={() => handleChange("gender", "female")}>Female</Button>
                                </ButtonGroup>
                            </>
                            <TextField value={user.phone} onChange={(e) => handleChange("phone", e.target.value)} label="Phone" type="number"/>
                            <TextField value={user.email.split(' ').join('')} onChange={(e) => handleChange("email", e.target.value)} label="Email"/>
                            {!!user.name && !!user.lastName && !!user.birthday && !!user.gender && (
                                <Button variant="contained" onClick={() => onClick()}>{title}</Button>
                            )}
                        </form>
                    )}
                </div>
            </Fade>
        </Modal>
    );
}

export default UserModalField;