import {useNavigate} from "react-router-dom";
import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, 
  AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";

export default function LogoutAlert() {
  const navigate = useNavigate();

  const handleClick = () => {
    fetch("http://localhost:3000/accounts/teachers/log-out", {
      method: "POST",
      headers: {
        "ContentType": "application/json",
        "Authorization": localStorage.getItem("jwt")
      }
    })
    .then(res => {
      if (!res.ok)
        throw Error("Couldn't log out");

      localStorage.removeItem("jwt");
      return navigate("/");
    })
    .catch(error => console.log(error));
  };
 
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="ghost">
          <LogOut /> Cerrar sesión
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Estás a punto de cerrar sesión en este dispositivo.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleClick}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}