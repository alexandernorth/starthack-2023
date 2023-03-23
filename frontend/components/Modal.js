import React, { useState, forwardRef } from 'react';
import { Dialog, Slide, Button, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({ title, child }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => { setOpen(true); };

    const handleClose = () => { setOpen(false); };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <DialogTitle>
                    {title}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                {child}
            </Dialog>
        </div>

    );
}
