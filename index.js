import { graphQLQuery, variableTypes } from './graphQL';
import { fetchAllQuestionWith, fetchQuestion } from './fetch';
import { Difficulty } from './question';
import { pickRandomElementFrom } from './src/utils';
const filter = { difficulty: { level: Difficulty.Easy }, paid_only: false };
fetchAllQuestionWith(filter)
    .then(questions => {
    // pick one random.
    const question = pickRandomElementFrom(questions);
    //build graphQP Que
    //or mapping
    //분석해서받는거뿐인가... 흠..        
    //그걸토대로 분석해서만들어주는것
    //따르는지체크해야함.
    //string을하기에 너무오류카긐.ㅁ
    const query = new graphQLQuery({
        operation: "questionData",
        fields: ["questionId", "questionFrontendId", "title", "titleSlug", "content"],
        variables: { titleSlug: { value: question.stat.question__title_slug, required: true, type: variableTypes.String } }
        // build new
    });
    fetchQuestion(query).then((element) => {
        console.log(element.titleSlug);
    });
});
