import { useEffect, useState } from "react";

import { parseISO, format } from 'date-fns'

export default function ImageCard({imageData}) {
	const [liked, setLiked] = useState(() => {
		return localStorage.getItem(imageData.title) === "true";
	});

	useEffect(() => {
		setLiked(localStorage.getItem(imageData.title) === "true");
	}, [imageData]);

	useEffect(() => {
		localStorage.setItem(imageData.title, liked);
	}, [imageData.title, liked]);

	const date = parseISO(imageData.date);
	const gratify = ["Thanks", "Appreciated", "Yay", "Groovy", "Hooray"]

  return (
    <article className="bg-white rounded-xl drop-shadow-lg max-h-min">
		<img src={imageData.url} alt={imageData.title} className="object-cover h-64 w-full"/>
		<div className="p-6">
			<h2 className="text-2xl font-bold mb-2">{imageData.title}</h2>
			<time className="font-bold" dateTime={imageData.date}>{format(date, 'LLLL d, yyyy')}</time>
			<p className="text-gray-800 my-3 break-words"> {imageData.explanation}</p>
			<button
				className={
					liked ? "text-white bg-green-500 text-xl rounded-xl font-bold border-4 border-green-500 transition md:hover:scale-125 p-2 scale-125"
					: "text-green-500 text-xl font-bold rounded-xl border-4 border-green-500 transition lg:hover:scale-125 p-2"
				}
				onClick={(e) => {e.preventDefault(); setLiked(!liked);}}
			>
				{liked ? gratify[Math.floor(Math.random()*gratify.length)] : "Like"}
			</button>
		</div>
    </article>
  );
}