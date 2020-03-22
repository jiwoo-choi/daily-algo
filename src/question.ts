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

export interface QuestionPayload  {
    question:{
        questionId: string
        title: string
        titleSlug:string
        questionFrontendId:number
        content:string
        difficulty:string
        stats: string
    }
    //question: {
    //}
    
    //update contents [... abc] 
}


    
    

export class Question {

    questionId: string
    title: string
    titleSlug:string
    questionFrontendId:number
    content:string
    difficulty:string
    stats: {
        totalAccepted:string,
        totalSubmission:string,
        acRate:string
    }

    constructor(payload : QuestionPayload) {
        let question = payload.question 
        this.questionId = question.questionId
        this.title = question.title
        this.titleSlug = question.titleSlug
        this.questionFrontendId = question.questionFrontendId
        this.content = question.content
        this.stats = JSON.parse(question.stats)
        this.difficulty = question.difficulty
    }


}

