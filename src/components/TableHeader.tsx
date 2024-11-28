/* Component FNC **************************************************************/
export default function TableHeader({ headers }: { headers: string[] }): JSX.Element {
  /* Jsx **********************************************************************/
  return (
    <thead className="table__header">
      <tr>
        {headers.map((header) => (
          <th key={header}>{header.toUpperCase()}</th>
        ))}
      </tr>
    </thead>
  );
}
