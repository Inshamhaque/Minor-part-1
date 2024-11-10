import ChatApp from "@/Client-Components/chat-dashboard/chat";

export default function({ params} : {
    params : {
        id : string
    }
}){
    return(
        <div className=" ">
            <ChatApp id={params.id} />
        </div>
    )
}