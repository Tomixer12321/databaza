import { projectFirestore } from "./firebase/config"
import { useState, useEffect } from "react"

const App = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [movieTitle,setMovieTitle]=useState("")
  const [movieAge,setMovieAge]=useState(null)
  const [movieTime,setMovieTime]=useState(null)
  
  useEffect( () => {
    const unsubscribe=projectFirestore.collection("movies").onSnapshot((snapshot)=>{

      if(snapshot.empty){
        setError("zadne filmy k vypisani")
        setData([])
      }else{
        let result=[]
        snapshot.docs.forEach((oneMovie)=>{
          result.push({id: oneMovie.id, ...oneMovie.data()})
        })
        setData(result)
        setError("")
      }
    },(err)=>{setError(err.message)})
    return ()=>{unsubscribe()}
  }, [])

  const deleteMovie=(id)=>{
    projectFirestore.collection("movies").doc(id).delete()
  }

  const formSubmit=async(e)=>{
    e.preventDefault()
    const newMovie={title:movieTitle, minage:movieAge, time:movieTime}
    try{
      await projectFirestore.collection("movies").add(newMovie)
      setMovieTitle("")
      setMovieAge("")
      setMovieTime("")
    }catch(err){
      setError("film nebol pridany " + err.message)
    }
  }

  return <div className="all-movies">
    <form onSubmit={formSubmit}>
      <input type="text" onChange={(e)=>setMovieTitle(e.target.value)} placeholder="title" value={movieTitle}/><br />
      <input type="number" onChange={(e)=>setMovieAge(e.target.value)} placeholder="min age" min="0" value={movieAge}/><br />
      <input type="number" onChange={(e)=>setMovieTime(e.target.value)} placeholder="time" min="0" value={movieTime}/><br />
      <input type="submit" />
    </form>
    {error && <p>{error}</p>}
    {data.map((oneMovie)=>{

      const {id,title,minage,time}=oneMovie

      return <div key={id} className="one-movie">
        <p>{title}, {time}min, {minage}+</p>
        <button onClick={ () => deleteMovie(id) }>delete</button>
      </div>
    })}
  </div>
}

export default App