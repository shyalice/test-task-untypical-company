import React from "react";
import {useSelector} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
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

const useStyles = makeStyles((theme) => ({
	paper: {
        padding: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	}
}));

const UserInfo = (props) => {
    const user = useSelector(state => state.user.users)[parseInt(props.match.params.id) - 1]
    const classes = useStyles();
    return(
        <Paper className={classes.paper}>
            <Typography variant="h5">{user.name.toUpperCase()} {user.lastName.toUpperCase()} (#{user.id})</Typography>
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
                        <ListItemText primary={`Birthday: ${user.birthday}`} />
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
        </Paper>
    )
    
};

export default UserInfo