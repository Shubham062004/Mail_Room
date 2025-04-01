
import React from "react";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, Eye, Pencil } from "lucide-react";

interface Column {
  header: string;
  accessor: string;
  width?: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  actionColumn?: boolean;
  viewColumn?: boolean;
  onEdit?: (id: string | number) => void;
  onView?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  actionColumn = false,
  viewColumn = false,
  onEdit,
  onView,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-indigo-600 text-white">
          <tr>
            {viewColumn && <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">VIEW</th>}
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
            {actionColumn && <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ACTION</th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {viewColumn && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onView && onView(row.id)}
                    className="text-gray-600 hover:text-indigo-700"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                  {row[column.accessor]}
                </td>
              ))}
              {actionColumn && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onEdit && onEdit(row.id)}
                    className="text-gray-600 hover:text-indigo-700 mr-2"
                  >
                    <Pencil size={18} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-2">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border-gray-300 rounded-md text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-700">
            {startIndex + 1}-{Math.min(endIndex, data.length)} of {data.length}
          </span>
          <div className="flex ml-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronFirst size={18} />
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLast size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
