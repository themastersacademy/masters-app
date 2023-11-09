import { Stack, Button } from "@mui/material";
import Header from "../../exam/pages/components/ExamHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../util/Footer";
import useWindowDimensions from "../../../util/useWindowDimensions";
export default function Success() {
  const navigator = useNavigate();
  const [user, setUser] = useState([]);
  const { width } = useWindowDimensions();
  useEffect(() => {
    fetch("/payMent")
    .then((res) => res.json())
    .then((data) =>{
        if(data.status == false)  navigator('/')
    });

    fetch("/api/user/getUserDetails")
      .then((res) => res.json())
      .then((data) => setUser(data));
  },[]);

  const handleSuccess = () => {
    fetch("/handleStatus")
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") navigator("/")
      })
  };
  return (
    <Stack direction="column" alignItems="center" height="100vh" padding="20px">
      <Stack
        width={width < 650 ? "100%" : "80%"}
        direction="column"
        height="100%"
        alignItems="center"
        gap="20px"
      >
        <Header user={user} />
        <Stack
          width="100%"
          gap="20px"
          height="820px"
          borderRadius="11px"
          boxShadow="0px 4px 11px 4px rgba(111, 111, 111, 0.15)"
          justifyContent="center"
          alignItems="center"
        >
          <img
            style={{ width: width < 650 ? "60%" : "30%" }}
            src="https://s3-alpha-sig.figma.com/img/073e/0c13/6102dd539abec62af344d8a21089ed37?Expires=1699833600&Signature=qRCTS7~zkpHVgZ8SbqgBxBvuzJuPhnsOkxi19RAvW0OtIdwCbDD4FCSu2zA6JuI2fqZirGu9Hr6PPuKZuyeFKE8PjSLYyXtJxtmeTxABPQ7e4Q13t1-PATYfzw9P~QCv1h-fYf2NwJ9038ZiFNwOSMSuCtik1ABgn44ucyfR3FBpYrMOV07bpDIR04V6AXxKM18z6~CkI1aD5gHeise44nilpoZ5Y-S-99H-m3w1346Pb5bbxAsqGupSRKRHgkmm17RReSV5N9HZrbDknl2Ra2~pkhEBSBOErPoLbWp-gzlkIycPb1N3ot1NXcfRfz5bHZrgdfnTfyLTe7LGGQ8usg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt=""
          />
          <p style={{ fontSize: "20px", color: " #187163", fontWeight: "700" }}>
            Payment Successful
          </p>
          <Button
            onClick={handleSuccess}
            style={{ background: "#187163", color: "white", width: "150px" }}
          >
            Done
          </Button>
        </Stack>
        <Stack marginTop="auto" width="100%">
          <Footer />
        </Stack>
      </Stack>
    </Stack>
  );
}
