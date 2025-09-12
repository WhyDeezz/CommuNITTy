import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from "react";
import News from "../components/News";
import { superbase } from "../superbase-client";

type news = {
  img: string;
  title: string;
  text: string;
  context: string;
  branch: string;
  section: string;
  created_at: string;
  id: number;
};

export default function Home() {
  const [profiles, setProfiles] = useState<news[]>([]);

  const fetchTasks = async () => {
    const { error, data } = await superbase
      .from('announcement')
      .select('*')
      .order('created_at', { ascending: false }) // latest first
      .limit(2); // only latest 2

    if (error) {
      console.error(error.message);
      return;
    }
    setProfiles(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="parentoftype">
        <TypeAnimation
          sequence={[
            'We are the Future of India',
            1000,
            'We are Innovators of Tomorrow',
            1000,
            'We are NITTians',
            1000,
            'We Build. We Lead. We Inspire.',
            1000,
          ]}
          wrapper="span"
          speed={50}
          className="type"
          repeat={Infinity}
        />
        <img className="cock" src="./clock.png" />
      </div>
      
      {(window.innerWidth > 600 )&&
      <div style={{display:'flex',justifyContent:'center'}}>
        <h2
          style={{
            color: 'white',
            fontSize: '30px',
            marginTop: '90px',
            marginLeft: '40px',
            fontFamily: 'Atkinson Hyperlegible',
          }}
        >
          Latest Announcements
        </h2>
      </div>}

   

      {(window.innerWidth > 600 )&& <div
        className="grid grid-cols-2 gap-1 p-3 "
        style={{
          fontFamily: 'Atkinson Hyperlegible, sans-serif',
          fontWeight: 400,
          fontStyle: 'normal',
      
        }}
        id="news"
      >
        {profiles.map((p) => (
          <News
            key={p.id}
            date={p.created_at}
            id={p.id}
            title={p.title}
            text={p.context}
            section={p.section}
            dept={p.branch}
            onDelete={fetchTasks}
          />
        ))}
      </div>}
    </>
  );
}
