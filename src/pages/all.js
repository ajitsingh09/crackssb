import { Typography, Grid, Box, Modal, IconButton } from "@mui/material";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function All() {
    const [images, setImages] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        // Import all images from assets folder
        const importImages = async () => {
            const imageContext = require.context('../assets', false, /\.(png|jpe?g|svg)$/);
            const imageList = imageContext.keys().map((key) => ({
                src: imageContext(key).default,
                alt: key.replace('./', '').split('.')[0]
            }));
            setImages(imageList);
        };

        importImages();
    }, []);

    const handleOpen = (index) => {
        setSelectedIndex(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePrevious = (e) => {
        e.stopPropagation();
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <Box>
            <Typography variant="h3" component="h1" gutterBottom>
                All Items Page
            </Typography>

            <Grid container spacing={3}>
                {images.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Box
                            onClick={() => handleOpen(index)}
                            sx={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                position: 'relative',
                                width: '100%',
                                height: 400,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                border: '2px solid white',
                                boxShadow: '0 4px 8px rgba(255,255,255,0.1)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 6px 12px rgba(255,255,255,0.2)',
                                }
                            }}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={380}
                                height={380}
                                style={{
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& .MuiBackdrop-root': {
                        backdropFilter: 'blur(8px)',
                    }
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '80vw',
                        height: '80vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'transparent',
                        borderRadius: '16px',
                    }}
                    onClick={handleClose}
                >
                    {images.length > 0 && (
                        <>
                            <IconButton
                                onClick={handlePrevious}
                                sx={{
                                    position: 'absolute',
                                    left: 16,
                                    bgcolor: 'rgba(0,0,0,0.5)',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'rgba(0,0,0,0.7)',
                                    }
                                }}
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src={images[selectedIndex].src}
                                    alt={images[selectedIndex].alt}
                                    fill={false}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        width: 'auto',
                                        height: 'auto',
                                        objectFit: 'contain',
                                    }}
                                />
                            </Box>
                            <IconButton
                                onClick={handleNext}
                                sx={{
                                    position: 'absolute',
                                    right: 16,
                                    bgcolor: 'rgba(0,0,0,0.5)',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'rgba(0,0,0,0.7)',
                                    }
                                }}
                            >
                                <ChevronRightIcon />
                            </IconButton>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
