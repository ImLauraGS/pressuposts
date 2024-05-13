import React, { useState, useEffect } from "react";
import { Typography, Card, CardBody, Input, ListItem, Button,ButtonGroup } from "@material-tailwind/react";
import { totalApi } from "../services/service";
import { ServiceProps } from "../types/types";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function ListPressupost() {
  const totalService = totalApi();
  const [budgets, setBudgets] = useState<ServiceProps[]>([]);
  const [sortedBudgets, setSortedBudgets] = useState<ServiceProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortByPriceActive, setSortByPriceActive] = useState<boolean>(false);
  const [sortDirection, setSortDirection] = useState<string>("asc"); 
  const navigate = useNavigate();;

  const handleBudgetClick = (budget) => {
    const url = `/pressupostdetail?name=${budget.name}&email=${budget.email}&phone=${budget.phone}&date=${budget.date}&value=${budget.services.map(service => service.value).join(",")}&total=${budget.budgetTotal}`;
    navigate(url);
  };

  useEffect(() => {
    totalService.getTotal()
      .then((res) => res.data)
      .then((data) => {
        console.log("Service Data:", data);
        setBudgets(data);
      });
  }, []);

  const sortAlphabetically = () => {
    const direction = sortDirection === "asc" ? 1 : -1;
    const sorted = [...budgets].sort((a, b) => direction * a.name.localeCompare(b.name));
    setSortedBudgets(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc"); 
    setSortByPriceActive(false);
  };

  const sortByDate = () => {
    const direction = sortDirection === "asc" ? 1 : -1;
    const sorted = [...budgets].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return direction * (dateA.getTime() - dateB.getTime());
    });
    setSortedBudgets(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortByPriceActive(false);
  };

  const sortPrice = () => {
    const direction = sortDirection === "asc" ? 1 : -1;
    const sorted = [...budgets].sort((a, b) => direction * (a.budgetTotal - b.budgetTotal));
    setSortedBudgets(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortByPriceActive(true);
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
    <div className="mb-8 w-[70rem] mt-16 flex flex-col justify-between gap-8">
      <Typography variant="h2" color="blue-gray">
        Pressupostos en curs:
      </Typography>
      <div className="flex flex-col items-center justify-between gap-4">
        <div className="flex w-full justify-end gap-4">
          <div className="w-full md:w-72">
            <Input
                label="Cercar per nom..."
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                type="text"
                onChange={handleSearchChange}
                value={searchTerm}
              />
          </div>

        <ButtonGroup variant="text">
        <Button onClick={sortAlphabetically} className="btn">
          Nom
        </Button>
        <Button onClick={sortByDate} className="btn">
          Data
        </Button>
        <Button onClick={sortPrice} className="btn">
          Import
        </Button>
        </ButtonGroup>
      </div>

        {filteredBudgets.map((item, index) => (
          <Card key={index} className="mt-6 w-full bg-deep-purple-50 items-start" onClick={() => handleBudgetClick(item)} >
            <CardBody className="w-[100%] flex flex-row justify-between align-top">
              <div className="flex flex-col justify-start">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  {item.name}
                </Typography>
                <Typography variant="h6"  className="mb-2 font-normal">
                  {item.email}
                </Typography>
                <Typography variant="h6" className="mb-2 font-normal">
                  {item.phone}
                </Typography>
                <Typography variant="h6" className="mb-2 font-normal">
                  Data: {item.date}
                </Typography>
                </div>
                <div className="flex flex-col items- justify-start">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Serveis contractats:
                </Typography>
                {item.services.map((service, index) => (
                  <li key={index} variant="h6" className="mb-2 text-black">
                    {service.value}
                  </li>
                ))}
                </div>
                <div>
                <Typography variant="h5" className="mb-2">
                  Total:
                </Typography>
                <Typography variant="h2" color="blue-gray" className="mb-2">
                {item.budgetTotal}€
                </Typography>
              </div>
              
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
