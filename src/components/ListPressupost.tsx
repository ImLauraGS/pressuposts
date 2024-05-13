import React, { useState, useEffect } from "react";
import { Typography, Card, CardBody, Input } from "@material-tailwind/react";
import { totalApi } from "../services/service";
import { ServiceProps } from "../types/types";

export default function ListPressupost() {
  const totalService = totalApi();
  const [budgets, setBudgets] = useState<ServiceProps[]>([]);
  const [sortedBudgets, setSortedBudgets] = useState<ServiceProps[]>([]);
  const [sortBy, setSortBy] = useState<string>(""); 
  const [searchTerm, setSearchTerm] = useState<string>(""); 

  useEffect(() => {
    totalService.getTotal()
      .then((res) => res.data)
      .then((data) => {
        console.log("Service Data:", data);
        setBudgets(data);
      });
  }, []);

  const sortAlphabetically = () => {
    const sorted = [...budgets].sort((a, b) => a.name.localeCompare(b.name));
    setSortedBudgets(sorted);
    setSortBy("Alfabèticament");
  };

  const sortByDate = () => {
    const sorted = [...budgets].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    setSortedBudgets(sorted);
    setSortBy("Per Data");
  };

  const resetOrder = () => {
    setSortedBudgets([]);
    setSortBy("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };


  const filteredBudgets = (sortedBudgets.length > 0 ? sortedBudgets : budgets).filter(
    (budget) => {
      return budget.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  );

  return (
    <div className="mb-8 flex items-center justify-between gap-8">
      <Typography variant="h5" color="blue-gray">
        Pressupostos en curs
      </Typography>
      <div className="flex items-center justify-end gap-4">
     
        <button onClick={sortAlphabetically} className="btn">
          Ordenar Alfabèticament
        </button>
        <button onClick={sortByDate} className="btn">
          Ordenar per Data
        </button>
        <button onClick={resetOrder} className="btn">
          Reinicialitzar Ordre
        </button>
      </div>
      <div className="flex flex-col items-center justify-between gap-4">
   
        {sortBy && (
          <Typography variant="subtitle1" color="blue-gray">
            Ordenat {sortBy}
          </Typography>
        )}

        <Input
          type="text"
          placeholder="Cercar per nom..."
          onChange={handleSearchChange}
          value={searchTerm}
          className="mt-4"
        />
        {filteredBudgets.map((item, index) => (
          <Card key={index} className="mt-6 w-[50rem] items-end">
            <CardBody className="w-[100%] flex flex-row justify-between items-center">
              <div>
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  {item.name}
                </Typography>
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  {item.date}
                </Typography>
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  {item.email}
                </Typography>
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  {item.phone}
                </Typography>
                <Typography>{item.services.price}</Typography>
              </div>
              <Typography variant="h3" color="blue-gray" className="mb-2">
                {item.services.value}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
