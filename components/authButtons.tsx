import { signIn } from "next-auth/react"
import Image from "next/image";
import googleLogo from "../public/google.svg" 
import githubLogo from "../public/github.svg" 


export function GoogleSignInButton(){
    const handleClick = ()=>{
        signIn('google');
    }
    return(
        <button
        onClick={handleClick}
        className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4
        text-xl transition-colors duration-300 bg-white border-2 border-black text-black
        rounded-lg focus:shadow-outline hover:bg-slate-200"
        >
            <Image src={googleLogo} alt="google"></Image>
            <span className="ml-4">Continue with Google</span>
        </button>
    )
        
}

export function GithubSignInButton(){
    const handleClick = ()=>{
        signIn('github');
    }
    return(
        <button
        onClick={handleClick}
        className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4
        text-xl transition-colors duration-300 bg-white border-2 border-black text-black
        rounded-lg focus:shadow-outline hover:bg-slate-200"
        >
            <Image src={githubLogo} alt="github"></Image>
            <span className="ml-4">Continue with Github</span>
        </button>
    )
        
}