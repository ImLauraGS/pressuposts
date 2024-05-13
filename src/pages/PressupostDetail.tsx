import React from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

const PressupostDetail = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const name = params.get("name") || "No disponible";
  const email = params.get("email") || "No disponible";
  const phone = params.get("phone") || "No disponible";
  const date = params.get("date") || "No disponible";
  const value = params.get("value") || "No disponible";
  const total = params.get("total") || "No disponible";

  return (
    <Card className="w-[80%] bg-deep-purple-50 m-auto mt-20">
      <CardBody className="w-[100%] flex flex-row justify-between align-top">
        <div className="flex flex-col h-full justify-start">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {name}
          </Typography>
          <Typography variant="h6" className="mb-2 font-normal">
            {email}
          </Typography>
          <Typography variant="h6" className="mb-2 font-normal">
            {phone}
          </Typography>
          <Typography variant="h6" className="mb-2 font-normal">
            Data: {date}
          </Typography>
        </div>
        <div className="flex h-full flex-col items-justify-start">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Serveis contractats:
          </Typography>
          <ul>
            {value.split(",").map((service, index) => (
              <li key={index} className="mb-2 text-black">
                {service.trim()}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex h-full flex-col">
          <Typography variant="h5" className="mb-2">
            Total:
          </Typography>
          <Typography variant="h2" color="blue-gray" className="mb-2">
            {total}€
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default PressupostDetail;
