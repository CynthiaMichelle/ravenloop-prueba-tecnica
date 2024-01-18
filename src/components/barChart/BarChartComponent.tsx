import React from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);

interface BarChartProps {
  data: { [key: string]: number };
}

const BarChartComponent: React.FC<BarChartProps> = ({ data }) => {
  const months = Object.keys(data);
  const values = Object.values(data);

  const option = {
    title: {
      text: "Visitas Mensuales",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: months,
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    series: [
      {
        type: "bar",
        data: values,
        itemStyle: {
          color: "#3498db",
        },
      },
    ],
  };

  return (
    <div className="container">
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
        opts={{}}
      />
    </div>
  );
};

export default BarChartComponent;
