import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import * as Styles from "./style";

const TextTable = Styles.TextTable;
export default function DataTable({ data }: { data: any[] }) {
  // Verifica se há dados para exibição
  if (data.length === 0) {
    return <div>Nenhumm Evento Cadastrado</div>;
  }

  // Obtém as chaves do primeiro objeto para usar como cabeçalhos dinâmicos
  const headers = Object.keys(data[0]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header}><TextTable>{header}</TextTable></TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((rowData, rowIndex) => (
          <TableRow key={rowIndex}>
            {headers.map((header) => (
              <TableCell key={header}>
                <TextTable>{rowData[header]}</TextTable>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}