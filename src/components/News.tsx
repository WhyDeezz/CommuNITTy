import { superbase as supabase} from "../superbase-client";

import { useEffect, useState } from "react"



type news = {

  title: string;
  text:string;
  section:string;
  dept:string;
  date:string;
  id:number;
  onDelete?: () => void;
}


export default function News(props: news) {
  const [user, setUser] = useState<any>(null)
  
      useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
          setUser(data.user)
        })
  
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null)
        })
  
        return () => {
          authListener.subscription.unsubscribe()
        }
      }, [])

  async function handleDelete(id: number) {
  const { error ,data} = await supabase
    .from('announcement')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    console.error("Delete failed:", error.message);
  } 
  console.log(error,data)
  window.location.reload()
  
}

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear() % 100;
      return `${day}/${month}/${year}`;
    };
  return (
    <div  id = 'vdiya' className="p-4 rounded-2xl shadow-lg max-w-lg  mt-9 ml-30 mr-30 " style={{ backgroundColor:'#202020' }}>
      <div className=" mt-0">
        <h1 className="font-bold inline" style={{ color:'#8354f6',    fontFamily: "Major Mono Display, monospace",fontWeight: 400,fontStyle: "normal" ,}}>{props.dept}-{props.section}</h1>
        <span>
          {user && <img onClick={()=>handleDelete(props.id)} src='./trashred.svg' style={{ width:'40px' ,float:"right"}} ></img>}
        </span>

        <h1 className=" text-gray-300 " style={{fontSize:"20px"}}>{props.title}</h1>

      </div>

        <div className="mt-1">
        <h1 className=" text-gray-300" >{formatDate(props.date)}</h1>
      </div>

 
    <div className="flex mt-1">
        <h1 className="font-light text-gray-300">{props.text}</h1>
      </div>
      
    </div>
  );
}


