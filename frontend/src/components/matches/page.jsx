import {columns} from "@/components/matches/columns";
import {DataTable} from "@/components/matches/data-table";
// page será un server commponent y es donde 
// recuperaremos datos y renderizar nuestra tabla

export default function DemoPage({matches}) {
  return (
    <div className="mx-auto container">
      <DataTable columns={columns} data={matches} />
    </div>
  );
}