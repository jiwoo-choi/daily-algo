import { graphQLQuery, variableElement, variableTypes } from './graphQL'
import { fetchAllQuestionWith,  fetchQuestion } from './fetch'
import { Filter, Difficulty, Question, QuestionListPayload, QuestionPayload} from './question'
import { pickRandomElementFrom } from './utils'
import createIssue from "./github";

async function main(){

    //https://leetcode.com/api/problems/favorite_lists/top-interview-questions/ <- top questions.
    //"https://leetcode.com/api/problems/algorithms/" <- just all algorithms.

    const type : boolean = (new Date().getDay() % 2 == 0)
    const url : string = (type) ? "https://leetcode.com/api/problems/algorithms/" : "https://leetcode.com/api/problems/favorite_lists/top-interview-questions/"
    const filter : Filter | undefined = (type) ? { difficulty : { level : Difficulty.Easy} , paid_only : false} : undefined;
    const questions = await fetchAllQuestionWith(url, filter)
    const question : QuestionListPayload = pickRandomElementFrom(questions)
    const query = new graphQLQuery({
        operation:"question",
        fields: ["questionId","questionFrontendId","title", "titleSlug", "content", "stats", "difficulty"] ,
        variables : { titleSlug : {value: question.stat.question__title_slug, required: true, type:variableTypes.String}}
    })

    const questionData = await fetchQuestion(query);
    console.log(questionData.stats.totalAccepted)


    const title = `## ${questionData.title}`
    const tag : string = (type) ? `General Algo Questions` : `Top 100 Interview Questions`
    const contents = `${questionData.content}`
    const link = `[see full..](https://leetcode.com/problems/${questionData.titleSlug})`
    const body =
    [
        title,
        `### ` + tag,
        contents,
        `| total accepted | total submission | accepted rate |`,
        `| - | - | - |`,
        `| ${questionData.stats.totalAccepted} | ${questionData.stats.totalSubmission} | ${questionData.stats.acRate} |`,
        " ",
        link
    ].join('\n');
    
    let current_datetime : Date = new Date();
    let formatted_date = (current_datetime.getMonth() + 1) + '/' + current_datetime.getDate() + "/" + current_datetime.getFullYear()
    //createIssue(`[${formatted_date}] ${questionData.title}`, body);
}

main();


