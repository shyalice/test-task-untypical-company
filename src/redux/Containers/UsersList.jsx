import React from 'react';
import {useState} from "react";
import {useSelector} from "react-redux"
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import UsersListTableHeader from "../../Components/User/UsersListTableHeader";
import UsersListTableToolBar from "../../Components/User/UsersListTableToolBar";

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	}
}));

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const UsersList = () => {
	const users = useSelector(state => state.user.users);
	const classes = useStyles();
	//table header
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("id");
	const [selected, setSelected] = useState([]);
	//table pagination
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	//table header
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = users.map((user) => user.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	//table pagination
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	//select
	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<UsersListTableToolBar numSelected={selected.length}/>
				<TableContainer component={Paper}>
				<Table className={classes.table} size="small">
					<UsersListTableHeader
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={users.length}
					/>
					<TableBody>
						{stableSort(users, getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((user, index) => {
							const isItemSelected = isSelected(user.id);
							const labelId = `enhanced-table-checkbox-${index}`;

							return (
								<TableRow
									hover
									onClick={(event) => handleClick(event, user.id)}
									role="checkbox"
									aria-checked={isItemSelected}
									tabIndex={-1}
									key={user.id}
									selected={isItemSelected}
								>
									<TableCell padding="checkbox"><Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }}/></TableCell>
									<TableCell component="th" id={labelId} scope="row">{user.id}</TableCell>
									<TableCell>{user.name} {user.lastName}</TableCell>
									<TableCell>{user.birthday}</TableCell>
								</TableRow>
							);
						})}
						{emptyRows > 0 && (
							<TableRow style={{ height: 33 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={users.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}

export default UsersList