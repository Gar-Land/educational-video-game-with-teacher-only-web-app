import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

export default function TeacherSignInForm () {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    firstSurname: "",
    secondSurname: "",
    ownedByClass: "",
    email: "",
    password: ""
  });
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

    fetch("http://localhost:3000/accounts/teachers/sign-in", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    })
    .then((res) => {
      return res.json();
    })
    .then(({authToken}) => {
      localStorage.setItem("jwt", `Bearer ${authToken}`);
      setIsPending(false);
      setError(null);
      navigate("/teachers/matches");
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

      <div className="mb-2 space-y-2">
        <Label htmlFor="ownedByClass">Grupo:</Label>
        <Input onChange={handleChange} name="ownedByClass" id="ownedByClass" type="text" required />
      </div>

      <div className="mb-2 space-y-2">
        <Label htmlFor="email">Email:</Label>
        <Input onChange={handleChange} name="email" id="email" type="email" required />
      </div>

      <div className="mb-2 space-y-2">
        <Label htmlFor="password">Contraseña:</Label>
        <Input onChange={handleChange} name="password" id="password" type="password" required />
      </div>

      <Button className="mt-4" type="submit">Registrarse</Button>
    </form>
  );
}