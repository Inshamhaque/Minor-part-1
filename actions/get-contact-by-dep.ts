// used to call the api for adding contact
import axios from "axios";
export async function getContact({ department } : {
    department : string 
}){
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    try{
        const res = await axios.post(`${BASE_URL}/api/v1/contacts`,{
            department
        })
        if(!res){
            console.log('error while fetching');
            return;
        }
        console.log('successfully fetched');
        return res;

    }
    catch(e){
        console.log('some error occurred');
        return;
    }
}