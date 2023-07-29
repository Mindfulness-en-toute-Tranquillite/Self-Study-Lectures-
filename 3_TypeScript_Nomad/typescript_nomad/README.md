#1 INTRODUCTION
#1.1 무료 강의
#1.2 Welcome
#1.3 Who Should Take This Course
#1.4 Software Requirements

#1.5 Why not JavaScript
-> Javascript는 매우 동적인 유연한 언어이다. 그렇기 때문에 에러를 잘 보여주지 않는다.
ex) 
 1. 숫자 배열 + false → 배열이 사라지고 string으로 바뀜
 2. 함수의 인자가 잘못 들어가도 실행됨 → return값이 NaN일 뿐, 에러가 나지 않음
 3. const a = { a: "A" };
    a.hello();
    실행 시 에러 발생
    → 실행 전에 에러 감지 불가

그렇기에 Typescript 쓴다.  
타입 안정성 → 버그 감소


#2 OVERVIEW OF TYPESCRIPT

#2.0 How Typescript Works
타입스크립트 코드 테스트
https://www.typescriptlang.org/play

타입스크립트 핸드북
https://typescript-kr.github.io/pages/basic-types.html

타입스크립트란? (Strongly typed programming Language)
1. TypeScript는 JavaScript에 추가적인 구문을 추가하여 editor와의 단단한 통합을 지원한다. editor에서 초기에 오류를 잡을 수 있다.

2. TypeScript 코드는 JavaScript가 실행되는 모든 곳(브라우저, Node.js 또는 Deno 및 앱 등)에서 컴파일하여 JavaScript로 변환될 수 있다.

3. TypeScript는 JavaScript를 이해하고 타입 추론(type inference)을 사용하여 추가 코드 없이도 훌륭한 도구를 제공한다.


#2.1 Implicit Types vs Explicit Types
 <Type 시스템>
└ 명시적 정의(변수 선언 시 타입 정의) (Explicit Type)
let a: boolean = "x"
→ 🚫 boolean 타입에 string타입 할당 불가 알림

└ 변수만 생성(타입 추론) (Implicit Type) 
let b = "hello"
→ b가 string 타입이라고 추론
b = 1
→ 🚫 string 타입에 number타입 할당 불가 알림

recommend to use Implicit Type . because readability and simplicity are increasing for developer. Also it is very similar to use as JS.


#2.2 Types of TS part One
<Types of TS(기본)>
1. 배열: 자료형[]
2. 숫자: number
3. 문자열: string
4. 논리: boolean
5. optional
const player : {
    name: string,
    age?:number
} = {
    name: "nico"
}

❌ player.age가 undefined일 가능성 알림
if(player.age < 10) {
}

⭕ player.age가 undefined일 가능성 체크
if(player.age && player.age < 10) {
}

❗ ?를 :앞에 붙이면 optional

6.  Alias(별칭) 타입
type Player = {
    name: string,
    age?:number
}

const player : Player = {
    name: "nico"
}

⭐ 함수에서는 어떻게 쓸까
type Player = {
    name: string,
    age?:number
}

function playerMaker1(name:string) : Player {
    return {
        name
    }
}

const playerMaker2 = (name:string) : Player => ({name})

const nico = playerMaker1("nico")
nico.age = 12

Type Aliases을 사용하여 객체 타입뿐만 아니라 모든 타입에 이름을 지정할 수 있다.
```
type Point = {
x: number;
y: number;
};
type ID = number | string;
type UserInputSanitizedString = string;
```
https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases


JS에서는 Arrow Function 사용할때

const jsArrowFunc = ( parameter ) => {}

이렇게 사용하는데 , TS에서는

const tsFunc = ( parameter : string ) : Player => ( { } )



#2.3 Types of TS part Two
#2.4 Types of TS part Three

#3 FUNCTIONS
#3.0 Call Signatures
#3.1 Overloading
#3.2 Polymorphism
#3.3 Generics Recap
#3.4 Conclusions

#4 CLASSES AND INTERFACES
#4.0 Classes
#4.1 Recap
#4.2 Interfaces
#4.3 Interfaces part Two
#4.4 Recap
#4.5 Polymorphism

#5 TYPESCRIPT BLOCKCHAIN
#5.0 Introduction
#5.1 Targets
#5.2 Lib Configuration
#5.3 Declaration Files
#5.4 JSDoc
#5.5 Blocks
#5.6 Definitely Typed
#5.7 Chain
#5.8 Conclusions