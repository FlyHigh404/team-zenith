import { getUserData, getLastLogin } from '../utils/token'

const Chart = () => {
  const userData = getUserData()
  const lastLogin = getLastLogin()
  return (
    <div className="mt-5 mx-5 flex gap-4">
      <div className="w-[70%] bg-white p-5 rounded-xl ">
        <p className="font-semibold">Total Pekerjaan</p>
        <p>Chart BAR Pekerjaan</p>
      </div>
      <div className="w-[30%] bg-white p-5 rounded-xl ">
        <p className="font-semibold mb-3">Riwayat Aktivitas</p>
        <div>
          <p>Created At:</p>
          <p className="pb-3">{userData.createdAt.toString().slice(0, 10)}</p>
          <p>Last Login:</p>
          <p>{lastLogin.toString().slice(0, 10) + ' - ' + lastLogin.toString().slice(11, 19)}</p>
        </div>
      </div>
    </div>
  )
}

export default Chart
