import React, { useRef } from 'react';

export const OTPbox = () => {
    const length = 5;
    //creating a ref array which can be used to shift the focus. 
    const inputref = Array.from( { length },()=>useRef<HTMLInputElement>(null) );

    // to automatically shift focus to the next block when a block is getting second number as input
    const onclickhandler = (event:any,index:number)=>{
        const value = event.target.value;
        if(value.length>0 && index<length-1){
            inputref[index+1].current?.focus();
        }
    }
    // when hitting backspace, it should move back by default without user having to click individual blocks
    const onkeyDownhandler = (event : React.KeyboardEvent<HTMLInputElement>, index : number )=>{
        //@ts-ignore
        const value = event.target.value;
        if(event.key === 'Backspace'){
            if(value.length==0 && index>0){
                inputref[index-1].current?.focus();
            }
        }
    }
    return (
        <div className="flex flex-row gap-x-5">
            {inputref.map((_, index) => (
                <div key={index}>
                    <input
                        type="text"
                        //@ts-ignore
                        placeholder={index + 1}
                        className="h-14 w-14 text-center bg-gray-200"
                        ref={inputref[index]}
                        onChange={(event) => onclickhandler(event, index)}
                        onKeyDown={(event : React.KeyboardEvent<HTMLInputElement>)=>{onkeyDownhandler(event,index)}}
                        maxLength={1}
                    />
                </div>
            ))}
        </div>
    );
};
