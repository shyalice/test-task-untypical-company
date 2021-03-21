import React from 'react';
import {useState} from "react"
import {useDispatch} from 'react-redux'
import {addUser} from "../../Redux/actions";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

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

const AddUser = () => {
    const classes = useStyles();

    //modal
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUser({
            name: "",
            lastName: "",
            birthday: "",
            gender: null,
            phone: "",
            email: ""
        })
    };

    //user
    const [newUser, setUser] = useState({
        name: "",
        lastName: "",
        birthday: "",
        gender: null,
        phone: "",
        email: ""
    });

    const dispatch = useDispatch();

    const onAddClick = () =>{
        dispatch(addUser(newUser));
        handleClose();
    }

    const handleChange = (name, value) => {
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
    <div>
        <div className={classes.groupTitle}>
            <Typography variant="h6">Add New User</Typography>
            <IconButton color="primary" component="span" style={{ marginLeft: "5px" }} onClick={handleOpen}>
                <AddCircleOutlineIcon style={{ fontSize: 30 }} />
            </IconButton>
        </div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <Typography variant="h6" style={{ marginBottom: "20px" }}>Add New User</Typography>
                    <form noValidate autoComplete="off" className={classes.form}>
                        <TextField value={newUser.name} onChange={(e) => handleChange("name", e.target.value)} label="Name" />
                        <TextField value={newUser.lastName} onChange={(e) => handleChange("lastName", e.target.value)} label="Last Name" />
                        <TextField value={newUser.birthday} onChange={(e) => handleChange("birthday", e.target.value)} label="Birthday" type="date" InputLabelProps={{shrink: true}}/>
                        <ButtonGroup>
                            <Button variant="outlined" style={newUser.gender === "male" ? {backgroundColor: "#e6e6e6"} : {backgroundColor: "#fff"}}
                                onClick={() => handleChange("gender", "male")}>Male</Button>
                            <Button variant="outlined" style={newUser.gender === "female" ? {backgroundColor: "#e6e6e6"} : {backgroundColor: "#fff"}}
                                onClick={() => handleChange("gender", "female")}>Female</Button>
                        </ButtonGroup>
                        <TextField value={newUser.phone} onChange={(e) => handleChange("phone", e.target.value)} label="Phone" type="number"/>
                        <TextField value={newUser.email} onChange={(e) => handleChange("email", e.target.value)} label="Email"/>
                        <Button variant="contained" onClick={() => onAddClick()}>Add User</Button>
                    </form>
                </div>
            </Fade>
        </Modal>
    </div>
    );
}

export default AddUser;