import { Link } from "react-router-dom";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <body className="bg-gray-100 w-dvw h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-center">
        <Link
          to="/pressupost"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Calculadora Pressupost
        </Link>
      </div>
    </body>
  );
}
