import { projectFirestore } from "./firebase/config"
import { useState, useEffect } from "react"

const App = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  
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

  return <div className="all-movies">
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