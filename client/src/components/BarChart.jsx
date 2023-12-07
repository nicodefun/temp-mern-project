import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartJSX = ({data}) => {
  return    <ResponsiveContainer width="100%" height={300}>
  <BarChart margin={{top:50}} data={data}>
    <CartesianGrid strokeDasharray='3 3'/>
    <XAxis dataKey='date'/>
    <YAxis allowDecimals={false}/>
    <Tooltip/>
    <Bar dataKey="count" fill="#8884d8" barSize={75}/>
  </BarChart>
</ResponsiveContainer>
};
export default BarChartJSX;
