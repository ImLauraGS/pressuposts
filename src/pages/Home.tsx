import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { HeroBanner } from "../components/HeroBanner";
import { Button } from "@material-tailwind/react";

export default function Home() {
    return (
        <body className="bg-gray-100 w-dvw h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex flex-col justify-center items-center">
                <HeroBanner />
                <Link
                    to="/pressupost"
                >
                    <Button color="indigo">
                        Calculadora Pressupost
                    </Button>
                </Link>
            </div>
        </body>
    );
}
