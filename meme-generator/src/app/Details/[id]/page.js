"use client"

const { default: Image } = require("next/image")
const { useEffect, useState } = require("react")

const fetchMeme = async (id)=>{
    const res = await fetch('https://api.imgflip.com/get_memes')
    const data = await res.json()
    return data.data.memes.find((meme)=> meme.id)
}


const detailPage = ({params})=>{

    const [meme , setMeme] = useState(undefined)

    useEffect(()=>{
        const loadMeme = async ()=>{
        const memeData = await fetchMeme(params.id)
        setMeme(memeData)
        }
        loadMeme()
    } , [params.id])

    return <div>
        <Image width={200} height={100} src={meme?.url} />
    </div>

}



export default detailPage