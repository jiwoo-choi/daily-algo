import { QuestionPayload } from "./question";

//variable로 들어올떄의 값잆니다.. dictionary라 값을 강제해줬습니다.
export type variableElement = {value : string, required? :boolean, type: variableTypes};

//variable Type들입니다.
export enum variableTypes {
String = "String",
Int = "Int",
}

//Object입니다. <key, variableElement> 쌍으로 되어있습니다.
interface variableObjectType {
 [key: string] : variableElement
}

interface fieldDictionary {
    [key:string]:Array<string | fieldDictionary>
} 


//https://www.typescriptlang.org/docs/handbook/basic-types.html#object
// 이 명세를 받는 어떤 클래스라도 반드시 graphQL query의 속성을 받습니다. 
// 이 명세를 받는 클래스는 역시 web URL Request를 위한 쿼리를 만드는 역할을 해줘야합니다.
export interface graphQLQueryConstructable {
    readonly operation : string;
    readonly variables: variableObjectType;
    readonly fields: Array<string | fieldDictionary>;
    readonly requestQuery: string;
}

//factory pattern.
export interface createGraphQL {

}
//        //https://frontendsociety.com/how-to-cast-an-array-of-objects-into-a-dictionary-object-in-typescript-2a3b9790da81

export class graphQLQuery implements graphQLQueryConstructable {

   operation: string;
   variables: variableObjectType;
   fields: Array<string | fieldDictionary>;

    constructor({operation, fields, variables}:{operation: string, variables:variableObjectType, fields:Array<string | fieldDictionary>}) {
        this.operation = operation
        this.fields = fields
        this.variables = variables
    }
    
    // TODO : do little compiling here
    public get requestQuery() : string {

        const queryParameter: string = Object.keys(this.variables).reduce((prev, curr) => {
            let temp : string[] = prev;
            let mark = this.variables[curr].required === true ? "!" : ""
            temp.push("$" + curr + " : " + this.variables[curr].type + mark);
            return temp;
        }, [] as string[]).join(",");

        const operationParameter : string = Object.keys(this.variables).reduce( (prev, curr) => {
            let temp = prev;
            temp.push(curr + ":" + "$" +curr );
            return temp;
        }, [] as string[]).join(",");

        function fieldToString(fields:Array<string | fieldDictionary>) :string {
            let result: string[] = [];
            for (const fieldElement of fields) {
                if (typeof(fieldElement) !== "string"){
                    for (const nestedElement of Object.keys(fieldElement)) {
                        result.push(nestedElement + "{" + fieldToString(fieldElement[nestedElement]) + "}" )
                    }
                } else {
                    result.push(fieldElement)
                }
            }
            return result.join(",");
        }
        

        const parentheses = (paramter:string):string => {
            return (paramter === "") ? "" : " ( " + paramter + " ) "
        } 
        
        
        return JSON.stringify({
            operation: this.operation,
            variables: Object.keys(this.variables).reduce((prev, curr) => {
                prev[curr] = this.variables[curr].value
                return prev;
            }, {} as {[key: string]:any} ),
            query: "query " + parentheses(queryParameter) + "{ " +  this.operation + parentheses(operationParameter) + "{" + fieldToString(this.fields) + "} }" 
        })
    }
}
