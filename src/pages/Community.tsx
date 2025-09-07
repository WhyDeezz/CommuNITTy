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
    <h2 className="text-3xl font-bold text-center absolute top-7 left-1/2 -translate-x-1/2 mt-2  text-gray-300">Announcements</h2>
    <div className="grid grid-cols-4 gap-6 p-6 ">
      {profiles.map((p, i) => (
    
            <News
            key={i}
            img="./cat.png"
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