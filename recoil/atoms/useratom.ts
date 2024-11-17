import { atom } from "recoil";
interface UserState{
    name : string;
    email  : string;
    department : string;
    facultyid : string;
    designation : string;
}

export const userState = atom({
    key : 'userState',
    default : null
});
