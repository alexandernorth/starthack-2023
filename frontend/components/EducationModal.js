import React, { forwardRef } from 'react';
import { Dialog, Slide, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import Education from './Education';
import puzzle from "../public/images/puzzle.png";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EducationModal({ open, onClose }) {
    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
                TransitionComponent={Transition}
            >
                <DialogTitle>
                    <div className="relative mt-10">
                        <div className="absolute top-0 left-0 -mt-10">
                            <Image
                                src={puzzle}
                                alt="Profile Picture"
                                width={80}
                                height={80}
                            />
                        </div>
                    </div>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Education onClick={onClose} />
            </Dialog>
        </div>
    );
}
