import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  AreaChart,
} from 'recharts';
import '../assets/css/adminDashboard.css';

export default function ChartComponent() {
  let [data, setData] = useState([
    {
      name: 'Q1',
      New_Interests: 900,
      All_Students: 400,
      Paused: 550,
      Stopped: 300,
      Completed: 200,
    },
    {
      name: 'Q2',
      New_Interests: 200,
      All_Students: 1000,
      Paused: 210,
      Stopped: 300,
      Completed: 200,
    },
    {
      name: 'Q3',
      New_Interests: 400,
      All_Students: 800,
      Paused: 890,
      Stopped: 500,
      Completed: 900,
    },
    {
      name: 'Q4',
      New_Interests: 585,
      All_Students: 908,
      Paused: 2000,
      Stopped: 300,
      Completed: 200,
    },
  ]);
  let [IncomeData, setIncomeData] = useState([
    {
      IncomeName: 'Q1',
      Income: '550000',
    },
    {
      IncomeName: 'Q2',
      Income: '9500000',
    },
    {
      IncomeName: 'Q3',
      Income: '550000',
    },
    {
      IncomeName: 'Q4',
      Income: '490000',
    },
  ]);
  const Barcolorsbg = {
    New_Interests: '#80B8CD',
    All_Students: '#00AFEF',
    Paused: '#FFB906',
    Stopped: '#FF0000',
    Completed: '#2DB563',
  };
  let [BarDataKeys, setBardataKeys] = useState('New_Interests');
  let [BarColors, setBarcolors] = useState(Barcolorsbg.New_Interests);
  let [summaryDesc, setSummarydesc] = useState('New Interests');
  let summary = summaryDesc.replace('_', ' ');
  let [IncomeDataKeys, setIncomeDataKeys] = useState('Income');

  const handleAllStudents = () => {
    setBardataKeys('All_Students');
    setBarcolors(Barcolorsbg.All_Students);
    setSummarydesc('All_Students');
  };

  const handleNewInterests = () => {
    setBardataKeys('New_Interests');
    setBarcolors(Barcolorsbg.New_Interests);
    setSummarydesc('New_Interests');
  };
  const handlePaused = () => {
    setBardataKeys('Paused');
    setBarcolors(Barcolorsbg.Paused);
    setSummarydesc('Paused');
  };
  const handleStopped = () => {
    setBardataKeys('Stopped');
    setBarcolors(Barcolorsbg.Stopped);
    setSummarydesc('Stopped');
  };

  const handleCompleted = () => {
    setBardataKeys('Completed');
    setBarcolors(Barcolorsbg.Completed);
    setSummarydesc('Completed');
  };
  return (
    <div
      className="row justify-content-between"
      style={{
        textAlign: 'center',
        width: '98%',
        margin: '0 auto',
      }}
    >
      {' '}
      <div
        className="col col-sm-12 col-md-6 col-lg-6 mt-4  "
        style={{ borderRadius: '24px', width: '40%' }}
      >
        {' '}
        <div className="card shadow pt-2 pe-4">
          <div className="row">
            {' '}
            <div className="col col-sm-9 col-md-9 col-lg-9 py-3">
              <BarChart width={400} height={250} data={data}>
                <XAxis
                  dataKey="name"
                  padding={{ top: 20 }}
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: '15px',
                    color: 'black',
                  }}
                />
                <YAxis
                  tickCount="5"
                  type="number"
                  domain={[0, (dataMax) => dataMax + 100]}
                  padding={{ bottom: 20 }}
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: '15px',
                    color: 'black',
                  }}
                />
                <Tooltip style={{ marginTop: '30px' }} />
                {/* <Legend /> */}
                <Bar dataKey={BarDataKeys} fill={BarColors} />;
              </BarChart>
              <p className="barSummary">Summary of {summary} per quarter</p>
            </div>
            <div
              className="col col-sm-3 col-md-3 col-lg-3 mt-4 pt- ae_chart_category"
              style={{ borderLeft: '1px dashed rgba(0, 0, 0, 0.22)' }}
            >
              <h4>Student Category</h4>
              <p>Tap on category to switch chart</p>
              <div>
                <div
                  onClick={handleNewInterests}
                  className="ae_admin_category_con d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center">
                    {' '}
                    <div
                      className="ae_admin_dash_chart_circle"
                      style={{
                        backgroundColor: `${Barcolorsbg.New_Interests}`,
                      }}
                    ></div>
                    <div className="ae_admin_chart_category ml-1">
                      New Interests
                    </div>
                  </div>
                  <div className="ae_admin_chart_category ae_admin_chart_num">
                    145
                  </div>
                </div>
                <div
                  onClick={handleAllStudents}
                  className="ae_admin_category_con d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center">
                    {' '}
                    <div
                      className="ae_admin_dash_chart_circle"
                      style={{ backgroundColor: `${Barcolorsbg.All_Students}` }}
                    ></div>
                    <div className="ae_admin_chart_category ml-1">
                      All Students
                    </div>
                  </div>
                  <div className="ae_admin_chart_category ae_admin_chart_num">
                    45
                  </div>
                </div>
                <div
                  onClick={handlePaused}
                  className="ae_admin_category_con d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center">
                    {' '}
                    <div
                      className="ae_admin_dash_chart_circle"
                      style={{ backgroundColor: `${Barcolorsbg.Paused}` }}
                    ></div>
                    <div className="ae_admin_chart_category ml-1">Paused</div>
                  </div>
                  <div className="ae_admin_chart_category ae_admin_chart_num">
                    15
                  </div>
                </div>
                <div
                  onClick={handleStopped}
                  className="ae_admin_category_con d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center">
                    {' '}
                    <div
                      className="ae_admin_dash_chart_circle"
                      style={{ backgroundColor: `${Barcolorsbg.Stopped}` }}
                    ></div>
                    <div className="ae_admin_chart_category ml-1">Stopped</div>
                  </div>
                  <div className="ae_admin_chart_category ae_admin_chart_num">
                    9
                  </div>
                </div>
                <div
                  onClick={handleCompleted}
                  className="ae_admin_category_con d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center">
                    {' '}
                    <div
                      className="ae_admin_dash_chart_circle"
                      style={{ backgroundColor: `${Barcolorsbg.Completed}` }}
                    ></div>
                    <div className="ae_admin_chart_category ml-1">
                      Completed
                    </div>
                  </div>
                  <div className="ae_admin_chart_category ae_admin_chart_num">
                    9
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col col-sm-12 col-md-6 col-lg-6 mt-4"
        style={{
          textAlign: 'center',
          width: '40%',
          margin: '0 auto',
          borderRadius: '24px',
        }}
      >
        <div className="card shadow pt-4">
          <AreaChart
            width={550}
            height={267}
            data={IncomeData}
            margin={{
              top: 5,
              right: 10,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="IncomeName"
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: '15px',
                color: 'black',
              }}
            />
            <YAxis
              tickCount="5"
              type="number"
              domain={[0, 10000000]}
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: '15px',
                color: 'black',
              }}
            />
            <Tooltip />
         
            <Area
              type="monotone"
              dataKey="Income"
              fill="#00A15E"
              dot={{ stroke: '#00AFEF', strokeWidth: 2 }}
            />
            
          </AreaChart>
 <p className="barSummary">Summary of quarterly Income</p>
        </div>
      </div>
    </div>
  );
}
