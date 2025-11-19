import {useState} from "react";

// Sin Uso porque todo lo relacionado a Firebase está centralizado en su script
export default function useRequest()
{
    const [isLoading, SetIsLoading] = useState(false);
    const [response, SetResponse] = useState(null);
    const [error, SetError] = useState(null)

    async function sendRequest(requestFunction)
    {
        try
        {
            SetIsLoading(true)
            const response = await requestFunction()
            SetResponse(response)
        }
        catch (error)
        {
            console.error(error)
            SetError(error.message)
        }
        finally
        {
            SetIsLoading(false)
        }
    }

    return {
        response: response,
        error: error,
        isLoading: isLoading,
        sendRequest: sendRequest
    }
}