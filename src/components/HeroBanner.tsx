import { Typography } from "@material-tailwind/react";

export function HeroBanner() {
    return (
        <figure className="my-6 relative h-64 w-[90%]">
            <img
                className="h-full w-full rounded-xl object-cover object-center"
                src="./background-Hero.png"
                alt="colorfull greographyc image"
            />
            <figcaption className="absolute top-24 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-center rounded-xl border border-white bg-white/75 py-3 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                    <Typography variant="h3" color="blue-gray">
                        Aconsegueix la millor qualitat
                    </Typography>
                </div>
            </figcaption>
        </figure>
    );
}