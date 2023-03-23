import React, { forwardRef } from 'react';
import { Dialog, Slide, Button, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { objectivesImages } from '@/assets/ObjectivesImages';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EducationModal({ open, onClose }) {
    const image = objectivesImages.get('Ecosystems');

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
                            {image &&
                                <Image
                                    src={image}
                                    alt="Profile Picture"
                                    width={80}
                                    height={80}
                                />
                            }
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
                {/* TODO: body */}
            </Dialog>
        </div>

    );
}
