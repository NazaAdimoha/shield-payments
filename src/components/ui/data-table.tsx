"use client";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import React from "react";

interface DataTableProps<TData extends object> {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  metadata: {
    currentPage: number
    totalPages: number
  }
  onPageChange: (page: number) => void
  onRowClick?: (row: TData) => void
}

export function DataTable<TData extends object>({
  data,
  columns,
  metadata,
  onPageChange,
  onRowClick,
}: DataTableProps<TData>) {
  const { isMobile } = useMediaQuery()
  const [currentPage, setCurrentPage] = React.useState(metadata.currentPage)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    onPageChange(newPage)
  }

  if (isMobile) {
    return (
      <div className="space-y-4">
        {data.map((row, idx) => (
          <div
            key={idx}
            className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow"
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((column) => (
              <div key={column.id} className="flex justify-between py-1">
                <span className="text-gray-500 dark:text-gray-400">
                  {String(column.header)}
                </span>
                <span>
                  {flexRender(
                    column.cell,
                    table.getRowModel().rows[idx].getVisibleCells()[columns.indexOf(column)].getContext()
                  )}
                </span>
              </div>
            ))}
          </div>
        ))}
        
        <Pagination
          currentPage={currentPage}
          totalPages={metadata.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="rounded-md border dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={metadata.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className="text-sm text-gray-700 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  )
}