"use client";

export default function DataTable({
  columns,
  data,
  actions,
  emptyText = "Tidak ada data.",
  rowKey = "id",
}) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-100 bg-white">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-base">
            {columns.map((col) => (
              <th key={col.key} className={col.thClass || "px-5 py-3"}>
                {col.title}
              </th>
            ))}
            {actions && <th className="px-5 py-3">Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr
                key={row[rowKey] || idx}
                className="border-b hover:bg-gray-50 transition"
              >
                {columns.map((col) => (
                  <td key={col.key} className={col.tdClass || "px-5 py-3"}>
                    {typeof col.render === "function"
                      ? col.render(row, idx)
                      : row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-5 py-3 flex gap-2">
                    {actions.map((action, i) => action(row, idx))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-10 text-gray-400 text-lg"
              >
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
