function Weather() {
  const icons = {
    drizzle: "cloud-showers-heavy",
    clouds: "cloud",
    rain: "cloud-showers-heavy",
    snow: "snowflake",
    clear: "sun",
    thunderstom: "cloud-showers-heavy" };


  const [name, setName] = React.useState("Location");
  const [sys, setSys] = React.useState({});
  const [desc, setDesc] = React.useState("Description");
  const [main, setMain] = React.useState(0);
  const [unit, setUnit] = React.useState("C");
  const [icon, setIcon] = React.useState("");

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      fetch(
      `https://fcc-weather-api.freecodecamp.repl.co/api/current?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`).

      then(res => {
        return res.json();
      }).
      then(data => {
        setName(data.name);
        setSys(data.sys);
        setDesc(data.weather[0].description);
        setMain(data.main.temp);
        setIcon(data.weather[0].main.toLowerCase().replace(/\"/g, ""));
      });
    });
  };

  const valueHandler = () => {
    if (unit == "C") {
      setMain(main * 1.8 + 32);
      setUnit("F");
    } else {
      setMain((main - 32) / 1.8);
      setUnit("C");
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { className: "app" }, /*#__PURE__*/
    React.createElement("div", { className: "info" }, /*#__PURE__*/
    React.createElement("div", { className: "location" },
    name, ", ", sys.country), /*#__PURE__*/

    React.createElement("div", { className: "weather-description" }, desc), /*#__PURE__*/
    React.createElement("div", { className: "temperature" }, /*#__PURE__*/
    React.createElement("div", { className: "temperature-value" }, Math.floor(main)), /*#__PURE__*/
    React.createElement("div", { className: "temperature-degree" }, "\xB0")), /*#__PURE__*/

    React.createElement("div", { className: "icon" }, /*#__PURE__*/
    React.createElement("i", { className: `fas fa-${icons[icon] || icons.clouds}` }))), /*#__PURE__*/


    React.createElement("div", { className: "temperature-type" }, /*#__PURE__*/
    React.createElement("div", { className: "app-description" }, "Current weather"), /*#__PURE__*/
    React.createElement("div", { className: "temperature-unit", onClick: valueHandler }, "\xB0",
    unit)))));





}

ReactDOM.render( /*#__PURE__*/React.createElement(Weather, null), document.getElementById("root"));