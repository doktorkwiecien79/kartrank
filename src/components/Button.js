import Link from 'next/link';


export default function Button({href,copy}) {
    return (
        <Link href={href} passHref>
            <button className="btn bg-oceanBlue hover:ring hover:ring-red-500  text-white hover:text-red-500 active:bg-white m-2">{copy}</button>
        </Link>    
    );
}