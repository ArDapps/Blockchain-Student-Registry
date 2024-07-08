"use client";
import { useEffect, useState } from "react";
import Web3 from "web3";
import abi from "@/public/abis/abi.json";
export default function Home() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any | null>(null);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [students, setStudents] = useState<{ name: string; section: string }[]>(
    []
  );

  useEffect(() => {
    async function loadWeb3() {
      const web3Instance = new Web3(
        new Web3.providers.HttpProvider(
          "https://sepolia.infura.io/v3/2DiCkycqv7iRSBycgAS5S2KoW86"
        )
      );
      setWeb3(web3Instance);

      const contractInstance = new web3Instance.eth.Contract(
        abi as any,
        "0x2865bbd262cd36f9c2bd06cf2691d0cb018a427e"
      );
      setContract(contractInstance);

      const count = await contractInstance.methods.studentCount().call();
      setStudentCount(count);

      const studentsData = await Promise.all(
        Array.from({ length: count }, (_, i) =>
          contractInstance.methods.getStudent(i + 1).call()
        )
      );

      console.log(studentsData);
      setStudents(studentsData);
    }

    loadWeb3();
  }, []);

  return (
    <div>
      <h1>Student Registry</h1>
      <p>Total Students: {studentCount}</p>
      <ul>
        {students &&
          students.map((student, index) => (
            <li key={index}>
              Name: {student.name}, Section: {student.section}
            </li>
          ))}
      </ul>
    </div>
  );
}
