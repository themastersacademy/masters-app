import { Chip, Avatar } from "@mui/material";
export default function PlanChip({ plan }) {
  return (
    <Chip
      label={plan}
      sx={{
        backgroundColor: "rgba(2, 201, 79, 0.1)",
        color: "#02C94F",
        fontWeight: "bold",
        padding: "0px 10px 0px 5px",
        border: "1px solid #02C94F",
      }}
      avatar={
        <Avatar
          sx={{
            width: "12px !important",
            height: "12px !important",
            margin: "0px 0px 0px 10px !important",
            backgroundColor: "#02C94F",
            color: "#02C94F !important",
            fontSize: "4px",
            fontWeight: "bold",
          }}
        />
      }
    />
  );
}
