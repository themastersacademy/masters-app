import {
  Paper,
  Accordion,
  AccordionSummary,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material/";
import Avater from "../../../util/Avater";
import PlanChip from "./PlanChip";
import { useState } from "react";

export default function GoalCard() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Paper
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <Accordion expanded={expanded}>
        <AccordionSummary
          onClick={() => {
            setExpanded(!expanded);
          }}
          sx={{
            borderRadius: "20px 20px 0 0",
            padding: "5px 20px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
          expandIcon={<ExpandMore />}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <img src={Avater.FileImage} />
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              Placement Training
            </h2>
          </Stack>
        </AccordionSummary>
        <Stack>
          <Divider />
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "500",
              padding: "10px 20px",
            }}
          >
            My Goals
          </h1>
          <Divider />
          {[
            { goal: "Placement Training", plan: "Free" },
            { goal: "GATE Exam", plan: "Free" },
          ].map((item, index) => (
            <div>
              <GoalListCard
                key={index}
                goal={item.goal}
                plan={item.plan}
                onClick={() => {
                    setExpanded(!expanded);
                  }}
              />
              <Divider />
            </div>
          ))}
          <Stack direction="column" alignItems="center" m={2}>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#187163",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#187163",
                  color: "#fff",
                },
              }}
            >
              Add More
            </Button>
          </Stack>
        </Stack>
      </Accordion>
    </Paper>
  );
}

function GoalListCard({ goal, plan, onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        width: "100%",
        color: "#000",
        textTransform: "none",
        padding: "10px 20px",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" width={"100%"}>
        <img src={Avater.FileImage} />
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          {goal}
        </h3>
      </Stack>
      <PlanChip plan={plan} />
    </Button>
  );
}
