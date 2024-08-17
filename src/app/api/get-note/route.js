import noteModel from "@/app/models/Note";
import ApiResponse from "@/lib/ApiResponse";
import dbConnect from "@/lib/dbConnect";

export async function GET(request){
    await dbConnect();

    try {

        const { searchParams } = new URL(request.url);

        const noteTitle = searchParams.get("title");

        const note = await noteModel.findOne({ title: noteTitle });

        if(!note){
            return new ApiResponse(404, "Note not found");
        }

        return new ApiResponse(200, note, "Note found");

    } catch (error) {
        console.error("Error in getting note", error);
        
        return new ApiResponse(404, "Error in getting note");
    }
}