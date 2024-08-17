import noteModel from "@/app/models/Note";
import dbConnect from "@/lib/dbConnect";
import ApiResponse from "@/lib/ApiResponse";

export async function POST(request){
    await dbConnect();

    try {
        const { title, content } = await request.json();
    
        const note = await noteModel.findOne( { title });
    
        if(!note ) {
            return new ApiResponse(404, "Invalid request - Note does not exist");
        }
    
        note.content = content;
    
        await note.save();

        return new ApiResponse(200, "Note updated successfully");

    } catch (error) {
        console.error("Error in updating note ", error);

        return new ApiResponse(404, "Error in updating note");
    }
}