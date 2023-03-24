import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@mui/material";
import {
    FaQuestionCircle,
} from 'react-icons/fa';


const Education = ({ onClick }) => {
    const [data, setData] = useState(null);

    /*   useEffect(() => {
          async function fetchData() {
              const data = await getLeaderboard();
              setData(data);
          }
          fetchData();
      }, []);
   */
    return (
        <>
            {data && <h1>Hi </h1>}
            <>
                <h1 className="mb-6 pt-10 text-5xl font-bold text-primary-700 text-center">FUN FACT</h1>
                <div className="flex flex-col items-center py-20 h-screen bg-primary-100">
                    <Card className="bg-primary-600 w-80">
                        <CardContent>
                            <h1 className="text-lg text-primary-100 font-bold text-center">
                                Average Electricity Consumption
                            </h1>
                            {/* TODO: Two Icons representing shift and company average comparison */}
                            <h1 className="text-sm text-primary-200 text-center">
                                Explanataion
                            </h1>
                        </CardContent>
                    </Card>
                </div>
            </>
        </>
    );
}

export default Education;