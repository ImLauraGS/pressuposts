  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
import { totalApi } from "../services/service";
import { useEffect, useState } from "react";
import { ServiceProps } from "../types/types";

export default function ListPressupost() {
    const totalService = totalApi(); 
    const [budgets, setbudgets] = useState<ServiceProps[]>([]);

    useEffect(() => {
        totalService.getTotal()
            .then((res) => res.data)
            .then((data) => {
              console.log("Service Data:", data);
              setbudgets(data);
            });
    }, []);


  return (
      <div className="mb-8 flex items-center justify-between gap-8">
          <Typography variant="h5" color="blue-gray">
            Pressupostos en curs
          </Typography>
      <div className="flex flex-col items-center justify-between gap-4">
      {budgets.map((item, index) => (
                <Card key={index} className="mt-6 w-[50rem] items-end">
                    <CardBody className='w-[100%] flex flex-row justify-between items-center'>
                        <div>
                            <Typography variant="h2" color="blue-gray" className="mb-2">
                                {item.name}
                            </Typography>
                            <Typography variant="h2" color="blue-gray" className="mb-2">
                                {item.email}
                            </Typography>
                            <Typography variant="h2" color="blue-gray" className="mb-2">
                                {item.phone}
                            </Typography>
                            <Typography>
                                {item.services.price}
                            </Typography>
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