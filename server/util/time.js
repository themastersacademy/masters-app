exports.currentTime = () => {
  try {
    let indianTime = new Date();

    indianTime.setHours(indianTime.getUTCHours() + 5);
    indianTime.setMinutes(indianTime.getUTCMinutes() + 30);
    return indianTime;
  } catch (error) {
    throw error;
  }
};

exports.examStartTime = (date, time) => {
  try {
    const getDate = date.split("/");
    const getTime = time.split(":");

    const date1 = new Date();
    let indianTime = date1.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: false,
    });

    const month = indianTime.split(",")[0].split("/");
    const time1 = indianTime.split(",")[1].split(":");
    const examHours = eval(getTime[0] + 3600000) + eval(getTime[1] * 60000);
    const indianHours =
      eval(time1[0].trim() + 3600000) + eval(time1[1].trim() * 60000);
    if (
      getDate[1] == month[0] &&
      getDate[2] == month[2] &&
      getDate[0] == month[1] &&
      indianHours >= examHours
    )
      return true;
    else return false;
  } catch (error) {
    throw error;
  }
};

exports.examEndTime = (date, time) => {
  try {
    const getDate = date.split("/");
    const getTime = time.split(":");

    const date1 = new Date();
    let indianTime = date1.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: false,
    });
    const month = indianTime.split(",")[0].split("/");
    const time1 = indianTime.split(",")[1].split(":");

    const examHours = eval(getTime[0] + 3600000) + eval(getTime[1] * 60000);
    const indianHours =
      eval(time1[0].trim() + 3600000) + eval(time1[1].trim() * 60000);

    if (
      getDate[1] == month[0] &&
      getDate[2] == month[2] &&
      getDate[0] == month[1] &&
      indianHours <= examHours
    )
      return true;
    else return false;
  } catch (error) {
    throw error;
  }
};

exports.goalValid = (date, time) => {
  try {
    const getDate = date.split("/");
    const getTime = time.split(":");
    const date1 = new Date();
    let indianTime = date1.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: false,
    });
    const month = indianTime.split(",")[0].split("/");
    const time1 = indianTime.split(",")[1].split(":");

    const examHours = eval(getTime[0] + 3600000) + eval(getTime[1] * 60000);
    const indianHours = eval(time1[0].trim() + 3600000) + eval(time1[1].trim() * 60000);

    if (
      eval(getDate[0]) <= eval(month[0]) &&
      eval(getDate[1]) <= eval(month[1]) &&
      eval(getDate[2]) <= eval(month[2])
    ) {
      if (
        eval(getDate[0]) == eval(month[0]) &&
        eval(getDate[1]) == eval(month[1]) &&
        eval(getDate[2]) == eval(month[2])
      ) {
        if (examHours < indianHours) return true;
        else return false;
      } else return true;
    } else return false;
  } catch (error) {
    throw error;
  }
};
