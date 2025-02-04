import { Typography, Box } from "@mui/material";
import RandomImageDisplay from "../components/RandomImageDisplay";

export default function RandomFive() {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" component="h1" gutterBottom>
                Five Random Images
            </Typography>
            <RandomImageDisplay imageCount={5} />
        </Box>
    );
}
