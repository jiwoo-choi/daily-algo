import { graphQLQuery, graphQLQueryConstructable } from './graphQL'

//questionList.
//questionContents.


//필터에관련된것. 
export enum Difficulty {
    Easy = 1,
    Medium = 2,
    Hard = 3
}
export interface Filter {
    difficulty: {
        level: Difficulty
    },
    paid_only:boolean
    //solution availbility
    //filter type?
}

export interface QuestionHighListPayLoad {
    stat_status_pairs : QuestionListPayload[]
}

export interface QuestionListPayload {

        stat: {
            question_id: number,
            question__title: string,
            question__title_slug: string,
            total_acs: number,
            total_submitted: number,
            frontend_question_id: number,
            is_new_question: false
        },
        difficulty: {
            level: number
        },
        paid_only: boolean,
        is_favor: boolean,
}

/*
[] wrapping할려니까 기존 API못씀 
API수정하려고하는데, dynmaic하게 못부름.
payload를 바꾸려니까 그냥 기존 구조를 깨트리는것같아서 싫음.
그러자니 PAYLOAD를 바꾸려니까 굉장히 애매해짐.

payload를 나누는게 좋을듯.

*/
//question content에 관련된것.
export interface QuestionPayload  {
    question:{
        questionId: string
        title: string
        titleSlug:string
        questionFrontendId:number
        content:string
        difficulty:string
        stats: {
            totalAccepted : string
            totalSubmission : string
            acRate : string
        }
    }
    //question: {
    //}
    
    //update contents [... abc] 
}

// export function write(question: Question){

// }

// export function readList(){
//     //
// }

    
    

export class Question {

    questionId: string
    title: string
    titleSlug:string
    questionFrontendId:number
    content:string
    difficulty:string
    stats: {
        totalAccepted : string
        totalSubmission : string
        acRate : string
    }

    constructor(payload : QuestionPayload) {
        let question = payload.question 
        this.questionId = question.questionId
        this.title = question.title
        this.titleSlug = question.titleSlug
        this.questionFrontendId = question.questionFrontendId
        this.content = question.content
        this.stats = question.stats
        this.difficulty = question.difficulty
    }


}

