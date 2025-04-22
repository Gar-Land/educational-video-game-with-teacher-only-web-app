import {useState} from "react";
import {Navigate} from "react-router-dom";

import StudentCard from "@/components/StudentCard";
import StudentStats from "@/components/StudentStats";
import SearchBar from "@/components/SearchBar";

export default function Student() {
  const [studentId, setStudentId] = useState("");
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {setStudentId(e.target.value)};

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    fetch(`http://localhost:3000/teachers/search/students?studentId=${studentId}`, {
      method: "GET",
      headers: {"Authorization": localStorage.getItem("jwt")}
    })
    .then(res => {
      if (!res.ok)
        throw Error("Coulnt' fetch the data");
      return res.json()
    })
    .then(data => {
      setData(data);
      setIsPending(false);
      setError(null);
    })
    .catch(error => {
      setIsPending(false);
      setError(error.message);
      console.log(error);
    });
  }

  if (!localStorage.getItem("jwt"))
    return (<Navigate to="/accounts/log-in" replace={true} />);
  
  return (
    <div className="w-full flex-col justify-start items-start">
      <SearchBar 
        placeholder="Matrícula" 
        handleSubmit={handleSubmit} 
        handleChange={handleChange} 
      />
      {data && (
        <>
          <StudentCard student={data.student} />
          <StudentStats matches={data.matches}/>
        </>
      )}
    </div>
  );  
}