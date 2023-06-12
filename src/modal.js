import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
};




export default function BasicModal({setRows, mOpen}) {
    const [open, setOpen] = React.useState(mOpen);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let name = "";
    let user = "";
    let email = "";



    const clicked = () => {
        setRows(name, user, email);
        handleClose();
    }

    return (
        <div>
            <Button variant="contained" onClick={handleOpen} startIcon={<AddIcon />} style={{ backgroundColor: "#22a565", textTransform: 'none' }}>
                Add New
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <Box sx={{ backgroundColor: "#050e2d", color: "white", p: 2, display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add New User
                        </Typography>

                        <IconButton sx={{color: "white"}} onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>

                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography id="modal-modal-description">
                            Full Name
                        </Typography>
                        <TextField
                            label="Full Name"
                            style={{ width: "100%", "marginTop": "10px" }}
                            id="search"
                            size="small"
                            onChange={evt => {name = evt.target.value}}
                        />

                    </Box>

                    <Box sx={{ p: 2 }}>
                        <Typography id="modal-modal-description">
                            Username
                        </Typography>
                        <TextField
                            label="Username"
                            style={{ width: "100%", "marginTop": "10px" }}
                            id="search"
                            size="small"
                            onChange={evt => {user = evt.target.value}}
                        />

                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography id="modal-modal-description">
                            Email
                        </Typography>
                        <TextField
                            label="Email"
                            style={{ width: "100%", "marginTop": "10px" }}
                            id="search"
                            size="small"
                            onChange={evt => {email = evt.target.value}}
                        />

                    </Box>

                    <Box sx={{ p: 2, display: "flex", gap: "10px",width:"100%", justifyContent: "end" }}>
                        <Divider />
                        <Button onClick={handleClose} variant="outlined" style={{ textTransform: 'none', "marginTop": "10px", color: "black", borderColor: "lightgrey" }}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={clicked} style={{ backgroundColor: "#22a565", textTransform: 'none', "marginTop": "10px" }}>
                            Add User
                        </Button>

                    </Box>

                </Box>
            </Modal>
        </div>
    );
}