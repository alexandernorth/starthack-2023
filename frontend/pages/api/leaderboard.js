import salad from "../../public/images/salad.png";
import saladSmall from "../../public/images/saladSmall.png";
import saladPurple from "../../public/images/saladPurple.png";
import carrot from "../../public/images/carrot.png";
import eggs from "../../public/images/eggs.png";
import iceCream from "../../public/images/iceCream.png";
import popcorn from "../../public/images/popcorn.png";


export default async function getLeaderboard() {
    const res = await fetch("http://localhost:8080/api/v1/leaderboard",
        { method: "GET" });
    const data = await res.json();

    const images = [salad, saladSmall, saladPurple, carrot, eggs, iceCream, popcorn];

    // add random image selection for each leader
    for (let i = 0; i < data.length; i++) {
        const randomIcon = images[Math.floor(Math.random() * images.length)];
        data[i].imageSrc = randomIcon;
    }
    return data;
}
