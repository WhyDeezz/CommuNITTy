import { TypeAnimation } from 'react-type-animation';
import { InstagramEmbed } from 'react-social-media-embed';

export default function Home()
{
    return(
    <>
    <div className='parentoftype'>
        <TypeAnimation
      sequence={[
      
        'We are the Future of India',
        1000, 
        'We are Innovators of Tomorrow',
        1000,
        'We are NITTians',
        1000,
        'We Build. We Lead. We Inspire.',
        1000
      ]}
      wrapper="span"
      speed={50}
      className='type'
    
      repeat={Infinity}
    />

    </div>
    <div>
      <img className='cock' src='/cocktower.png'></img>
    </div>

    </>
 



    )
}
