import { Stack, Typography } from "@mui/material";

const technicians = [
  "TONI",
  "JOSEP",
  "MIGUEL",
  "PILI",
  "ROSER",
  "CRISTINA",
  "ALBA",
  "M. ÁNGEL",
  "LLUISA",
];

export const UserTechniciansBox = () => {
  return (
    <>
      <Stack sx={{ borderRadius: "5px", border: "1px grey solid", p: "10px" }}>
        <Typography sx={{ mb: "3px", textAlign: "center", fontWeight: "bold" }}>
          Técnicos que están
        </Typography>
        {technicians.map((technician) => (
          <Typography
            key={technician}
            px={1}
            mb={1 / 2}
            sx={{
              border: "1px grey solid",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            {technician}
          </Typography>
        ))}
        {/*   <Typography
          px={1}
          mb={1 / 2}
          sx={{
            border: "1px grey solid",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          TONI
        </Typography>

        <Typography
          px={1}
          mb={1 / 2}
          sx={{
            border: "1px grey solid",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          JOSEP
        </Typography>
        <Typography
          px={1}
          mb={1 / 2}
          sx={{
            border: "1px grey solid",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          PILI
        </Typography>
        <Typography
          px={1}
          mb={1 / 2}
          sx={{
            border: "1px grey solid",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          MIGUEL
        </Typography>
        <Typography
          px={1}
          mb={1 / 2}
          sx={{
            border: "1px grey solid",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          ALBA
        </Typography>
        <Typography
          px={1}
          mb={1 / 2}
          sx={{
            border: "1px grey solid",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          CRISTINA
        </Typography>
        <Typography
          px={1}
          mb={1 / 2}
          sx={{
            border: "1px grey solid",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          ROSER
        </Typography>
        <Typography
          px={1}
          mb={1 / 2}
          sx={{
            border: "1px grey solid",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          LLUISA
        </Typography>
        <Typography
          px={1}
          mb={1 / 2}
          sx={{
            border: "1px grey solid",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          M. ÁNGEL
        </Typography> */}
      </Stack>
    </>
  );
};
