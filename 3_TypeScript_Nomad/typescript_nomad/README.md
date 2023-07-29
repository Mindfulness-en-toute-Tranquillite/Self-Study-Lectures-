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
 <Types of TS(part II)>
✅ readonly 사용하기
JavaScript에서는 mutability(변경 가능성)이 기본값이지만 타입스크립트에서는 readonly를 통해 읽기 전용으로 만들 수 있다. 
type Player = {
    readonly name:string
    age?:number
}

const playerMaker = (name: string): Player => ({name})

const nico = playerMaker("nico")
🚫 nico.name = "aa"

const numbers: readonly number[] = [1, 2, 3, 4]
🚫 numbers.push(1)
❗ readonly가 있으면 최초 선언 후 수정 불가
    ⇒ immutability(불변성) 부여
        but, javascript에서는 그냥 배열

✅ Tuple
정해진 개수와 순서에 따라 배열 선언
const player: [string, number, boolean] = ["nico", 1, true]
❗ readonly도 사용가능 ⇒ readonly [...] 형태

✅ undefined, null, any
any: 아무 타입
'무엇이든'. 말 그대로 무엇이든 입력할 수 있게된다. 타입체크를 '비활성화' 시켜버린다.

```
const a : any[] = [1,2,3,4]
const b : any = true

a +b //별다른 오류를 내뱉지 않는다.
```
이것은 좋지않으며, 타입스크립트의 타입의 보호를 받을 수 없다. 하지만 가끔쓸 수 있으며 그럴땐 any를 써야 한다.


undefined: 선언X 할당X
null: 선언O 할당X


#2.4 Types of TS part Three
<Types of TS(part II)>
✅ unknown
모든 값을 나타낸다. 이것은 any타입과 비슷하지만 any보다 unknown이 더 안전하다. 이유는 unknown값으로 작업을 수행하는 것은 합법적이지 않기 때문. 변수의 타입을 미리 알지 못할때 사용할때마다 변수타입 지정을 요구한다.
let a:unknown

if(typeof a === 'number'){
    let b = a + 1
}
if(typeof a === 'string'){
    let b = a.toUpperCase()
}
🚫 let b = a + 1

✅ void
값을 반환하지 않는 함수의 반환 값을 나타낸다. 함수에 return 문이 없거나 해당 return 문에서 명시적 값을 반환하지 않을 때 항상 유추되는 타입. 아무것도 return 하지않는 함수를 대상으로 사용함. 하지만 타입스크립트는 아무것도 return하지 않는 함수를 자동으로 인식한다.

function hello() {
    console.log('x')
}
const a = hello()
🚫 a.toUpperCase()


function hello():void{
console.log('x')
}

// 굳이 :void를 적지않아도된다.



✅ never
일부 함수는 값을 반환하지 않는다.함수가 절대 return 하지 않는다.
이는 함수가 예외를 throw하거나 프로그램 실행을 종료함을 의미한다. return 하지않고 오류를 발생시킴
function hello():never {
    throw new Error("zzz")
    🚫return "a"
}

function temp(name:string|number):never {
    if(typeof name === "string"){
        name
    } else if(typeof name === "number"){
        name
    } else {
        name
    }
}

if 안에서는 string형의 name 반환
else if 안에서는 number형의 name 반환
else 안에서는 never형의 name 반환
⇒ 즉, 제대로 인자가 전달되었다면 else로 올 수 없음


#3 FUNCTIONS
#3.0 Call Signatures
type Add = {
(a: number, b: number): number;
}
// type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b

Call(=Function) Signature란 함수의 매개변수와 반환 값의 타입을 모두 type으로 미리 선언하는 것이다
* React에서 함수로 props를 보낼 때, 어떻게 작동할지 미리 설계 가능


****
5:26 에서 {}를 사용했을 때 오류가 발생하는 이유.
{}를 사용하면 그 값이 반환값이 함수 내부의 내용으로 처리가 된다
1. const add:Add = (a,b) => a+b 를 함수로 풀면 다음과 같게 된다.
function add(a, b) {
return (a+b)
}

2. const add:Add = (a,b) => {a+b} 를 함수로 풀면 다음과 같게 된다.
function add(a, b) {
a+b;
}

즉 애로우함수에서 {}를 사용하게 되면 그 안의 값은 반환이 아니라 함수 내부 내용으로 처리 되기에 반환값이 없는 void로 처리된다. 이에 따라 위에서 미리 선안한 Add자료형의 반환값은 number라고 정해놓은 내용과 충돌하기에 에러가 발생.
=>
1. 화살표 함수에서 {}를 생략하면 return이 생략된 것
2. 즉 a + b 와 { return a+b } 는 같은 뜻
3. {a+b}라고 하면 아무것도 리턴하지 않기 때문에 에러남
****

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