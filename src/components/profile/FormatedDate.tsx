import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";

dayjs.extend(relativeTime);
dayjs.locale("id");

const FormatedDate = ({ date } : { date : string | Date  }) => {

    const d = dayjs(date)

  // if (dayjs().diff(d, "month") >= 1) {
    return d.format("DD/M/YYYY/HH:mm"); 
  // }
  // return d.fromNow(); 
}

export default FormatedDate