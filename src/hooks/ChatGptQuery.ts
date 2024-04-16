import { useQuery, UseQueryResult } from 'react-query';
import { Message } from '../store/chatStore';
import axios from 'axios';

const API_KEY = 'AIzaSyC_oRNugFBH2N9diisShOWnyH0-KFg5hvA';

export const fetchAIResponse = async (input: string) => {
    
    const response = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY,
        method: 'post',
        data: {
            contents: [{
                    parts: [{
                        text: input
                    }]
                }
            ]
        }
    });
    
    return response.data.candidates[0]?.content?.parts[0]?.text as string;
};

// const useChatGPTQuery = (input: string, enabled: boolean): UseQueryResult<string, Error> => {
//     return useQuery(['chatGPT', input], () => fetchChatGPTResponse(input), {
//         enabled: enabled,
//       });
// };

// export default useChatGPTQuery;
