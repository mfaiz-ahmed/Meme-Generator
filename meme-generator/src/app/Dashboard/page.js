import Image from "next/image"; 
import Link from "next/link";
import React from "react";

const Dashboard = async ()  => {
  const res = await fetch('https://api.imgflip.com/get_memes')
  const data = await res.json()
  const memes = data.data.memes

  console.log(memes);
  
  return (
    <div className="flex flex-wrap gap-10">
        {memes.map(meme=>{
            return <div className="border border-gray-800 p-3 text-center">
                <Link href={`Details/${meme.id}`} key={meme.id}>
                    <Image className="border border-gray-800" width={200} height={100} src={meme.url}/>
                <h1 className="pt-10 text-xl font-bold">{meme.name}</h1>
                </Link>
            </div>
        })}
    </div>
  )
}


export default Dashboard