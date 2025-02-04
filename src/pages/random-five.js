import { Typography, Box } from "@mui/material";
import RandomImageDisplay from "../components/RandomImageDisplay";

export default function RandomFive() {
    return (
        <Box>
            <Typography variant="h3" component="h1" gutterBottom>
                Random Five Page
            </Typography>
            <RandomImageDisplay imageCount={5} />
        </Box>
    );
}
