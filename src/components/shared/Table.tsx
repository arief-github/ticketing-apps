"use client";

import {
  Table as ShadcnTable,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableProps = {
  tableHead: string[];
  tableBody: React.ReactNode[];
};

const Table = ({ tableHead, tableBody }: TableProps) => {
  return (
    <ShadcnTable>
      <TableHeader>
        <TableRow>
          {tableHead.map((head) => (
            <TableHead key={head}>{head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{tableBody}</TableBody>
    </ShadcnTable>
  );
};

export default Table;
