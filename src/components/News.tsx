type news = {
  img: string;
  title: string;
  text:string;
  section:string;
  dept:string;
}

export default function News(props: news) {
  return (
    <div  className="bg-gray-700 p-4 rounded-2xl shadow-lg max-w-sm mt-9 ml-3 mr-3">
      <div className="flex justify-center" >
        <img src={props.img} />
      </div>
      <div className="flex items-center justify-center mt-1">
        <h1 className="font-bold text-gray-300">{props.title}</h1>
      </div>
    <div className="flex items-center justify-center mt-1">
        <h1 className="font-light text-gray-300">{props.text}</h1>
      </div>
      
      <div className="flex items-center justify-center mt-2">
        <h1 className="font-extralight text-gray-300 ">{props.dept}-{props.section}</h1>
      </div>


    </div>
  );
}


