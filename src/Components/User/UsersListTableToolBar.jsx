import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteUser} from "../../Redux/actions";
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        padding: theme.spacing(2),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        alignItems: "flex-start"
    },
    highlight:
        theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    header: {
        display: "flex",
        flexDirection: "column",
    },
    filter: {
        position: "absolute",
        top: "10%",
        left: "90%"
    }
}));

const UsersListTableToolBar = (props) => {
    const {users, selected, resetSelect, gender, setGender, setEditedUser, setEditModal} = props;
    const classes = useToolbarStyles();
    const dispatch = useDispatch();
    const [isOpenFilter, setOpenFilter] = useState(false)

    const onDelete = () =>{
        dispatch(deleteUser(selected));
        resetSelect();
    }

    const onEdit = () =>{
        setEditedUser(users.find(user => user.id === selected[0]))
        setEditModal(true);
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: selected.length > 0,
            })}
        >
            {selected.length > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">{selected.length} selected</Typography>
            ) : (
                <div className={classes.header}>
                    <Typography className={classes.title} variant="h6" component="div" style={{marginBottom: "10px"}}>Users ({users.length})</Typography>
                    {isOpenFilter && (
                        <ButtonGroup color="primary">
                            <Button variant="outlined" style={gender === "male" ? {backgroundColor: "#e6e6e6"} : {backgroundColor: "#fff"}}
                                onClick={() => setGender("male")}>Male</Button>
                            <Button variant="outlined" style={gender === "female" ? {backgroundColor: "#e6e6e6"} : {backgroundColor: "#fff"}}
                                onClick={() => setGender("female")}>Female</Button>
                            <Button variant="outlined" style={gender === null ? {backgroundColor: "#e6e6e6"} : {backgroundColor: "#fff"}}
                                onClick={() => setGender(null)}>All</Button>
                        </ButtonGroup>
                    )}
                </div>
            )}

            {selected.length > 0 ? (
                <>
                    {selected.length === 1 && (
                        <Tooltip title="Edit" onClick={() => onEdit()} >
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title="Delete" onClick={() => onDelete()}>
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Tooltip className={classes.filter} onClick={() => setOpenFilter(!isOpenFilter)} title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

export default UsersListTableToolBar;