import "./DateSelector.scss";
import Picker from "react-mobile-picker-scroll";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDatePickerValues = (startDate, endDate) => {
  const options = {
    days: [],
    months: [],
    years: [],
  };

  const yearsDiff = Math.abs(dayjs(startDate).diff(endDate, "years"));
  for (let i = 0; i <= yearsDiff; i++) {
    let currentDate = dayjs(startDate).add(i, "year");
    options.years.push(currentDate.get("year"));
  }

  let currentDate = startDate.date(1);
  for (let i = 0; currentDate <= endDate.date(1); i++) {
    currentDate = dayjs(startDate).add(i, "month");

    if (currentDate <= endDate) {
      let monthIndex = currentDate.get("month");
      const month = monthList[monthIndex];
      !options.months.includes(month) && options.months.push(month);
    }
  }

  // console.log(options.months);
  return options;
};

const getLastDayOfMonth = (year, month) => {
  const lastDay = daysInMonth(year, month);
  return lastDay < 10 ? `0${lastDay}` : lastDay;
};
function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

const getMonths = (year, minDate, maxDate) => {
  const months = [];

  let firstDate = dayjs().year(year).month(0).date(1);
  if (firstDate < minDate) {
    firstDate = minDate;
  }

  let lastDate = dayjs().year(year).month(11).date(31);
  if (lastDate > maxDate) {
    lastDate = maxDate;
  }

  let currentDate = firstDate;

  for (let i = 0; currentDate <= lastDate; i++) {
    currentDate = dayjs(firstDate).add(i, "month");
    if (currentDate <= lastDate) {
      let monthIndex = currentDate.get("month");
      const month = monthList[monthIndex];
      months.push(month);
    }
  }

  console.log({ months });
  return months;
};

const getDays = (year, month, minDate, maxDate) => {
  const formattedMonth = month < 10 ? `0${month}` : month;
  const days = [];
  let startDate = dayjs(`${year}-${formattedMonth}-01T16:00:00.000Z`);
  if (startDate < minDate) {
    startDate = minDate;
  }

  const lastDay = getLastDayOfMonth(year, month);
  let endDate = dayjs(`${year}-${formattedMonth}-${lastDay}T16:00:00.000Z`);

  if (endDate > maxDate) {
    endDate = maxDate;
  }

  const daysDiff = Math.abs(dayjs(startDate).diff(endDate, "days", true));
  for (let i = 0; i <= daysDiff; i++) {
    let currentDate = dayjs(startDate).add(i, "day");
    const day = currentDate.get("date");
    days.push(day);
  }
  console.log(days);
  return days;
};

export default function DateSelector({ getDate }) {
  const startDate = dayjs("1900-04-01T16:00:00.000Z");
  const endDate = dayjs("2030-08-09T16:00:00.000Z");

  const [pickerOptions, setPickerOptions] = useState({
    ...getDatePickerValues(startDate, endDate),
    days: [0, 1],
    // days: getDays(startDate.get("year"), startDate.get("month"))
  });

  const [selectedValues, setSelectedValues] = useState({
    days: 1,
    months: monthList[startDate.get("month")],
    years: 2021,
  });
  const applyDate = () => {
    getDate(
      `${selectedValues.years}-${
        selectedValues.months === "January"
          ? "01"
          : selectedValues.months === "February"
          ? "02"
          : selectedValues.months === "March"
          ? "03"
          : selectedValues.months === "April"
          ? "04"
          : selectedValues.months === "May"
          ? "05"
          : selectedValues.months === "June"
          ? "06"
          : selectedValues.months === "July"
          ? "07"
          : selectedValues.months === "August"
          ? "08"
          : selectedValues.months === "September"
          ? "09"
          : selectedValues.months === "October"
          ? "10"
          : selectedValues.months === "November"
          ? "11"
          : selectedValues.months === "December"
          ? 12
          : 0
      }-${selectedValues.days}`,
    );
  };

  // Update the value in response to user picking event
  const handleChange = (name, value) => {
    setSelectedValues({
      ...selectedValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (selectedValues?.years && selectedValues?.months) {
      console.log("year or month changed", new Date().toUTCString());

      // It should be  between 1 and 12
      const monthIndex = monthList.indexOf(selectedValues.months) + 1;

      setPickerOptions({
        ...getDatePickerValues(startDate, endDate),
        days: getDays(selectedValues.years, monthIndex, startDate, endDate),
        months: getMonths(selectedValues.years, startDate, endDate),
      });
    }
  }, [selectedValues?.years, selectedValues?.months, selectedValues?.days]);

  useEffect(() => {
    if (!pickerOptions?.days.includes(selectedValues.days)) {
      setSelectedValues({
        ...selectedValues,
        days: pickerOptions?.days[0],
      });
    }
    console.log(selectedValues);
  }, [pickerOptions]);

  return (
    <div className="selector">
      <Picker
        valueGroups={pickerOptions ? selectedValues : null}
        onChange={handleChange}
        optionGroups={pickerOptions}
      />
      <button onClick={applyDate}>Apply</button>
    </div>
  );
}
