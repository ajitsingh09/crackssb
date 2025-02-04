import { Typography, Box } from "@mui/material";
import RandomImageDisplay from "../components/RandomImageDisplay";

export default function RandomTen() {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" component="h1" gutterBottom>
                Ten Random Images
            </Typography>
            <RandomImageDisplay imageCount={10} />
        </Box>
    );
}
