import { projectFirestore } from "./firebase/config"
import { useState, useEffect } from "react"

const App = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [movieTtitle,setMovieTitle]=useState("")
  const [movieAge,setMovieAge]=useState(null)
  const [moviesTime,setMovieTime]=useState(null)
  
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

  const formSubmit=(e)=>{
    e.preventDefault()

    console.log(movieAge)
    console.log(moviesTime)
    console.log(movieTtitle)
  }

  return <div className="all-movies">
    <form onSubmit={formSubmit}>
      <input type="text" onChange={(e)=>setMovieTitle(e.target.value)} placeholder="title"/><br />
      <input type="number" onChange={(e)=>setMovieAge(e.target.value)} placeholder="min age" min="0"/><br />
      <input type="number" onChange={(e)=>setMovieTime(e.target.value)} placeholder="time" min="0"/><br />
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