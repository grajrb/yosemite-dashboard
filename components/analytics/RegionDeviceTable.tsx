import type { RegionDeviceRecord } from "@/types/analytics";

type RegionDeviceTableProps = {
  data: RegionDeviceRecord[];
};

export function RegionDeviceTable({ data }: RegionDeviceTableProps) {
  return (
    <div className="panel p-5">
      <h3 className="section-title mb-3 dark:text-slate-100">Region / Device Breakdown</h3>
      <table className="data-table text-left">
        <thead>
          <tr>
            <th>Region</th>
            <th>Device</th>
            <th className="text-right">Users</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={`${row.region}-${row.device}`}>
              <td className="text-slate-700 dark:text-slate-300">{row.region}</td>
              <td className="text-slate-700 dark:text-slate-300">{row.device}</td>
              <td className="text-right font-medium text-slate-900 dark:text-slate-100">
                {row.users.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
