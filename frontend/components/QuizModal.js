import React, { forwardRef } from 'react';
import { Dialog, Slide, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import Quiz from './Quiz';
import { questions } from '@/assets/QuizQuestions';
import { objectivesImages } from '@/assets/ObjectivesImages';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function Modal({ open, onClose }) {
    // Randomly select a question
    const randQuestionNr = Math.floor(Math.random() * questions.length);
    const question = questions[randQuestionNr];
    const image = objectivesImages.get(question.category);

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <DialogTitle>
                <div className='relative mt-10'>
                    <div className='absolute top-0 left-0 -mt-10'>
                        {image && (
                            <Image src={image} alt='Profile Picture' width={80} height={80} />
                        )}
                    </div>
                </div>
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Quiz question={question} onClick={onClose} />
        </Dialog>
    );
}
