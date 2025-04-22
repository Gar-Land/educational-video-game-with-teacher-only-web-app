import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { 
  Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

export default function LogIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  // const [isPending, setIsPending] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState, 
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsPending(true);

    fetch("http://localhost:3000/accounts/teachers/log-in", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    })
    .then(res => {
      if (!res.ok) {
        navigate("/accounts/log-in");
        throw Error("Couldn't validate credentials");
      }
      return res.json();
    })
    .then(({newToken}) => {
      // setIsPending(false);
      localStorage.setItem("jwt", `Bearer ${newToken}`);
      navigate("/teachers/matches");
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div>
      <h1 className="font-bold text-6xl w-[75vw] mx-auto">
        Inicia sesió
        <span className="font-bold text-6xl text-transparent bg-gradient-to-r 
        from-blue-500 to-green-400 bg-clip-text">n</span>
      </h1>

      <Card className="w-[75vw] min-h-[60vh] mx-auto my-15" >
        <CardHeader>
          <CardTitle>Para ustedes profesores 👨‍🏫</CardTitle>
          <CardDescription>
            ¡Inicie sesión aquí! Haga click en <Badge>Iniciar sesión</Badge> 
            cuando termine 😁
          </CardDescription>
        </CardHeader>

        <CardContent className="my-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-10">
            <div className="space-y-3">
              <Label htmlFor="email">Email:</Label>
              <Input onChange={handleChange} name="email" id="email" type="email" required />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password">Contraseña:</Label>
              <Input onChange={handleChange} name="password" id="password" type="password" required />
            </div>
            <Button className="w-[20%]">Iniciar sesíon</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}