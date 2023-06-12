import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NestedList from './nestedlist';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import EnhancedTable from './table';

const drawerWidth = 220;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    background: "#050e2d",
    color: "#747a8a"
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));



const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `0px`,
    [theme.breakpoints.up('sm')]: {
        width: `0px`,
    },
    background: "#050e2d",
    color: "#686e80"

});



const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    background: "white",
    color: "black",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


class miniDrawer extends React.Component {
    constructor() {
        super()
        this.state = {
            open: true,
            searchValue: ""
        }
        this.updateSearch = this.updateSearch.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
    }

    updateSearch(target) {
        this.setState({searchValue: target.target.value});
    }

    handleDrawerOpen() {
        this.setState({ open: true })
    }
    handleDrawerClose() {
        this.setState({ open: false })
    }


    render() {
        return (
            <Box sx={{ display: 'flex' }} >
                <CssBaseline />
                <AppBar position="fixed" open={this.state.open}>
                    <Toolbar variant="dense">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(this.state.open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography >
                            {this.state.open === true ? <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon />
                                <MenuIcon />
                            </IconButton> : ""}
                            Good Morning! {getMonthYear()}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={this.state.open} style={{ backgroundColor: "#050e2d" }}>
                    <List>
                        <ListItem>
                            <img src="https://i.imgur.com/uJFV4RF.png" width="200px" height="70px" alt="icon" />
                        </ListItem>
                        <ListItem >
                            <input style={{ "padding": "10px", borderRadius: "15px", "width": "100%", "border": "none", "outline": "none" }} placeholder='Quick access' />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon sx={{ mr: 1, minWidth: 0, justifyContent: 'initial' }} style={{ color: "#686e80" }}><DashboardIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem>
                            <ListItemText primary="SETTINGS" sx={{ color: "grey" }} />
                        </ListItem>
                        <NestedList title="ATM Settings" items={["ATM-Placeholder", "ATM-Placeholder", "ATM-Placeholder"]} />
                        <NestedList title="Business setup" items={["Business-Placeholder", "Business-Placeholder", "Business-Placeholder"]} />
                        <NestedList title="User Management" items={["Users", "Profiles", "Groups"]} selected={true} />
                        <ListItemButton><ListItemText primary="License Management" /></ListItemButton>
                    </List>
                </Drawer>

                <Box component="main" sx={{ flexGrow: 1, p: 3, background: "whitesmoke", height: "100vh" }}>
                    <DrawerHeader />

                    <Box sx={{ display: 'flex', justifyContent: "space-between", paddingBottom: "30px" }}>
                        <Typography variant="h6" fontWeight={"bold"}>User Management</Typography>
                    </Box>
                    <Box sx={{ display: "flex", background: "white", flexDirection: "column", gap: "10px", width: "100%", padding: "20px", border: "1px solid lightgrey", borderRadius: "7px" }}>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                            <TextField
                                label="Search..."
                                style={{ width: "250px" }}
                                onChange={this.updateSearch}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                id="search"
                                size="small"
                            />
                            <TextField label="User Name" style={{ width: "150px" }} id="username" size="small" />


                            <FormControl sx={{ minWidth: "150px" }} size="small">
                                <InputLabel id="demo-select-small-label">User Status</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label="User Status"
                                    value={10}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ minWidth: "150px" }} size="small">
                                <InputLabel id="demo-select-small-label">Creation Date</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label="User Status"
                                    value={10}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="text" style={{ textTransform: 'none' }}>All Filters</Button>
                        </Box>
                        <Box>
                            <EnhancedTable search={this.state.searchValue}/>
                        </Box>

                    </Box>
                </Box>
            </Box>
        );
    }


}


function getMonthYear() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    return `${day}-${month}-${year}`;
}



export default miniDrawer;