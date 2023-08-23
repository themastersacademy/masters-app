import { Paper, Stack } from "@mui/material";
import Avater from "../../../../util/Avater";

export default function LeaderBoard({ leaderBoardList, isMobileView }) {
  return (
    <Paper
      sx={{
        borderRadius: "20px",
        width: isMobileView ? "100%" : "70%",
        padding: "20px",
      }}
    >
      <Stack direction="column" gap={1}>
        <h1
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            margin: "0",
            padding: "0",
          }}
        >
          You
        </h1>
        <LeaderBoardItem
          name="Harini"
          score="72"
          rank="24"
          avater="FemaleAvatar1"
        />
      </Stack>
      <Stack direction="column" gap={1}>
        <h1
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            margin: "0",
            padding: "0",
            marginTop: "20px",
          }}
        >
          Leader board
        </h1>
        <Stack
          direction="column"
          gap={1}
          className="scrollHide"
          padding="0 2px 20px 2px"
          overflow="scroll"
          height={!isMobileView ? "calc(100vh - 490px)" : "auto"}
        >
          {leaderBoardList.map((item, index) => (
            <LeaderBoardItem key={index} {...item} />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}

const LeaderBoardItem = ({ name, score, rank, avater }) => {
  return (
    <Paper
      sx={{
        borderRadius: "20px",
        width: "100%",
        padding: "12px 20px",
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ width: "100%" }} gap={2}>
        <Stack position="relative" width={"60px"} height={"60px"}>
          {rank == 1 || rank == 2 || rank == 3 ? (
            <img
              src={
                rank == 1
                  ? Avater.badge1
                  : rank == 2
                  ? Avater.badge2
                  : Avater.badge3
              }
              alt=""
            />
          ) : null}
          <img
            width={"40px"}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            src={Avater[avater]}
            alt=""
          />
        </Stack>
        <Stack width="100%" gap={0.4}>
          <h1
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              margin: "0",
              padding: "0",
            }}
          >
            {name}
          </h1>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <h1
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                margin: "0",
                padding: "0",
                color: "#787486",
              }}
            >
              Rank : <font color="#187163">#{rank}</font>
            </h1>
            <h1
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                margin: "0",
                padding: "0",
                color: "#787486",
                width: "100px",
              }}
            >
              Mark : <font color="#187163">{score}</font>
            </h1>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
