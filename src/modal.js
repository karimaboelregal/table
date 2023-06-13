import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
};




export default function BasicModal({ setRows, open, setOpen, row, index, setRow }) {
    let name = "";
    let user = "";
    let email = "";
    let userGroup = "";
    let profile = "";

    if (row !== "") {
        name = row.name;
        user = row.username;
        email = row.email;
        userGroup = row.status;
        profile = row.group;
    }

    const handleClose = () => { setOpen(false); setRow(""); }



    const clicked = () => {
        if (row === "") {
            setRows(name, user, email, userGroup, profile);
        } else {
            setRows(name, user, email, userGroup, profile, index);
        }
        handleClose();
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <Box sx={{ backgroundColor: "#050e2d", color: "white", p: 2, display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {row === "" ? "Add New User" : "Edit user"}
                        </Typography>

                        <IconButton sx={{ color: "white" }} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>

                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography id="modal-modal-description">
                            Full Name
                        </Typography>
                        <TextField
                            label="Full Name"
                            defaultValue={row === "" ? "" : row.name}
                            style={{ width: "100%", "marginTop": "10px" }}
                            id="search"
                            size="small"
                            onChange={evt => { name = evt.target.value }}
                        />

                    </Box>

                    <Box sx={{ p: 2 }}>
                        <Typography id="modal-modal-description">
                            Username
                        </Typography>
                        <TextField
                            label="Username"
                            defaultValue={row === "" ? "" : row.username}
                            style={{ width: "100%", "marginTop": "10px" }}
                            id="search"
                            size="small"
                            onChange={evt => { user = evt.target.value }}
                        />

                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography id="modal-modal-description">
                            Email
                        </Typography>
                        <TextField
                            label="Email"
                            defaultValue={row === "" ? "" : row.email}
                            style={{ width: "100%", "marginTop": "10px" }}
                            id="search"
                            size="small"
                            onChange={evt => { email = evt.target.value }}
                        />

                    </Box>

                    <Box sx={{ p: 2 }}>
                        <Typography id="modal-modal-description">
                            User Group
                        </Typography>
                        <FormControl sx={{ minWidth: "100%", marginTop: "10px" }} size="small">
                            <InputLabel id="demo-select-small-label">User Group</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="User Group"
                                defaultValue={userGroup}
                                onChange={(event) => userGroup = event.target.value}
                            >
                                <MenuItem value={"Active"}>Active</MenuItem>
                                <MenuItem value={"Inactive"} selected>Inactive</MenuItem>
                                <MenuItem value={"Locked"}>Locked</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>


                    <Box sx={{ p: 2 }}>
                        <Typography id="modal-modal-description">
                            Assign Profile
                        </Typography>
                        <FormControl sx={{ minWidth: "100%", marginTop: "10px" }} size="small">
                            <InputLabel id="demo-select-small-label">Assign Profile</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="User Status"
                                defaultValue={profile}
                                onChange={(event) => profile = event.target.value}
                            >
                                <MenuItem value={"Head Office"}>Head Office</MenuItem>
                                <MenuItem value={"Manager"}>Managers</MenuItem>
                                <MenuItem value={"Office"}>Office</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>


                    <Box sx={{ p: 2, display: "flex", gap: "10px", width: "100%", justifyContent: "end" }}>
                        <Divider />
                        <Button onClick={handleClose} variant="outlined" style={{ textTransform: 'none', "marginTop": "10px", color: "black", borderColor: "lightgrey" }}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={clicked} style={{ backgroundColor: "#22a565", textTransform: 'none', "marginTop": "10px" }}>
                            {row === "" ? "Add User" : "Save"}
                        </Button>

                    </Box>

                </Box>
            </Modal>
        </div>
    );
}