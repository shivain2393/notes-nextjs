import dbConnect from "@/lib/dbConnect";
import noteModel from "../../models/Note";
import ApiResponse from "@/lib/ApiResponse";


export async function POST(request){
    await dbConnect();

    try {

        const { title } = await request.json();

        if(!title || title.trim() === ""){
            return new ApiResponse(404, "Title cannot be empty");
        }

        const formattedTitle = title.toLowerCase().replace(/ /g, "-");

        const existingNote = await noteModel.findOne({ title: formattedTitle });

        if(existingNote) {
            return new ApiResponse(201, existingNote, "Note already exists");
        }

        const note = await noteModel.create({ title: formattedTitle });

        return new ApiResponse(200, note, "Note created successfully");
        
    } catch (error) {
        console.error("Cannot create note",  error);

        return new ApiResponse(401, "Cannot create note")
    }
}