import { atom } from "recoil";
interface UserState{
    facultyId : number,
    name : string,
}

export const userState = atom({
    key : 'userState',
    default : 'null'
});
