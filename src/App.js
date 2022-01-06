import {useEffect, useState} from "react";

import ImageCard from "./components/ImageCard";

import { 
  getRandomApodImagesByCount,
  getApodImagesByStartDate
} from "./api";



function App() {
  const initialDate = `2000-0${Math.floor(Math.random()*10)+1}-01`;
  const [imageData, setImageData] = useState([]);
  const [startDate, setStartDate] = useState(initialDate);
  useEffect(() => {
    if(startDate === "") {
      getRandomApodImagesByCount(10)
        .then((apodImages) => setImageData([...apodImages]));
    } else {
      getApodImagesByStartDate(startDate, 10)
        .then((apodImages) => setImageData([...apodImages]))
        .catch(err => {
          console.error(err);
          getRandomApodImagesByCount(10)
        .then((apodImages) => setImageData([...apodImages]));
        });
    }
  }, [startDate]);

  return (
    <main className="flex flew-col flex-wrap justify-center bg-indigo-600">
      <h1 className="text-5xl text-center font-bold text-white bg-indigo-900 p-5 w-full">
        Welcome to Spacestagram
      </h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        setStartDate(e.target.startDate.value);
      }} className="w-full flex flex-row space-x-2 justify-center my-6">
        <button
        type="submit"
        className="bg-yellow-500 text-white text-xl font-bold p-3 lg:hover:scale-110 hover:focus transition duration-300">
          Generate New Images
        </button>
        <input className="p-2" type="text" placeholder="YYYY-MM-DD" name="startDate" />
      </form>
      <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-4/5 mb-16">
        {
          imageData.map((img, i) => {
            return <ImageCard imageData={img} key={i}/>
          })
        }
      </section>
    </main>
  );
}

export default App;
