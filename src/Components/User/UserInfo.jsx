import React from "react";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import {updateUser} from "../../Redux/actions";
import {Link} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import WcIcon from '@material-ui/icons/Wc';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import EditIcon from '@material-ui/icons/Edit';
import UserModalField from "./UserModalField";

const useStyles = makeStyles((theme) => ({
	paper: {
        padding: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
    title: {
        display: "flex",
        alignItems: "center"
    }
}));

const UserInfo = (props) => {
    const user = useSelector(state => state.user.users).find(user => user.id === parseInt(props.match.params.id))
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isOpen, setOpen] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    const handleCloseEditModal = () =>{
		setOpen(false);
	}

    const handleChangeEditedUser = (name, value) => {
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onEdit = () =>{
        dispatch(updateUser(editedUser));
        setOpen(false);
    }

    return(
        <>
            {!!user ? (
                <Paper className={classes.paper}>
                    <div className={classes.title}>
                        <Typography variant="h5" style={{marginRight: "10px"}}>{user.name.toUpperCase()} {user.lastName.toUpperCase()} (#{user.id})</Typography>
                        <Tooltip title="Edit" onClick={() => setOpen(true)}>
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">Home</Link>
                        <Typography color="textPrimary">{user.name[0].toUpperCase() + user.name.slice(1)} {user.lastName[0].toUpperCase() + user.lastName.slice(1)}</Typography>
                    </Breadcrumbs>
                    <List className={classes.root}>
                        {!!user.name && (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`Name: ${user.name[0].toUpperCase() + user.name.slice(1)}`} />
                            </ListItem>
                        )}
                        {!!user.lastName && (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`Lastname: ${user.lastName[0].toUpperCase() + user.lastName.slice(1)}`} />
                            </ListItem>
                        )}
                        {!!user.birthday && (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <CakeIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`Birthday: ${user.birthday.split("-").reverse().join(".")}`} />
                            </ListItem>
                        )}
                        {!!user.gender && (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <WcIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`Gender: ${user.gender}`} />
                            </ListItem>
                        )}
                        {!!user.phone && (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PhoneIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`Phone: ${user.phone}`} />
                            </ListItem>
                        )}
                        {!!user.email && (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <EmailIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`Email: ${user.email}`} />
                            </ListItem>
                        )}
                    </List>
                    <UserModalField
                        title="Update User"
                        isOpen={isOpen}
                        handleClose={handleCloseEditModal}
                        handleChange={handleChangeEditedUser}
                        onClick={onEdit}
                        user={editedUser}
                    />
                </Paper>
            ) : (
                <div>
                    <Typography variant="h4">User Not Found...</Typography>
                </div>
            )}
            
        </>
    )
    
};

export default UserInfo