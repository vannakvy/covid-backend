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
  districForMap
} from "../context/headerContext";
import { ListSelect } from "../static/own-comp";
import {
  convertToCommune,
  convertToDistrict,
  convertToVillage,
} from "../function/fn";
import InfoBox from "../component/covideComponents/InfoBox";

import Table from "../component/covideComponents/Table";
import { sortData, prettyPrintStat } from "../component/covideComponents/util";
import numeral from "numeral";
import Map from "../component/covideComponents/Map";
import { joinArray } from "../component/covideComponents/util";
import "leaflet/dist/leaflet.css";
import { Form, Divider } from "antd";
import {
  GET_ALL_PROVINCE,
  GET_DATA_FOR_MAP,
} from "../graphql/dashboardAndReport";
import { useQuery } from "@apollo/client";
import BarChart from "../component/covideComponents/BarChart";
import ImageCovid from '../asset/covid19.png'
import ImageRecover from '../asset/recover.png'
import ImageDeath from '../asset/death.png'
import ImageCure from '../asset/curring.png'
import ImageDirect from '../asset/direct.png'
import ImageNotDirect from '../asset/notdirect.png'
import LineGraph from "../component/covideComponents/LineGraph";
import BarGraph from '../component/covideComponents/BarGraph'
import LineChartTesting from "../component/covideComponents/LineChartTesting";

const MapScreen = () => {
  const districtLatLong = [
    {
      district: "ក្រឡាញ់",
      lat: 13.60472222544493,
      long: 103.45245485053685,
    },
    {
      district: "វ៉ារិន",
      lat: 13.867238663711532,
      long: 103.87715707241854,
    },
    {
      district: "ស្រិស្នំ",
      lat: 13.852238272312373,
      long: 103.53639730433542,
    },
    {
      district: "អង្គរជុំ",
      lat: 13.713723851088394,
      long: 103.67219336284299,
    },
    {
      district: "បន្ទាយស្រី",
      lat: 13.605041870228655,
      long: 103.97859822744759,
    },
    {
      district: "សូទ្រនិគម",
      lat: 13.414442053292065,
      long: 104.10460200711728,
    },
    {
      district: "បាគង",
      lat: 13.303005227138778,
      long: 103.9796463766434,
    },
    {
      district: "ពួក",
      lat: 13.440442720250852,
      long: 103.71973510206098,
    },
    {
      district: "ជីក្រែង",
      lat: 13.232399982258997,
      long: 104.33684532302983,
    },
    {
      district: "ស្វាយលើ",
      lat: 13.698615549661712,
      long: 104.21744370698126,
    },
    {
      district: "អង្គរធំ",
      lat: 13.483410469370508,
      long: 103.87412317588966,
    },
    {
      district: "សៀមរាប",
      lat: 13.364307627357189,
      long: 103.85798154316932,
    },
    {
      district: "ក្រៅសៀមរាប",
      lat: 12.67868906722332,
      long: 105.08204096969567,
    },
  ];

  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 13.3633, lng: 103.8564 });
  const [mapZoom, setMapZoom] = useState(9);
  const [districtInfo, setDistrictInfo] = useState([]);

  //update the data
  const [district, setDistrict] = useState("");
  const [districtDatas, setDistrictDatas] = useState({});
  let [form] = Form.useForm();

  const { loading, error, refetch } = useQuery(GET_ALL_PROVINCE, {
    variables: {
      district: district,
    },
    onCompleted: ({ getAllProvince }) => {
      setDistrictDatas(getAllProvince);
    },
  });

  const { data: dd } = useQuery(GET_DATA_FOR_MAP, {
    onCompleted: ({ getAllDistrictForMap }) => {
      const mapDatas = joinArray(getAllDistrictForMap, districtLatLong);
      setDistrictInfo(mapDatas);
      let sortedData = sortData(mapDatas);
      setTableData(sortedData);
    },
  });

  React.useEffect(() => {
    refetch();
  }, [district]);

  const setToDistrictFn = (e) => {
    form.setFieldsValue({
      district: e,
      commune: null,
      village: null,
    });
    setDistrict(e);
    // setCommune("")
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

  return <>
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <FormControl className="app__dropdown">
            <Form.Item
              name="district"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <ListSelect
                type={0}
                data={convertToDistrict(districForMap)}
                title="ស្រុក/ខណ្ឌ"
                setValue={setToDistrictFn}
              />
            </Form.Item>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="អ្នកវិជ្ជមាន"
            isRed
            active={casesType === "cases"}
            cases={districtDatas.confirmedCaseToday}
            total={numeral(districtDatas.confirmedCase).format("0")}
            ImageShow={ImageCovid}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="អ្នកជាសះស្បើយ"
            active={casesType === "recovered"}
            cases={districtDatas.recoveredToday}
            total={numeral(districtDatas.recovered).format("0")}
            ImageShow={ImageRecover}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="អ្នកស្លាប់"
            isRed
            active={casesType === "deaths"}
            cases={districtDatas.deathToday}
            total={numeral(districtDatas.death).format("0")}
            ImageShow={ImageDeath}
          />
          <InfoBox
            // onClick={(e) => setCasesType("active")}
            title="អ្នកកំពុងសម្រាកព្យាបាល"
            isRed
            // active={casesType === "deaths"}
            cases={districtDatas.confirmedCaseToday - districtDatas.recoveredToday}
            // total={numeral(districtDatas.death).format("0")}
            total={numeral(districtDatas.confirmedCase - districtDatas.recovered).format("0")}
            ImageShow={ImageCure}
          />


          <InfoBox
            // onClick={(e) => setCasesType("cases")}
            title="អ្នកប៉ះពាល់ផ្ទាល់"
            isRed
            // active={casesType === "cases"}
            cases={districtDatas.confirmedCaseToday}
            total={numeral(districtDatas.confirmedCase).format("0")}
            ImageShow={ImageDirect}
          />
          <InfoBox
            // onClick={(e) => setCasesType("recovered")}
            title="អ្នកប៉ះពាល់ប្រយោល"
            // active={casesType === "recovered"}
            cases={districtDatas.recoveredToday}
            total={numeral(districtDatas.recovered).format("0")}
            ImageShow={ImageNotDirect}
          />
          <InfoBox
            // onClick={(e) => setCasesType("deaths")}
            title="ទីតាំងបិទ"
            isRed
            // active={casesType === "deaths"}
            cases={districtDatas.deathToday}
            total={numeral(districtDatas.death).format("0")}
            ImageShow={ImageDeath}
          />
          <InfoBox
            // onClick={(e) => setCasesType("active")}
            title="ទីតាំងបើក"
            isRed
            // active={casesType === "deaths"}
            cases={districtDatas.confirmedCaseToday - districtDatas.recoveredToday}
            // total={numeral(districtDatas.death).format("0")}
            total={numeral(districtDatas.confirmedCase - districtDatas.recovered).format("0")}
            ImageShow={ImageCure}
          />
        </div>
        <Map
          district={districtInfo}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div className="app__right">
        <Card style={{ marginTop: "70px" }}>
          <CardContent>
            <div className="app__information">
              <h3 className="covid_table">អ្នកវិជ្ជមានតាមក្រុង/ស្រុក</h3>
              <Divider />
              <Table district={tableData} />
            </div>
          </CardContent>
        </Card>
        <Card style={{ marginTop: "10px" }}>
          <CardContent>
              <h3>ទិន្នន័យសរុប</h3>
            <BarGraph />
          </CardContent>
        </Card>
        <Card style={{ marginTop: "10px" }}>
          <CardContent>
            {casesType === "recovered" ? (
              <h3>អ្នកជាសះស្បើយ ទូទាំងខេត្ត</h3>
            ) : null}
            {casesType === "deaths" ? <h3>អ្នកស្លាប ទូទាំងខេត្ត</h3> : null}
            {casesType === "cases" ? <h3>អ្នកវិជ្ជមាន ទូទាំងខេត្ត</h3> : null}
            <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </div>
    {/* graph three datasets  */}

    <Divider />
    <div className="graph ">
      <h2 className="covid_table">ក្រាបបង្ហាញស្ថិតិប្រចាំថ្ងៃ</h2>
      <BarChart casesType={casesType} />
      {/* <BarGraph/> */}
      {/* <LineChartTesting/> */}

    </div>
  </>;
};

export default MapScreen;
