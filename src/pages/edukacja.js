//nowa strona z wybranymi yt filmami
import YouTube from 'react-youtube';


export default function Edukacja() {
    const opts = {width: '560', height: '315',  playerVars: {autoplay: 0, controls: 1, },  }
    return (
      <main>  
          <h1 className="flex items-center justify-center w-full text-2xl font-bold mb-5">Wszystko co musisz wiedzieć o gokartach!</h1>
            <div>
                    <h2 className="flex items-center justify-center w-full text-xl  mb-2">Technika Jazdy dla początkujących</h2>
                    <YouTube className="mb-6" videoId='8vefLpfozPA' opts={opts}/>
            </div>
            <div>
                    <h2 className="flex items-center justify-center w-full text-xl  mb-2">Gokarty na poważnie - od czego zacząć?</h2>
                    <YouTube className="mb-6" videoId='3rDQu-I-jtQ' opts={opts}/>
            </div>
            <div>
                    <h2 className="flex items-center justify-center w-full text-xl  mb-2">Odzież kartingowa - o czym warto pamiętać?</h2>
                    <YouTube className="mb-6" videoId='QADR_zoose0' opts={opts}/>
            </div>
            <div>
                    <h2 className="flex items-center justify-center w-full text-xl  mb-2">Jak hamować gokartem?</h2>
                    <YouTube className="mb-6" videoId='FsB7JhqaHqw' opts={opts}/>
            </div>
            <div>
                    <h2 className="flex items-center justify-center w-full text-xl  mb-2">Dla zaawansowanych - czy warto się przechylać?</h2>
                    <YouTube className="mb-6" videoId='J-3Qh5aGLxw' opts={opts}/>
            </div>
      </main>   


    )
  }

