import { Paper, Stack, Button } from "@mui/material";

export default function QuestionCollections({ questionCategoryList, handleQuestionClick, currentQuestionIndex }) {

  return (
    <Paper
      sx={{
        padding: "20px",
        borderRadius: "20px",
        width: "100%",
        height: "100%",
      }}
    >
      <Stack
        direction="row"
        height={"20px"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center">
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "2px",
              backgroundColor: "#187163",
              border: "2px solid #187163",
              marginRight: "10px",
            }}
          ></div>
          <p>1 answered</p>
        </Stack>
        <Stack direction="row" alignItems="center">
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "2px",
              backgroundColor: "#FEA800",
              border: "2px solid #FEA800",
              marginRight: "10px",
            }}
          ></div>
          <p>1 marked</p>
        </Stack>
        <Stack direction="row" alignItems="center">
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "2px",
              backgroundColor: "white",
              border: "2px solid #9B9B9B",
              marginRight: "10px",
            }}
          ></div>
          <p>10 unanswered</p>
        </Stack>
      </Stack>
      <Stack
        direction="column"
        sx={{
          height: "calc(100vh - 430px)",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#187163",
            borderRadius: "5px",
          },
        }}
      >
        {questionCategoryList.map((questionCategory, index) => (
          <QuestionCategory
            key={index}
            title={questionCategory.title}
            questionListLength={questionCategory.questionListLength}
            handleQuestionClick={handleQuestionClick}
            currentQuestionIndex={currentQuestionIndex}
            previousTotalQuestionListLength={
              index === 0
                ? 0
                : questionCategoryList
                    .slice(0, index)
                    .reduce((a, b) => a + b.questionListLength, 0)
            }
          />
        ))}
      </Stack>
    </Paper>
  );
}

const QuestionCategory = ({
  title,
  questionListLength,
  previousTotalQuestionListLength,
  handleQuestionClick,
  currentQuestionIndex
}) => {
  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      p={1}
    >
      <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
        {title}
      </p>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {[...Array(questionListLength)].map((question, index) => (
          <Button
            key={index}
            variant="outlined"
            style={{
              width: "35px",
              maxWidth: "35px",
              minWidth: "35px",
              height: "35px",
              borderRadius: "5px",
              border: "3px solid #9F9F9F",
              borderColor: currentQuestionIndex === previousTotalQuestionListLength + index ? "#187163" : "#9B9B9B",
              fontSize: "14px",
              color: currentQuestionIndex === previousTotalQuestionListLength + index ? "#187163" : "#9B9B9B",
              padding: "0",
              margin: "0",
            }}
            onClick={() => handleQuestionClick(previousTotalQuestionListLength + index)}
          >
            {previousTotalQuestionListLength + index + 1}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};
