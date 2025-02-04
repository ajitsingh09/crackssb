import { Typography, Box } from "@mui/material";
import RandomImageDisplay from "../components/RandomImageDisplay";

export default function RandomThree() {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Three Random Images
            </Typography>
            <RandomImageDisplay imageCount={3} />
        </Box>
    );
}
