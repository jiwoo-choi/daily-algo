
import { graphQLQueryConstructable} from './graphQL'
import { Question, QuestionListPayload , QuestionPayload, Filter, QuestionHighListPayLoad} from './question'
import { API } from './utils'

async function fetchAllQuestions() : Promise<QuestionListPayload[]> {
    //filter modulation?
    //show all availabile filters and pick them?
    const { stat_status_pairs } = await API<QuestionHighListPayLoad>("https://leetcode.com/api/problems/algorithms/")
    return stat_status_pairs;
}


export async function fetchAllQuestionWith(filter : Filter) : Promise<QuestionListPayload[]> {
    const result = await fetchAllQuestions();    
    return result.filter( element => {
        return (filter.difficulty.level == element.difficulty.level && element.paid_only === filter.paid_only)
    })
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


