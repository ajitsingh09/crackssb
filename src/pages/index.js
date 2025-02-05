import {
    Typography,
    Box,
    Button,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import Link from "next/link";

export default function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const navigationButtons = [
        { text: "All Images", href: "/all" },
        { text: "Random Three", href: "/random-three" },
        { text: "Random Five", href: "/random-five" },
        { text: "Random Ten", href: "/random-ten" },
    ];

    return (
        <Box
            sx={{
                height: "80vh",
                maxHeight: "80vh",
                background:
                    "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(45,45,45,0.9) 100%)",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                p: 4,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
                    pointerEvents: "none",
                },
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    animation: "fadeIn 1.5s ease-out",
                    "@keyframes fadeIn": {
                        "0%": {
                            opacity: 0,
                            transform: "translateY(-20px)",
                        },
                        "100%": {
                            opacity: 1,
                            transform: "translateY(0)",
                        },
                    },
                }}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 300,
                        background:
                            "linear-gradient(45deg, #FFFFFF 30%, #A0A0A0 90%)",
                        backgroundClip: "text",
                        textFillColor: "transparent",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 2,
                    }}
                >
                    SSB Physchology
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        color: "rgba(255,255,255,0.7)",
                        maxWidth: "800px",
                        mx: "auto",
                        mb: 6,
                    }}
                >
                    Here you will get the opportunity to test your story skills
                    with time control environment.
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        color: "rgba(255,255,255,0.7)",
                        maxWidth: "800px",
                        mx: "auto",
                        mb: 6,
                    }}
                >
                    Enjoy motherfucker!
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: 3,
                    flexWrap: "wrap",
                    justifyContent: "center",
                    animation: "slideUp 1.5s ease-out",
                    "@keyframes slideUp": {
                        "0%": {
                            opacity: 0,
                            transform: "translateY(20px)",
                        },
                        "100%": {
                            opacity: 1,
                            transform: "translateY(0)",
                        },
                    },
                }}
            >
                {navigationButtons.map((button, index) => (
                    <Button
                        key={button.href}
                        component={Link}
                        href={button.href}
                        variant="outlined"
                        sx={{
                            px: 4,
                            py: 2,
                            borderColor: "rgba(255,255,255,0.3)",
                            color: "white",
                            fontSize: "1.1rem",
                            minWidth: isMobile ? "100%" : "200px",
                            transition: "all 0.3s ease",
                            animation: `fadeIn 0.5s ease-out ${index * 0.2}s`,
                            "&:hover": {
                                borderColor: "white",
                                transform: "translateY(-3px)",
                                boxShadow: "0 4px 8px rgba(255,255,255,0.2)",
                                background: "rgba(255,255,255,0.1)",
                            },
                        }}
                    >
                        {button.text}
                    </Button>
                ))}
            </Box>
        </Box>
    );
}
