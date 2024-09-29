import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {

    try{
        return NextResponse.json({
            msg : "Server is healthy"
        },{
            status : 200
        })
    }
    catch(e){
        return NextResponse.json({
            msg : "Server is not healthy"
        },{
            status : 500
        })
    }
}
