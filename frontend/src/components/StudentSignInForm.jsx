import {useState} from "react";
import {
  Select, SelectContent, SelectGroup, SelectTrigger, 
  SelectValue, SelectItem, SelectLabel
} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

export default function StudentSignInForm () {
  const [formData, setFormData] = useState({
    name: "",
    firstSurname: "",
    secondSurname: "",
    ownedByClass: "",
    studentId: ""
  });
  const [gender, setGender] = useState("hombre");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit= (e) => {
    e.preventDefault()
    setIsPending(true);

    fetch("http://localhost:3000/accounts/students/sign-in", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({...formData, gender})
    })
    .then((res) => {
      return res.json();
    })
    .then(({authToken}) => {
      localStorage.setItem("jwt", `Bearer ${authToken}`);
      setIsPending(false);
      setError(null);
    })
    .catch((error) => {
      setIsPending(false);
      setError(error.message);
      console.log(error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2 flex justify-around gap-x-5 space-y-2">
        <div className="w-[33%] flex items-center gap-x-2">
          <Label htmlFor="name">Nombre:</Label>
          <Input onChange={handleChange} name="name" id="name" type="text" required />
        </div>

        <div className="w-[33%] flex items-center gap-x-2">
          <Label htmlFor="firstSurname">Appellido Paterno:</Label>
          <Input onChange={handleChange} name="firstSurname" id="firstSurname" type="text" required />
        </div>

        <div className="w-[33%] flex items-center gap-x-2">
          <Label htmlFor="secondSurname">Appellido Materno:</Label>
          <Input onChange={handleChange} name="secondSurname" id="secondSurname" type="text" required />
        </div>
      </div>

      <div className="my-5 flex flex-row items-center gap-x-2">
        <Label htmlFor="gender">Género: </Label>
        <Select value={gender} onValueChange={setGender} name="gender" id="gender" required>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tu género" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Géneros</SelectLabel>
              <SelectItem value="hombre">Hombre</SelectItem>
              <SelectItem value="mujer">Mujer</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-2 space-y-2">
        <Label htmlFor="ownedByClass">Grupo:</Label>
        <Input onChange={handleChange} id="ownedByClass" name="ownedByClass" tpye="text" required />
      </div>

      <div className="mb-2 space-y-2">
        <Label htmlFor="studentId">Matrícula:</Label>
        <Input onChange={handleChange} id="studentId" name="studentId" type="text" required />
      </div>

      <Button className="mt-4" type="submit">Registrarse</Button>
    </form>
  );
}