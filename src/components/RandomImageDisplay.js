import { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, CircularProgress, IconButton, Switch, FormControlLabel, TextField } from '@mui/material';
import Image from 'next/image';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';

export default function RandomImageDisplay({ imageCount }) {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);
    const [isFinished, setIsFinished] = useState(false);
    const [showTimer, setShowTimer] = useState(true);
    const [countdown, setCountdown] = useState(null);
    const [imageDuration, setImageDuration] = useState(300); // Default 5 minutes
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio('/sounds/click.mp3');
        audioRef.current.volume = 1;
    }, []);

    useEffect(() => {
        const importImages = async () => {
            const imageContext = require.context('../assets', false, /\.(png|jpe?g|svg)$/);
            const imageList = imageContext.keys().map((key) => ({
                src: imageContext(key).default,
                alt: key.replace('./', '').split('.')[0]
            }));

            const shuffled = [...imageList].sort(() => 0.5 - Math.random());
            setImages(shuffled.slice(0, imageCount));
        };

        importImages();
    }, [imageCount]);

    useEffect(() => {
        let timer;
        if (isStarted && !isFinished && countdown === null) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        if (currentImageIndex < images.length - 1) {
                            audioRef.current?.play();
                            setCurrentImageIndex(prev => prev + 1);
                            return imageDuration;
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
    }, [isStarted, currentImageIndex, images.length, isFinished, countdown, imageDuration]);

    const handleStart = () => {
        setTimeLeft(imageDuration);
        setCountdown(5);
        const countdownTimer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownTimer);
                    setIsStarted(true);
                    return null;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handlePrevious = (e) => {
        e.stopPropagation();
        if (currentImageIndex > 0) {
            audioRef.current?.play();
            setCurrentImageIndex(prev => prev - 1);
            setTimeLeft(imageDuration);
        }
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (currentImageIndex < images.length - 1) {
            audioRef.current?.play();
            setCurrentImageIndex(prev => prev + 1);
            setTimeLeft(imageDuration);
        } else {
            setIsFinished(true);
        }
    };

    const handleDurationChange = (event) => {
        const value = parseInt(event.target.value);
        if (value > 0) {
            setImageDuration(value);
            if (!isStarted) {
                setTimeLeft(value);
            }
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleReset = () => {
        // Reset all states
        setIsStarted(false);
        setCurrentImageIndex(0);
        setTimeLeft(imageDuration);
        setIsFinished(false);
        setCountdown(null);

        // Fetch new random images
        const importImages = async () => {
            const imageContext = require.context('../assets', false, /\.(png|jpe?g|svg)$/);
            const imageList = imageContext.keys().map((key) => ({
                src: imageContext(key).default,
                alt: key.replace('./', '').split('.')[0]
            }));

            const shuffled = [...imageList].sort(() => 0.5 - Math.random());
            setImages(shuffled.slice(0, imageCount));
        };

        importImages();
    };

    if (images.length === 0) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            position: 'relative',
            width: '100%'
        }}>
            {(isStarted || isFinished) && (
                <IconButton
                    onClick={handleReset}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        margin: '16px',
                        bgcolor: 'rgba(255, 0, 0, 0.2)',
                        color: '#ff0000',
                        border: '2px solid #ff0000',
                        '&:hover': {
                            bgcolor: 'rgba(255, 0, 0, 0.3)',
                        },
                        zIndex: 1,
                        width: '48px',
                        height: '48px',
                        '& .MuiSvgIcon-root': {
                            fontSize: '28px',
                            fontWeight: 'bold'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            )}

            {!isStarted ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '600px',
                        width: '100%',
                        gap: 3
                    }}
                >
                    {countdown === null ? (
                        <>
                            <IconButton
                                onClick={handleStart}
                                sx={{
                                    width: '120px',
                                    height: '120px',
                                    border: '3px solid white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    }
                                }}
                            >
                                <PlayArrowIcon sx={{ fontSize: '64px' }} />
                            </IconButton>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={showTimer}
                                        onChange={() => setShowTimer(prev => !prev)}
                                        color="primary"
                                    />
                                }
                                label="Show Timer"
                            />
                            <TextField
                                type="number"
                                label="Seconds per Image"
                                value={imageDuration}
                                onChange={handleDurationChange}
                                variant="outlined"
                                sx={{
                                    width: '200px',
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': {
                                            borderColor: 'rgba(255, 255, 255, 0.5)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'rgba(255, 255, 255, 0.7)',
                                    },
                                }}
                                InputProps={{
                                    inputProps: { min: 1 }
                                }}
                            />
                        </>
                    ) : (
                        <Typography variant="h1" sx={{ fontSize: '120px' }}>
                            {countdown}
                        </Typography>
                    )}
                </Box>
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
                            height: 600,
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
                    {showTimer && (
                        <Typography variant="h4" component="div">
                            Time Remaining: {formatTime(timeLeft)}
                        </Typography>
                    )}
                    <Typography variant="h6" component="div">
                        Image {currentImageIndex + 1} of {images.length}
                    </Typography>
                </>
            )}
        </Box>
    );
} 