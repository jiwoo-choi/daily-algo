import { graphQLQuery, variableElement, variableTypes } from './graphQL'
import { fetchAllQuestionWith,  fetchQuestion } from './fetch'
import { Filter, Difficulty, Question, QuestionListPayload, QuestionPayload} from './question'
import { pickRandomElementFrom } from './utils'
import createIssue from "./github";

const filter : Filter = { difficulty : { level : Difficulty.Easy} , paid_only : false}
async function main(){
    const questions = await fetchAllQuestionWith(filter)
    const question : QuestionListPayload = pickRandomElementFrom(questions)
    const query = new graphQLQuery({
        operation:"question",
        fields: ["questionId","questionFrontendId","title", "titleSlug", "content", "stats", "difficulty"] ,
        variables : { titleSlug : {value: question.stat.question__title_slug, required: true, type:variableTypes.String}}
    })
    const questionData = await fetchQuestion(query);
    const title = `## ${questionData.title}`
    const contents = `${questionData.content}`
    const link = `[see full question](https://leetcode.com/problems/${questionData.titleSlug})`
    const body =
    [
        title,
        contents,
        `| total accepted | total submission | accepted rate |`,
        `| - | - | - |`,
        `| ${questionData.stats.totalAccepted} | ${questionData.stats.totalSubmission} | ${questionData.stats.acRate} |`,
        link
    ].join('\n');
    
    let current_datetime : Date = new Date();
    let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
    createIssue(`[${formatted_date}] today\'s algo question`, body);
}

main();


/*
await 
fetchAllQuestionWith(filter)
    .then( questions => {
        // pick one random.
        
        const question : QuestionListPayload = pickRandomElementFrom(questions)
        console.log(question);

        const query = new graphQLQuery({
            operation:"question",
            fields: ["questionId","questionFrontendId","title", "titleSlug", "content"] ,
            variables : { titleSlug : {value: question.stat.question__title_slug, required: true, type:variableTypes.String}}
        // build new
        })

        fetchQuestion(query).then( (element) => {
            console.log(element);
        })
    })
*/