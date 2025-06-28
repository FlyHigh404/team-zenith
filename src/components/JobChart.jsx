import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const ChartTotalPekerjaan = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="perusahaan" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Bar dataKey="total" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
)

export default ChartTotalPekerjaan
