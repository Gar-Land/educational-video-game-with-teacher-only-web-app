import {Separator} from "@/components/ui/separator";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from "@/components/ui/card";

export default function StudentCard({student}) {
  const { 
    name, firstSurname, secondSurname, 
    studentId, classId, joinedAt 
  } = student;
  const date = new Date(joinedAt).toLocaleDateString("sp-MX", { 
    year: "numeric", 
    month: "short", 
    day: "numeric" 
  });

  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle className="h-6 flex gap-x-1">
          Nombre: {name} {firstSurname} {secondSurname}
          <Separator orientation="vertical" />
          Matrícula: {studentId.toUpperCase()}
          <Separator orientation="vertical" />
          Grupo: {classId}
        </CardTitle>
        <CardDescription className="leading-none">
          Se unió el {date}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}