"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "@/public/abis/abi.json";

export default function Home() {
  const [provider, setProvider] =
    useState<ethers.providers.JsonRpcProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [students, setStudents] = useState<{ name: string; section: string }[]>(
    []
  );

  useEffect(() => {
    async function loadProviderAndContract() {
      const infuraUrl =
        "https://sepolia.infura.io/v3/2DiCkycqv7iRSBycgAS5S2KoW86";
      const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
      setProvider(provider);

      const contractAddress = "0x2865bbd262cd36f9c2bd06cf2691d0cb018a427e";
      const contractInstance = new ethers.Contract(contractAddress, abi);
      setContract(contractInstance);

      const count = await contractInstance.studentCount();
      setStudentCount(count.toNumber());

      const studentsData = await Promise.all(
        Array.from({ length: count.toNumber() }, (_, i) =>
          contractInstance.getStudent(i + 1)
        )
      );

      console.log(studentsData);
      setStudents(studentsData);
    }

    loadProviderAndContract();
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
