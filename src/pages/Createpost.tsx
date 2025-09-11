import Creatpost from "../components/Createpost"


export default function Createpostpage()
{
    return(
        <div className="createposttgng">
            <h2 className="text-3xl font-bold text-center absolute top-7 left-1/2 -translate-x-1/2 mt-2  text-gray-300 " style={{
    fontFamily: "Atkinson Hyperlegible, sans-serif",
    fontWeight: 400,
    fontStyle: "normal"}} id = 'createpost'>Create New Post
            </h2>
            <Creatpost/>
        </div>
    )

}