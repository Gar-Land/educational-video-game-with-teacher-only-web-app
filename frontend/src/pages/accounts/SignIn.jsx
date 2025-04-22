import { 
  Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter 
} from "@/components/ui/card";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";

import TeacherSignInForm from "@/components/TeacherSignInForm";
import StudentSignInForm from "@/components/StudentSignInForm";

export default function SignIn() {

  return (
    <div>
      <h1 className="text-6xl font-bold w-[75vw] mx-auto">
        Regístrat
        <span className="text-6xl font-bold text-transparent bg-gradient-to-r 
        from-blue-500 to-green-400 bg-clip-text">e</span>
      </h1>

      <Tabs defaultValue="student" className="w-[75vw] mx-auto mt-15">
        <TabsList className=" w-full grid grid-cols-2">
          <TabsTrigger value="teacher">¿Eres profesor? 👨‍🏫</TabsTrigger>
          <TabsTrigger value="student">¿Eres alumno? 👨‍🎓</TabsTrigger>
        </TabsList>

        <TabsContent value="teacher">
          <Card>
            <CardHeader>
              <CardTitle>Regístrate como profesor 👨‍🏫</CardTitle>
              <CardDescription>
                ¡Regístrese aquí! Haga click en <Badge>Registrarse</Badge> cuando termine 😁
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <TeacherSignInForm />
            </CardContent>         
          </Card>
        </TabsContent>

        <TabsContent value="student">
          <Card>
            <CardHeader>
              <CardTitle>Regístrate como alumno 👨‍🎓</CardTitle>
              <CardDescription>
                ¡Regístrate aquí! Has click en <Badge>Registrarse</Badge> cuando termines 😁
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <StudentSignInForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}