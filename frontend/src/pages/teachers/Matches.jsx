import useFetch from "@/hooks/useFetch";
import {Navigate} from "react-router-dom";
import DemoPage from "@/components/matches/page";

export default function MatchesTable() {  
  const {data} = useFetch("http://localhost:3000/teachers/matches");

  if (!localStorage.getItem("jwt"))
    return (<Navigate to="/accounts/log-in" replace={true} />);

  return (
    <div className="w-full h-full">
      {data && <DemoPage matches={data.matches}/>}
    </div>
  );
}