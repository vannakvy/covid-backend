import React, { useState, useEffect } from "react";

import "./CovidScreen.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

import {
  provinceData,
  districtData,
  communeData,
  villageData,
  genderData,
} from "../context/headerContext";
import { ListSelect } from "../static/own-comp";
import {
  convertToCommune,
  convertToDistrict,
  convertToVillage,
} from "../function/fn";
import InfoBox from "../component/covideComponents/InfoBox";
import LineGraph from "../component/covideComponents/LineGraph";
import Table from "../component/covideComponents/Table";
import { sortData, prettyPrintStat } from "../component/covideComponents/util";
import numeral from "numeral";
import Map from "../component/covideComponents/Map";
import "leaflet/dist/leaflet.css";
import { Form } from "antd";

const MapScreen = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [district, setDistrict] = useState("");
  let [form] = Form.useForm();

  const setToDistrictFn = (e) => {
    form.setFieldsValue({
      district: e,
      commune: null,
      village: null,
    });
    setDistrict(e);
    // setCommune("")
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data,"ddd");
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          console.log(data,"ddddd")
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (c) => {
    const countryCode = c;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
        console.log([data.countryInfo.lat, data.countryInfo.long]);
      });
  };

  function lower(obj) {
    for (var prop in obj) {
      if (typeof obj[prop] === "string") {
        obj[prop] = obj[prop].toLowerCase();
      }
      if (typeof obj[prop] === "object") {
        lower(obj[prop]);
      }
    }
    return obj;
  }

  countries.forEach((c) => {
    lower(c);
  });

  const newCounties = countries.map((contry) => ({
    key: contry.value,
    value: contry.value,
    flag: contry.value,
    text: contry.name,
  }));

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1 className="ti">តារាងតាមដាន កូវិត ១៩ </h1>
          <FormControl className="app__dropdown">
   
            <Form.Item 
              name="district"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <ListSelect
                type={0}
                data={convertToDistrict(districtData)}
                title="ស្រុក/ខណ្ឌ"
                setValue={setToDistrictFn}
              />
            </Form.Item>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="ករណីឆ្លង "
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="ចំនួនជាសះស្បើយ"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="ចំនួនអ្នកស្លាប់"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="ករណីឆ្លង "
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="ចំនួនជាសះស្បើយ"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3 className="covid_table">ករណីឆ្លងតាមប្រទេស</h3>
            <Table countries={tableData} />
            {casesType === "recovered" ? (
              <h3>ករណីជាសះស្បើយ ទូទាំងពិភពលោក</h3>
            ) : null}
            {casesType === "deaths" ? <h3>ករណីស្លាប់ ទូទាំងពិភពលោក</h3> : null}
            {casesType === "cases" ? <h3>ករណីឆ្លង ទូទាំងពិភពលោក</h3> : null}
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapScreen;
