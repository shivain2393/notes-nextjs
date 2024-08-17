class ApiResponse{
    constructor(statusCode, data = null, message){
        return Response.json(
            {
                data,
                message
            },
            {
                status: statusCode
            }
        )
    }
}

export default ApiResponse;