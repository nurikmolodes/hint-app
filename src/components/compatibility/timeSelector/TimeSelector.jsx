import "./TimeSelector.scss";
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

const getDatePickerValues = () => {
  const options = {
    days: [],
    years: [],
    months: [],
  };

  options.years = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ];
  console.log(options);
  return options;
};

export default function TimeSelector({ getTime }) {
  const [pickerOptions, setPickerOptions] = useState({
    ...getDatePickerValues(),
    days: [0, 1],
    // days: getDays(startDate.get("year"), startDate.get("month"))
  });

  const [selectedValues, setSelectedValues] = useState({
    years: 2021,
    days: 1,
    months: ["AM"],
  });
  const applyDate = () => {
    getTime(`${selectedValues.days}:${selectedValues.years} ${selectedValues.months}`);
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
        ...getDatePickerValues(),
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        months: ["AM", "PM"],
      });
      console.log(pickerOptions);
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
