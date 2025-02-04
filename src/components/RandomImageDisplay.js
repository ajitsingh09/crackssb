import { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress, IconButton } from '@mui/material';
import Image from 'next/image';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function RandomImageDisplay({ imageCount }) {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        // Import all images and shuffle them
        const importImages = async () => {
            const imageContext = require.context('../assets', false, /\.(png|jpe?g|svg)$/);
            const imageList = imageContext.keys().map((key) => ({
                src: imageContext(key).default,
                alt: key.replace('./', '').split('.')[0]
            }));

            // Shuffle array and take required number of images
            const shuffled = [...imageList].sort(() => 0.5 - Math.random());
            setImages(shuffled.slice(0, imageCount));
        };

        importImages();
    }, [imageCount]);

    useEffect(() => {
        let timer;
        if (isStarted && !isFinished) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        // Time's up for current image
                        if (currentImageIndex < images.length - 1) {
                            setCurrentImageIndex(prev => prev + 1);
                            return 300; // Reset timer for next image
                        } else {
                            setIsFinished(true);
                            clearInterval(timer);
                            return 0;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isStarted, currentImageIndex, images.length, isFinished]);

    const handleStart = () => {
        setIsStarted(true);
    };

    const handlePrevious = (e) => {
        e.stopPropagation();
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
            setTimeLeft(300); // Reset timer
        }
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
            setTimeLeft(300); // Reset timer
        } else {
            setIsFinished(true);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    if (images.length === 0) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3
        }}>
            {!isStarted ? (
                <Button
                    variant="contained"
                    onClick={handleStart}
                    sx={{
                        fontSize: '1.2rem',
                        padding: '12px 24px'
                    }}
                >
                    Start
                </Button>
            ) : isFinished ? (
                <Typography variant="h4" component="h2">
                    Session Complete!
                </Typography>
            ) : (
                <>
                    <Box
                        sx={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            position: 'relative',
                            width: '100%',
                            height: 588,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            border: '2px solid white',
                            boxShadow: '0 4px 8px rgba(255,255,255,0.1)',
                        }}
                    >
                        <IconButton
                            onClick={handlePrevious}
                            disabled={currentImageIndex === 0}
                            sx={{
                                position: 'absolute',
                                left: 16,
                                bgcolor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'rgba(0,0,0,0.7)',
                                },
                                '&.Mui-disabled': {
                                    bgcolor: 'rgba(0,0,0,0.2)',
                                    color: 'rgba(255,255,255,0.3)',
                                }
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <Image
                            src={images[currentImageIndex].src}
                            alt={images[currentImageIndex].alt}
                            width={580}
                            height={580}
                            style={{
                                objectFit: 'contain',
                            }}
                        />
                        <IconButton
                            onClick={handleNext}
                            disabled={currentImageIndex === images.length - 1}
                            sx={{
                                position: 'absolute',
                                right: 16,
                                bgcolor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'rgba(0,0,0,0.7)',
                                },
                                '&.Mui-disabled': {
                                    bgcolor: 'rgba(0,0,0,0.2)',
                                    color: 'rgba(255,255,255,0.3)',
                                }
                            }}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="h4" component="div">
                        Time Remaining: {formatTime(timeLeft)}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Image {currentImageIndex + 1} of {images.length}
                    </Typography>
                </>
            )}
        </Box>
    );
} 