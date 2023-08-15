import {
  Paper,
  Stack,
  FormGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

export default function PracticeTest({MD}) {
  return (
    <Paper
      elevation={MD ? 0 : 2}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <Stack
        paddingBottom={"20px"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <h3
          style={{
            fontSize: MD ? "18px" : "22px",
            fontWeight: "600",
            color: "#656565",
            marginBottom: "10px",
          }}
        >
          Practice Test Series
        </h3>
        <FormControlLabel
          onClick={() => {}}
          control={
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "#187163",
                },
                "&.MuiCheckbox-root": {
                  color: "#187163",
                },
              }}
            />
          }
          label={"Select All"}
        />
      </Stack>
      <TopicList
        MD={MD}
        topicList={[
          "Quantitative Aptitude",
          "Logical Reasoning",
          "Verbal Ability",
          "Technical Aptitude",
          "Coding",
          "Logical Reasoning",
          "Verbal Ability",
        ]}
      />
      <Stack direction="row" gap="10px" margin="20px 0">
        <FormControl fullWidth>
          <InputLabel
            sx={{
              color: "#187163",
            }}
            id="demo-simple-select-label"
          >
            No of questions
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={"select"}
            label="No of questions"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderColor: "green !important",
              },
              "& .MuiSvgIcon-root": {
                color: "#187163 !important",
              },
            }}
            // onChange={handleChange}
          >
            <MenuItem disabled value={"select"}>
              Select Questions
            </MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={35}>35</MenuItem>
            <MenuItem value={40}>40</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel
            sx={{
              color: "#187163",
            }}
            id="demo-simple-select-label"
          >
            Difficulty level
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={"select"}
            label="Difficulty level"
            sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: "green !important",
                },
                "& .MuiSvgIcon-root": {
                  color: "#187163 !important",
                },
              }}
            // onChange={handleChange}
          >
            <MenuItem disabled value={"select"}>
              Select Level
            </MenuItem>
            <MenuItem value={"easy"}>Easy</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"hard"}>Hard</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Button
        variant="contained"
        fullWidth
        sx={{
          textTransform: "none",
          backgroundColor: "#187163",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#187163",
            color: "#fff",
          },
          padding: "10px",
        }}
      >
        Attempt Test
      </Button>
    </Paper>
  );
}

function TopicList({ topicList, MD }) {
  return (
    <FormGroup>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={2}
      >
        {topicList.map((topic, index) => {
          return <TopicListCard key={index} topic={topic} index={index} MD={MD}/>;
        })}
      </Stack>
    </FormGroup>
  );
}

function TopicListCard({ topic, index, MD }) {
  return (
    <Paper
      elevation={MD ? 0 : 1}
      sx={{
        width: MD ? "100%" :"fit-content",
        padding: "5px 10px",
        borderRadius: "10px",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: MD ? "none" : "#e5e5e5",
        },
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#187163",
              },
              "&.MuiCheckbox-root": {
                color: "#187163",
              },
            }}
          />
        }
        label={topic}
      />
    </Paper>
  );
}
