import { Register } from "@/Client-Components/auth-page/registerClient";
import { Appbar } from '@/components/Appbar'
export default function (){
    return(
        <div className="flex flex-col ">
            <Appbar />
            <Register />
        </div>
        
    )
}