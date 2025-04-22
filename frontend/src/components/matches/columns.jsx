import {Link} from "react-router-dom";
import {MoreHorizontal, ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
// columns es un client component y contendrá todas 
// las definiciones de nuestras columnas.
//
// Columns es donde definirás el núcleo de cómo lucirá
// tu tabla. Definirán los datos que serán desplegados
//, cómo serán formateados, almacenados y filtrados

export const columns = [
  {
    accessorKey: "studentId",
    header: "Matrícula",
    cell: ({row}) => {
      const formattedId = row.getValue("studentId").toUpperCase();
      return formattedId;
    }
  },
  {
    accessorKey: "name",
    header: "Nombre"
  },
  {
    accessorKey: "gender",
    header: "Género"
  },
  {
    accessorKey: "level",
    header: "Nivel"
  },
  {
    accessorKey: "score",
    header: ({column}) => {
      return (
        <Button 
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Puntaje
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    }
  },
  {
    accessorKey: "status",
    header: "Estatus"
  },
  {
    accessorKey: "playedAt",
    header: () => <div className="text-right">Fecha</div>,
    cell: ({row}) => {
      const date = new Date(row.getValue("playedAt"));
      const stringDate = date.toLocaleDateString("sp-MX", {
        month: "short", day: "numeric", year: "numeric"
      });

      return(<div className="text-right font-medium">{stringDate}</div>);
    }
  },
  {
    id: "actions",
    cell: ({row}) => {
      const match = row.original;
      // Puedes acceder a a los datos de la fila usando row.original
      // en la función cell

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(match.studentId)}
            >
              Copiar matrícula
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/teachers/search/students">
                Ver alumno
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

