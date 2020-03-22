
import { graphQLQueryConstructable} from './graphQL'
import { Question, QuestionListPayload , QuestionPayload, Filter, QuestionHighListPayLoad} from './question'
import { API } from './utils'



export async function fetchAllQuestionWith(url:string, filter? : Filter) : Promise<QuestionListPayload[]> {
    
    //https://leetcode.com/api/problems/favorite_lists/top-interview-questions/ <- top questions.
    //"https://leetcode.com/api/problems/algorithms/" <- just all algorithms.

    const { stat_status_pairs } = await API<QuestionHighListPayLoad>(url)

    if (filter) {
        return stat_status_pairs.filter( element => {
            return (filter.difficulty.level == element.difficulty.level && element.paid_only === filter.paid_only)
        })    
    } else {
        return stat_status_pairs
    }
}




export async function fetchQuestion(graphQuery : graphQLQueryConstructable): Promise<Question> {
    //there are always top data layer.

    const question = await API<QuestionPayload>("https://leetcode.com/graphql", true,
    {
        method : 'POST',
        body : graphQuery.requestQuery,
        headers: { 'content-type': 'application/json' },
    })
    
    return new Question(question);
}


