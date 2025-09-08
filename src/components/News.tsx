type news = {

  title: string;
  text:string;
  section:string;
  dept:string;
  date:string;
}

export default function News(props: news) {

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear() % 100;
      return `${day}/${month}/${year}`;
    };
  return (
    <div  id = 'vdiya' className="p-4 rounded-2xl shadow-lg max-w-lg  mt-9 ml-30 mr-30 " style={{ backgroundColor:'#202020' }}>
      <div className=" mt-2">
        <h1 className="font-bold" style={{ color:'#8354f6',    fontFamily: "Major Mono Display, monospace",
    fontWeight: 400,
    fontStyle: "normal"}}>{props.dept}-{props.section}</h1>
      </div>
      <div className="mt-1 ">
        <h1 className=" text-gray-300" style={{fontSize:"20px"}}>{props.title}</h1>
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


