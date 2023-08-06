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
Function(=Method) Overloading은 직접 작성하기보다 외부 라이브러리에 자주 보이는 형태로, 하나의 함수가 복수의 Call Signature를 가질 때 발생한다. 동일한 이름에 매개 변수와 매개 변수 타입 또는 리턴 타입이 다른 여러 버전의 함수를 만드는 것. TypeScript에서는 오버로드 signatures을 작성하여 "다양한 방식으로 호출할 수 있는 함수"를 지정할 수 있다.

type Add = {
(a: number, b: number): number,
(a: number, b: string): number
}

const add: Add = (a, b) => {
if (typeof b === "string") return a;
return a + b;
}

매개변수의 데이터 타입이 다른 경우 예외 처리

type Add2 = {
(a: number, b: number): number,
(a: number, b: number, c: number): number
}

const add2: Add2 = (a, b, c?: number) => {
if (c) return a + b + c;
return a + b;
}

매개변수의 수가 다른 경우 예외 처리

위와 같은 함수는 거의 없지만 외부 라이브러리에서 활용될 수 있다

router.push("/home");

router.push({
path: "/home",
state: 1
});

예를 들어, Next.js의 라우터 push가 대충 두 가지 방법으로 페이지를 이동한다고 할 때,

type Config = {
path: string,
state: number
}

type Push = {
(config: Config): void,
(config: string): void
}

const push: Push = (config) => {
if (typeof config === "string") console.log(config);
else console.log(config.path);
}

패키지나 라이브러리는 위와 같이 두 가지 경우의 Overloading으로 디자인되어 있을 것이다.



#3.2 Polymorphism
✅ polymorphism(다형성)
❓poly란?
- many, serveral, much, multi 등과 같은 뜻
❓morphos란?
- form, structure 등과 같은 뜻
❗polymorphos = poly + morphos = 여러 다른 구조

인자들과 반환값에 대하여 형태(타입)에 따라 그에 상응하는 형태(타입)를 갖을 수 있다.
다형성이란, 여러 타입을 받아들임으로써 여러 형태를 가지는 것을 의미.

concrete type
- number, boolean, void 등 지금까지 배운 타입

generic type
- 타입의 placeholder

─ 예시 ────────────────────────
type SuperPrint = { (arr: T[]): void }
type SuperReturn = { (arr: T[]): T }

const superPrint: SuperPrint = (arr) => {
    arr.forEach(i => console.log(i))
}
const superReturn: SuperReturn = (arr) => arr[0]

superPrint([1, 2, false, true])
console.log(superReturn([1, 2, 3, 4]))
────────────────────────────

any와의 차이점은 해당 타입에 대한 정보를 잃지 않는다.
any는 any로서 밖에 알 수 없지만 generics는 타입 정보를 알 수 있다.


#3.3 Generics Recap
Generic : C#이나 Java와 같은 언어에서 재사용 가능한 컴포넌트를 만들기 위해 사용하는 기법. 단일 타입이 아닌 다양한 타입에서 작동할 수 있는 컴포넌트를 생성할 수 있다. 변수나 인수에 타입을 정해주는 Concrete같이 딱딱한 기법과 달리 어떤 타입을 쓸지 정해주지 않고 그 타입에 대해 어떤 변수를 넣어주냐에 따라 결정되는 유연한 기법이다. 타입스크립트에서 제네릭을 통해 인터페이스, 함수 등의 재사용성을 높일 수 있다.
any와 가장 큰 차이는 타스의 타입 체커로부터 보호를 못받는다는 것이다

적용방법 (type = {a : T} : T)

function identity< Type >(arg: Type): Type {
return arg;
}

// 제네릭 화살표 함수 (tsx기준)
const identity=< Type extends {} >(arg: Type):Type => {
return arg;
}

let output = identity< string >("myString"); // 첫 번째 방법
let output = identity("myString"); // 두 번째 방법
// 두 번째 방법은 type argument inference(타입 인수 유추)를 사용한다. 즉, 컴파일러가 전달하는 인수 유형에 따라 자동으로 Type 값을 설정하기를 원한다.

그렇다면 그냥 any를 넣는 것과 Generic의 차이는 무엇일까?

type SuperPrint = {
(arr: any[]): any
}

const superPrint: SuperPrint = (arr) => arr[0]

let a = superPrint([1, "b", true]);
// pass
a.toUpperCase();

any를 사용하면 위와 같은 경우에도 에러가 발생하지 않는다

type SuperPrint = {
(arr: T[]): T
}

const superPrint: SuperPrint = (arr) => arr[0]

let a = superPrint([1, "b", true]);
// error
a.toUpperCase();

Generic의 경우 에러가 발생해 보호받을 수 있다
* Call Signature를 concrete type으로 하나씩 추가하는 형태이기 때문!

type SuperPrint = {
(arr: T[], x: M): T
}

const superPrint: SuperPrint = (arr, x) => arr[0]

let a = superPrint([1, "b", true], "hi");

위와 같이 복수의 Generic을 선언해 사용할 수 있다.

#3.4 Conclusions
제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법이다.

type Player = {
name: string,
extraInfo: T
};

type MePlayer = Player;

type MeExtra = {age: number};

const player: MePlayer = {
name: "joseph",
extraInfo: {
age: 23
}
};

const player2: Player = {
name: "Yee",
extraInfo: null
};

Generic은 위와 같이 원하는 만큼 커스텀 및 재사용이 가능하다.

아마 직접 작성하기보다 패키지/라이브러리의 Generic을 활용하는 경우가 더 많을 것이다.

const numArr: Array = [1, 2, 3, 4];

const [state, setState] = useState();

함수 뿐만 아니라 다양한 경우의 Generic을 활용할 수 있는데, 예를 들어 Array 기본 형태나 React의 useState가 Generic으로 디자인되어 있다

#4 CLASSES AND INTERFACES
#4.0 Classes
[Abstract Class]
- 다른 클래스가 상속받을 수 있는 클래스
- 직접 새로운 인스턴스 생성 X

주요 코드)
abstract class User {
constructor(
private firstName:string,
private lastName:string,
public nickname:string
) {
abstract getNickName():void
// getFullName() {
// return `${this.firstName} ${this.lastName}`
// }
}


TIP)
private를 사용하면 상속받은 클래스 안에서 마저도 this 사용해 접근 불가능
그래서 protected를 사용하면 상속받은 클래스 안에서 this 사용해 접근 가능
물론 protected로 지정된 것들은 외부에서 사용이 불가능
추상클래스 안에 메소드는 적어서는 안되고 call signature만 적어야 함
추상클래스 안의 메소드는 결국 구현이 되지 않는다고 나옴
abstract 를 사용하면 상속받을 class에 'extends' 를 꼭 추가해주기!
new User는 사용할 수 없다 -> 상속만 가능

- constructor의 매개변수를 지정해주면 this.firstName = firstName 같은 자바스크립트 코드로 자동 변환해준다.
- private 키워드: 클래스 바깥에서 프로퍼티나 메서드에 접근할 수 없게 하는 키워드. 상속받은 클래스에서도 접근할 수 없다. 선언한 클래스 안에서만! (자바스크립트에서는 작동x)
- protected 키워드: 자식 클래스에서는 프로퍼티나 메서드에 접근할 수 있게 하고, 외부에서는 접근할 수 없도록 하는 키워드.
- public 키워드: 다 가능- 
- 추상 클래스: 다른 클래스가 상속 받을 수는 있지만 새로운 인스턴스는 만들 수 없는 클래스. 선언한 클래스 안, 상속받은 클래스 안
- 추상 메서드: 추상 클래스 안에 만들 수 있는 메서드. 추상 클래스를 상속 받는 모든 것들이 구현 해야하는 메서드를 의미한다. 메서드를 구현해서는 안되고 call signature만 작성해야한다.

객체 지향 프로그래밍 강의영상
https://www.youtube.com/watch?v=cg1xvFy1JQQ
https://www.youtube.com/watch?v=IeLWSKq0xIQ&list=RDCMUCUpJs89fSBXNolQGOYKn0YQ&index=2


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