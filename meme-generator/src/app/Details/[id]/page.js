"use client"

import Image from "next/image"
import React , {useState , useEffect} from "react"
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome"
import { faWandSparkles } from "@fortawesome/free-solid-svg-icons"

const fetchMeme = async (id)=>{
    const res = await fetch('https://api.imgflip.com/get_memes')
    const data = await res.json()
    return data.data.memes.find((meme)=> meme.id === id)
}


const detailPage = ({params})=>{

    const [meme , setMeme] = useState('')
    const [firstText , setFirstText] = useState('')
    const [secondText , setSecondText] = useState('')
    const [generatedUrl , setGeneratedUrl] = useState('')

    useEffect(()=>{
        const loadMeme = async ()=>{
        const memeData = await fetchMeme(params.id)
        setMeme(memeData)
        }
        loadMeme()
    } , [params.id])


const generateMeme = async ()=>{
    if(!meme)return ;
    try{
        const response = await fetch(`https://api.imgflip.com/caption_image?template_id=${meme.id}&username=FaizAhmed1&password=Faiz3564&text0=${firstText}&text1=${secondText}&gt` , {
            method : 'POST'
        })
        const data = await response.json()

        if(data.success){
            setGeneratedUrl(data.data.url)
        }
        else{
            console.error('Failed to generate meme' , data.error_message)
        } 
    }
    catch(error){
        console.error("Error" , error)
    }
}

    return <div className="mt-10">
        <div className="rounded-lg margin border text-center border-gray-800 w-96 shadow-xl">
    <div className="grid justify-center items-center p-10">
        <h1 className="font-black text-xl mb-10">{meme.name}</h1>
        <Image width={250} height={100} src={meme.url} alt={meme.name} />
        <div className="flex justify-start flex-col items-start gap-4 text-lg">
        <label  htmlFor="firstText">First Text
        </label>
            <input className="border border-gray-300 w-fit p-3 rounded-full focus:outline-gray-500"
            type="text"
            placeholder="Enter First Text"
            value={firstText}
            onChange={(e)=>{
                setFirstText(e.target.value)
            }} />
        </div>
        <div className="flex justify-start flex-col items-start gap-4 text-lg">
        <label  htmlFor="secondText">Second Text
        </label>
            <input className="border border-gray-300 w-full p-3 rounded-full focus:outline-gray-500"
            type="text"
            placeholder="Enter Second Text"
            value={secondText}
            onChange={(e)=>{
                setSecondText(e.target.value)
            }} />
        </div>
        <button onClick={generateMeme} className="mt-5 text-l bg-gray-500 hover:bg-gray-800 rounded-full text-white p-2">GENERATE <FontAwesomeIcon icon={faWandSparkles} /></button>
    </div>
    </div>
    {generatedUrl && 
    <div>
        <Image width={200} height={100} src={generatedUrl} alt="Generated Meme"/>
    </div>}
        </div>

}



export default detailPage