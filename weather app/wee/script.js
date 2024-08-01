const dateee = document.getElementById("date");
const tempppp = document.getElementById("temp");
const weathercon = document.getElementById("weathercon");

// create a function get current day........

const getcurrentDay = () => {
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //   const d = new Date();
  //   let day = weekday[d.getDay()];
  const now = new Date();
  return weekday[now.getDay()];
  //   return date;
};

const getcurrentTime = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let now = new Date();
  let year = now.getFullYear();
  let date = now.getDate();
  let month = months[now.getMonth()];
  let hour = now.getHours();
  let minute = now.getMinutes();

  let perios = "AM";

  if (hour > 11) {
    perios = "PM";
    if (hour > 12) hour -= 12;
  }
  if (minute < 10) {
    minute = "0" + mi;
  }

  // console.log(date + "/" + month);

  return `${date} ${month} ${hour}:${minute} ${perios}`;
};
dateee.innerHTML = getcurrentDay() + " | " + getcurrentTime();
// getcurrentDay();
