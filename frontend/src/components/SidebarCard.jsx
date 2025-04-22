import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from "@/components/ui/card";

export default function SidebarCard({teacherName, teacherClass}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>¡Bienvenido {teacherName}!</CardTitle>
        <Separator />
        <CardDescription>
          <div className="text-sm h-6 flex items-center space-x-4">
            <Badge variant="outline">Maestro</Badge>
            <Separator orientation="vertical" />
            <Badge variant="outline">{teacherClass}</Badge>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}