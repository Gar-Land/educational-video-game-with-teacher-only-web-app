import useFetch from "@/hooks/useFetch"
import {Navigate} from "react-router-dom";
import LevelStats from "@/components/LevelStats";

export default function Level() {
  const {data} = useFetch("http://localhost:3000/teachers/levels");

  if (!localStorage.getItem("jwt"))
    return (<Navigate to="/accounts/log-in" replace={true} />);
  
  return (
    <div className="w-full h-full">
      {data && <LevelStats levels={data.levels} />}
    </div>
  );
}