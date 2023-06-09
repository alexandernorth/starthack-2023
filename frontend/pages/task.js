import water from "@/public/images/water-drop.png";
import { Grid, Box, Paper } from "@mui/material";
import Image from "next/image";
import suitcase from "@/public/images/suitcase.png";
import bike from "@/public/images/bike.png";
import book from "@/public/images/book.png";
import Header from "@/components/Header";
import { useState } from "react";
import EducationModal from "@/components/EducationModal";


const actions = [
  {
    title: "Water",
    icon: water,
    color: "bg-blue-300",
  },
  {
    title: "Commute",
    icon: bike,
    color: "bg-primary-300",
  },
  {
    title: "Food Diary",
    icon: book,
    color: "bg-green-300",
  },
  {
    title: "Business Trips",
    icon: suitcase,
    color: "bg-yellow-300",
  }
]

const Task = () => {
  return (
    <div className='bg-landscape bg-no-repeat bg-cover bg-center bg-fixed pt-40 max-w-md'>
      <Header title="CHALLENGES" />
      <div className="bg-gray-100 rounded-t-3xl pt-10 overflow-hidden shadow-md">
        <div className="flex px-5 pb-2 justify-center text-center text-secondary-800 font-bold text-xl">
          Participate in the challenges to earn points and advance on the board!
        </div>
        <Box sx={{ width: '100%', p: 2, pt: 5, pb: 15 }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {actions.map((action) => (
              <Grid item xs={6}>
                <Item item={action} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  )
}

const Item = ({ item }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper elevation={4} sx={{ height: 160 }} onClick={openModal}>
        <div className="relative justify-items-center">
          <div className="absolute m-10">
            <Image
              src={item.icon}
              alt={item.title}
              width={100}
              height={100}
            />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold mb-2 pt-2 text-primary">{item.title}</h1>
          </div>
        </div>
      </Paper>
      <EducationModal open={open} onClose={closeModal} />
    </>
  )
}
export default Task;
