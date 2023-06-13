import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import LockIcon from '@mui/icons-material/Lock';
import { visuallyHidden } from '@mui/utils';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import BasicModal from './modal';
import DownloadIcon from '@mui/icons-material/Download';


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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}



const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'calories',
        numeric: false,
        disablePadding: false,
        label: 'Username',
    },
    {
        id: 'fat',
        numeric: false,
        disablePadding: false,
        label: 'Email Address',
    },
    {
        id: 'carbs',
        numeric: false,
        disablePadding: false,
        label: 'Group',
    },
    {
        id: 'protein',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'Createdon',
        numeric: false,
        disablePadding: false,
        label: 'Created on',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow sx={{ background: "whitesmoke", color: "black" }}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        style={{ color: "#22a565" }}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        sx={{ color: "Grey" }}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    const [row, setRow] = React.useState("");
    const [index, setIndex] = React.useState(0);
    const handleClose = () => props.setOpen(false);


    const editClicked = () => {
        if (props.numSelected > 1 || props.numSelected < 1) {
            alert("Please select only one item");
        } else {
            props.setOpen(true);
            setRow(props.selected);
            setIndex(props.selectedIndex);
        }
    };


    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: "5px" }}>
                    <Typography
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                        style={{ alignSelf: "center" }}
                    >
                        {numSelected} selected
                    </Typography>
                    <Typography style={{ alignSelf: "center" }}>
                        |
                    </Typography>


                    <IconButton onClick={editClicked} aria-label="Example" sx={{ backgroundColor: "whitesmoke", "color": "black", borderRadius: "4px" }}>
                        <EditIcon />
                    </IconButton>

                    <IconButton aria-label="Example" sx={{ backgroundColor: "whitesmoke", "color": "black", borderRadius: "4px" }}>
                        <NotInterestedIcon />
                    </IconButton>
                    <IconButton aria-label="Example" sx={{ backgroundColor: "whitesmoke", "color": "black", borderRadius: "4px" }}>
                        <LockIcon />
                    </IconButton>

                    <Button variant="contained" size="small" sx={{ backgroundColor: "whitesmoke", "color": "black", borderRadius: "4px", textTransform: "none", "&:hover": { backgroundColor: "whitesmoke", color: "black" } }}>Assign to Profile</Button>
                    <Button variant="contained" size="small" sx={{ backgroundColor: "whitesmoke", "color": "black", borderRadius: "4px", textTransform: "none", "&:hover": { backgroundColor: "whitesmoke", color: "black" } }}>Assign to Group</Button>
                    <IconButton aria-label="Example" sx={{ backgroundColor: "whitesmoke", "color": "black", borderRadius: "4px" }}>
                        <MoreVertIcon />
                    </IconButton>
                    <Button variant="text" size="small" sx={{ color: "black", textTransform: "none", textDecoration: "underline", "&:hover": { backgroundColor: "whitesmoke", color: "black" } }}>Unselect All</Button>

                </Box>
                <Box style={{ display: "flex" }}>
                    <IconButton aria-label="Example" sx={{ backgroundColor: "whitesmoke", "color": "black", borderRadius: "4px" }}>
                        <DownloadIcon />
                    </IconButton>
                    <BasicModal setRows={props.setRows} open={props.mOpen} setRow={setRow} setOpen={handleClose} row={row} index={index} />
                </Box>

            </Box>
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

function createData(name, username, email, group, status, createdon) {
    return {
        name,
        username,
        email,
        group,
        status,
        createdon
    };
}


export default function EnhancedTable({ search, nRows, mOpen, setOpen }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedRow, setSelectedRow] = React.useState(0);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    let [rows, setRows] = React.useState(nRows);


    function addRow(name, user, email, userGroup, profile, index = -1) {
        if (index === -1) {
            setRows([...rows, createData(name, user, email, userGroup, profile, "Dec 10, 2022")]);
        } else {

            rows[index].name = name;
            rows[index].user = user;
            rows[index].email = email;
            rows[index].group = userGroup;
            rows[index].status = profile;
            setRows([...rows]);
            setSelected([]);
        }

    }


    if (search !== "") {
        let arr = [];
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].name.toLowerCase().search(search) !== -1) {
                arr.push(rows[i]);
            }
        }
        rows = arr;
    }


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, row, index) => {
        const selectedIndex = selected.indexOf(row.name);

        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, row.name);
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
        setSelectedRow(row);
        setSelectedIndex(index);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    let visibleRows = stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    )


    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, }}>
                <EnhancedTableToolbar setOpen={setOpen} mOpen={mOpen} selected={selectedRow} selectedIndex={selectedIndex} numSelected={selected.length} setRows={addRow} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>

                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        onClick={(event) => handleClick(event, row, index)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                style={{ color: "#22a565" }}
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell >{row.username}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.group}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>{row.createdon}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Box>
    );
}