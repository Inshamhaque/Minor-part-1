import { OTPcard } from "@/Client-Components/auth-page/OTPcard";
import { Appbar } from "@/components/Appbar";

export default function(){
    return(
        <div className="flex flex-col">
            <Appbar />
            < OTPcard mail = 'your registered mail' />
        </div>
    )
}