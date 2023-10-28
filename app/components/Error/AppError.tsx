import { Box, Button, Typography } from "@mui/material";

interface Props {
  title: string;
  message: string;
  handleClose: () => void;
}

function AppError({ handleClose, title, message }: Props) {
  return (
    <Box
      bgcolor="background.paper"
      boxShadow=" 24"
      sx={{
        padding: 4,
        border: "none",
        textAlign: "center",
        borderRadius: 1,
      }}
    >
      <Typography
        fontSize="2rem"
        fontWeight="600"
        id="modal-modal-title"
        variant="h6"
        component="h2"
      >
        {title ? title : "Error"}
      </Typography>
      <Typography mb={3} mt={1} fontSize="1.6rem" id="modal-modal-description">
        {message ? message : "Request failed: An error occured"}
      </Typography>

      <Button
        onClick={handleClose}
        sx={{ fontSize: "1.4rem" }}
        variant="contained"
      >
        Ok
      </Button>
    </Box>
  );
}

export default AppError;
