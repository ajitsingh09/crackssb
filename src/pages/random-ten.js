import { Typography, Box } from "@mui/material";
import RandomImageDisplay from "../components/RandomImageDisplay";

export default function RandomTen() {
    return (
        <Box>
            <Typography variant="h3" component="h1" gutterBottom>
                Random Ten Page
            </Typography>
            <RandomImageDisplay imageCount={10} />
        </Box>
    );
}
