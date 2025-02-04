import { Typography, Box } from "@mui/material";
import RandomImageDisplay from "../components/RandomImageDisplay";

export default function RandomThree() {
    return (
        <Box>
            <Typography variant="h3" component="h1" gutterBottom>
                Random Three Page
            </Typography>
            <RandomImageDisplay imageCount={3} />
        </Box>
    );
}
