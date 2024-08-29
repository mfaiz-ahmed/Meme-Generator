import Image from "next/image"; 
import Link from "next/link";
import React from "react";

const Dashboard = async ()  => {
  const res = await fetch('https://api.imgflip.com/get_memes')
  const data = await res.json()
  const memes = data.data.memes

  console.log(memes);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 mx-auto">
        {memes.map(meme=>{
            return <div className="relative w-56 h-56  rounded-lg border border-gray-300">
                <Link href={`Details/${meme.id}`} key={meme.id}>
                    <Image layout="fill" objectFit="cover" className="absolute inset-0" src={meme.url}/>
                </Link>
            </div>
        })}
    </div>
  )
}


export default Dashboard