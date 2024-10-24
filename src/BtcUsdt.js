import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

 const BtnUsdt = () => {

    const [data, setData] = useState([])


    const day = ["Day", "", "", "", ""]
      
      useEffect(() => {
                const fetchData = async () => {
                  try {
                    const response = await axios.get(
                      'https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=100'
                    );
                    const formattedCandles = response.data.map((candle) => ([
                      new Date(candle[0]),
                      parseFloat(candle[2]),
                      parseFloat(candle[1]),
                      parseFloat(candle[4]),
                      parseFloat(candle[3]),
                    ]));
                    formattedCandles.unshift(day)
                    setData(formattedCandles);
                  } catch (error) {
                    console.error('Error fetching data:', error);
                  }
                };
                fetchData();
              }, []);

    const options = {
        legend: "none",
        bar: { groupWidth: "100%" },
        candlestick: {
          fallingColor: { strokeWidth: 0, fill: "#a52714" },
          risingColor: { strokeWidth: 0, fill: "#0f9d58" },
        },
      };

  return (
    <Chart
      chartType="CandlestickChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

export default BtnUsdt

