import { useEffect ,useState} from "react"
import News from "../components/News"
import { superbase } from "../superbase-client"
type news = {
  img: string;
  title: string;
  text:string;
  context:string;
  branch:string;
  section:string;
  created_at:string;
}



export default function Communitypage()
{
    const [profiles , setprofiles] = useState<news[]>([])
    const fetchtasks = async ()=>
        {
            const {error , data} = await superbase.from('announcement').select('*')
            if (error)
            {
                console.error(error.message)
                return;
            }
             setprofiles(data)
        }
    useEffect(()=> {
        fetchtasks();
    },[])
    console.log(profiles)
    return(
    <>
    <h2 className="text-3xl font-bold text-center absolute top-4 left-1/2 -translate-x-1/2 mt-2 ml-10 mr-10 text-gray-300"   style={{
    fontFamily: "Atkinson Hyperlegible, sans-serif",
    fontWeight: 700,
    fontStyle: "normal"
  }}>Announcements</h2>
    <div className="grid grid-cols-2 gap-1 p-3 "   style={{
    fontFamily: "Atkinson Hyperlegible, sans-serif",
    fontWeight: 400,
    fontStyle: "normal"
  }}>
      {profiles.map((p, i) => (
    
            <News
            key={i}
            date={p.created_at}
          
            title={p.title}
            text={p.context}
            section={p.section}
            dept={p.branch}
            />

        
      ))}
    </div>
    </>
    )


}