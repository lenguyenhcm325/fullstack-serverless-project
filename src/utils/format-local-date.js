import moment from "moment-timezone";

const formatLocalDate = (timestamp) => {
  const localTime = moment.utc(timestamp).tz("Europe/Berlin");
  const formattedTime = localTime.format("DD/MM/YYYY");
  return formattedTime;
};
export default formatLocalDate;
