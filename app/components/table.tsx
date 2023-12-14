import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';



export default function DataTable({ data }: { data: any[] }) {
  // Verifica se há dados para exibição
  if (data.length === 0) {
    return <div>Nenhumm Evento Cadastrado</div>;
  }

  // Obtém as chaves do primeiro objeto para usar como cabeçalhos dinâmicos
  const headers = Object.keys(data[0]);
  let labelsHeader = ["#",
  "Evento",
  "Inicio",
  "Fim",
  "Inscrição"];
  
  let headerCells:any[] = [];
  labelsHeader.forEach((label) => {
    headerCells.push(<TableHeaderCell key={label}>{label}</TableHeaderCell>);
  });

  return (
    <Table>
      <TableHead>
      <TableRow>
          {headerCells}
      </TableRow>
      </TableHead>
      <TableBody>
        {data.map((rowData, rowIndex) => (
          <TableRow key={rowIndex}>
            {headers.map((header) => (
              <TableCell key={header}>
                <Text>{rowData[header]}</Text>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}