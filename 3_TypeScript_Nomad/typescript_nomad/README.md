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
() => {
// 한국의 음식 사전을 만들어보자!
interface TranslatedObject {
[key: string]: string | TranslatedObject;
}

type Words = {
[searchWord: string]: string ;
};

class Word {
constructor(public term: string, public def: string) {}
}

class Dict {
private words: Words; // interface [key : string] : string 으로 이뤄져 있음
// constructor가 없으면, initialize 관련 타입 에러 발생
constructor() {
this.words = {}; // 객체를 통해 보관 [searchWord] = {} === let words = {}
}
add(word: Word) {
// words 객체에 term이 확인 되지 않으면(없다면),
// words searchWord의 값은 = add매서드의 word의 def와 동일 해
if (this.words[word.term] === undefined) {
this.words[word.term] = word.def;
}
}

// 단어 업데이트
// words 객체에 term 프로퍼티가 존재한다면
// newTerm과 = term을 동일하게 만들어주고, 기존의 term을 삭제
update(term: string, newTerm: string) {
if (this.words.hasOwnProperty(term)) {
this.words[newTerm] = this.words[term];
delete this.words[term];
}
}

// word의 term을 객체로 반환 => add 매서드로 인해 term을 검색하게 될 경우 def의가 나옴
def(term: string) {
return this.words[term];
}

// word로 접근 하기보단, term으로 접근 => def 파악
// term이 존재할 때, 제거
remove(term: string) {
// delete할 단어가 word.term과 일치할 때
if (this.words[term] !== undefined) {
delete this.words[term];
}
}

// transForm(term: string) {
// const translated: TranslatedObject = {};

// if (typeof this.def === 'string') {
// translated[term] = this.words[term];
// }
// }

// 검색하는 단어가 없다면 알림창을, 검색하는 단어가 존재한다면 용어의 정의를 출력
searchWord(term: string) {
if (!this.words.hasOwnProperty(term)) {
console.log(`${term}은 저희 사전에 등록되어 있지 않습니다`);
} else {
console.log(
`${term}의 사전적인 의미는 ${this.words[term]}입니다.`,
);
}
}
}

const kimchi = new Word('kimchi', 'one of best food in Korea');
const tteokbokki = new Word(
'tteokbokki',
'representative school food in Korea',
);
const bulgogi = new Word('bulgogi', 'traditional food in Korea');

const obj = {
kimchi: '한국의 대표 음식',
tteokbokki: '한국의 대표 간식',
bulgogi: '한국의 전통 음식',
};

const dictKoreanFood = new Dict();
dictKoreanFood.add(kimchi); // Word 인스턴스
dictKoreanFood.add(tteokbokki);
dictKoreanFood.add(bulgogi);
dictKoreanFood.def('kimchi');
dictKoreanFood.def('tteokbokki');
dictKoreanFood.def('bulgogi');
dictKoreanFood.searchWord('kimchi');
dictKoreanFood.searchWord('tteokbokki');
dictKoreanFood.searchWord('bulgoki');
// dictKoreanFood.transForm('kimchi');
};


#4.2 Interfaces
- Type의 용도 :
1. 특정 값이나 객체의 값에 대한 타입을 지정해줄 수 있다.
2. Type alias(타입에 대한 별명)를 만들어줄 수 있다.
3. 타입을 특정한 값을 가지도록 제한할 수 있다.

타입과 인터페이스의 차이점은 type 키워드는 interface 키워드에 비해서 좀 더 활용할 수 있는 것이 많다는 것이다.(type 키워드는 다양한 목적으로 사용될 수 있음)

즉, interface는 오로지 객체의 형태를 타입스크립트에게 설명해주기 위한 용도로만 사용된다 !

interface는 위와 같이 상속의 개념을 사용할 수 있다 ! (오른쪽은 type을 이용하여 상속한 방법)
⇒ 문법 구조가 객체지향 프로그래밍의 개념을 활용 ⭐️

인터페이스의 또 다른 특징으로는 속성(Property)들을 ‘축적’시킬 수 있다는 것이다.

- Static Members
클래스에는 static 멤버가 있을 수 있다. 이 멤버는 클래스의 특정 인스턴스와 연결되지 않는다. 클래스 생성자 객체 자체를 통해 액세스할 수 있다. static 멤버는 동일한 public, protected 및 private 과 함께 사용할 수도 있다.
```
class MyClass {
static x = 0;
static printX() {
console.log(MyClass.x);
}
}
console.log(MyClass.x);
MyClass.printX();
```

- Literal Types :
- 집합 타입의 보다 구체적인 하위 타입
- 오늘날 TypeScript에는 문자열과 숫자, 두 가지 리터럴 타입이 있는데 이를 사용하면 문자열이나 숫자에 정확한 값을 지정할 수 있다.


#4.3 Interfaces part Two
- implements

implements을 사용하여 클래스가 특정 인터페이스를 충족하는지 확인할 수 있다.
클래스를 올바르게 구현하지 못하면 오류가 발생한다.
implements 절은 클래스가 인터페이스 유형으로 처리될 수 있는지 확인하는 것이다. 클래스의 유형이나 메서드는 전혀 변경하지 않는다.
또한 클래스는 여러 인터페이스를 구현할 수도 있다. 클래스 C는 A, B를 구현한다.
ex) class C implements A, B { }
```
interface Pingable {
ping(): void;
}

// Sonar클래스는 Pingable인터페이스를 implement 했기 때문에 Pingable가 가진 ping메서드를 구현해줘야 합니다.
class Sonar implements Pingable {
ping() {
console.log("ping!");
}
}
```

abstract로 상속받은 클래스를 js로 변환하게되면, abstract코드도 js파일에 남게된다. 그래서 코드 최적화를 위해, interface와 implements를 사용한다. 이 두 기능은 js에는 없으므로 ts를 js로 변환한 코드에서 보이지 않는다. 즉 코드최적화 완료! abstract와 interface/implements는 둘다 같은 기능을 구현한다.(상속받는 클래스가 구현할 기능들을 명시함)


#4.4 Recap
Type Aliases과 Interfaces의 차이점

type과 interface는 TypeScript에서 타입을 정의하는 두 가지 기본적인 방법이다. 그러나 그들 사이에는 몇 가지 중요한 차이점이 있다.

interface는 type보다 더 확장성이 있다. interface는 동일한 이름으로 여러 번 선언할 수 있으며, TypeScript는 이러한 선언을 자동으로 병합한다. 이것은 타입 확장 또는 타입을 추가할 필요가 있을 때 매우 유용할 수 있다. 이를 통해, 프로그래머는 특정 인터페이스에 새로운 프로퍼티를 추가할 수 있으며, 이를 통해 인터페이스를 좀 더 유연하게 사용할 수 있다.

type은 interface와 달리 교차 타입, 유니온 타입, 튜플, 기타 고급 타입 등을 지원한다.

그러나 규모가 큰 프로젝트에서 같은 이름의 인터페이스를 정의하는 것이 항상 바람직한 것은 아니다. 이것은 코드의 가독성을 저하시키고, 프로그래머가 실수로 두 인터페이스를 혼동할 수 있는 문제를 야기할 수 있다. 따라서 이러한 문제를 방지하기 위해, 프로젝트 팀은 대개 한 인터페이스에 여러 선언을 피하고, 대신 인터페이스 확장을 사용하여 추가 프로퍼티를 추가하는 것을 선호.

이에 따라, 기존 인터페이스에 새로운 프로퍼티를 추가하거나, 같은 이름의 새로운 인터페이스를 추가하는 것이 더 나은 방법인지는 프로젝트의 요구 사항, 코드베이스의 크기, 팀의 코딩 스타일 및 가이드라인 등 여러 요소에 따라 달라질 수 있다.

Type Aliases과 Interfaces는 매우 유사하며 많은 경우 자유롭게 선택 가능. 인터페이스의 거의 모든 기능은 type에서 사용할 수 있으며, 주요 차이점은 type을 다시 열어 새 속성을 추가할 수 없음. 반면 인터페이스는 항상 확장 가능.

결론: 대부분의 경우 개인 취향에 따라 선택 가능
(인터페이스 사용을 조금 더 추천)


#4.5 Polymorphism
generic 인자로 전달 가능하다.

```
interface SStorage {
[key:string]:T
}

class LocalStorage {
private storage: SStorage = {}
//Create
set(key:string, value:T){
if(this.storage[key] !== undefined){
return console.log(`${key}가 이미 존재합니다. update 호출 바랍니다.`)
}
this.storage[key] = value
}
//Read
get(key:string):T|void {
if(this.storage[key] === undefined){
return console.log(`${key}가 존재하지 않습니다.`)
}
return this.storage[key]
}
//Update
update(key:string, value:T){
if(this.storage[key] !== undefined){
this.storage[key] = value
} else {
console.log(`${key}가 존재하지 않아 새로 만듭니다.`)
this.storage[key] = value
}
}
//Delete
remove(key:string){
if(this.storage[key] === undefined){
return console.log(`${key}가 존재하지 않습니다.`)
}
delete this.storage[key]
}
clear(){
this.storage = {}
}
}

const stringsStorage = new LocalStorage()

const booleanStorage = new LocalStorage()
```
예외처리 및 CRUD 구현


#5 TYPESCRIPT BLOCKCHAIN
#5.0 Introduction
#5.1 Targets
- typescript설치
npm i -D typescript

package.json 초기화
npm init -y

tsconfig.json설정
디렉터리에 tsconfig.json 파일이 있으면 해당 디렉터리가 TypeScript 프로젝트의 루트임을 나타낸다. tsconfig.json 파일은 프로젝트를 컴파일하는 데 필요한 루트 파일과 컴파일러 옵션을 지정한다.
https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#handbook-content

Target (기본값: ES3)
최신 브라우저는 모든 ES6 기능을 지원하므로 ES6는 좋은 선택. 코드가 이전 환경에 배포된 경우 더 낮은 target을 설정하거나 최신 환경에서 코드 실행이 보장되는 경우 더 높은 target을 설정하도록 선택할 수 있다.
ex) 화살표 함수() => this는 ES5 이하이면 함수 표현식으로 바뀐다.

특별한 ESNext 값은 TypeScript 버전이 지원하는 가장 높은 버전을 나타낸다. 이 설정은 다른 TypeScript 버전 간에 동일한 의미가 아니며 업그레이드를 예측하기 어렵게 만들 수 있으므로 주의해서 사용해야 한다.
https://www.typescriptlang.org/tsconfig#target

"build": "tsc" 또는 "npx tsc"

- Create File in Terminal
MAC : touch tsconfig.json
Window : code tsconfig.json // 이후 Crtl + s (저장)

npm i -g typescript
tsc --init 명령어로 기본적인 tsconfig.json 파일 생성이 가능.


#5.2 Lib Configuration
- lib

타입스크립트에게 어떤 API를 사용하고 어떤 환경에서 코드를 실행하는 지를 지정할 수 있다.
(target 런타임 환경이 무엇인지를 지정한다.)
프로그램이 브라우저에서 실행되면 lib에 "DOM" 유형 정의를 할 수 있다.
DOM: window, document 등
ex) "lib": ["ES6","DOM"]

lib property를 설정하지 않으면 default속성으로는 "lib": ["ES5", "ES6", "ES7", "ES2015.Promise"] 을 가지고 있다. 여기서 "DOM"속성값을 입력을 해주지 않아도 DOM객체를 불러올 수 있는 방법이 있는 데 @types/node 라이브러리를 설치해주면 가능하다.
$npm install --save-dev @types/node
typescript 컴파일러가 누락된 DOM객체를 찾을 수 있게된다.


#5.3 Declaration Files
- strict

모든 엄격한 타입 검사 옵션을 활성화한다.
strict 플래그는 프로그램 정확성을 더 강력하게 보장하는 광범위한 타입 검사 동작을 가능하게 한다.

tsconfig.json에서 "strict": ture를 통해 strict mode로 해주면, Declaration Files가 없는 경우에 대해서도 에러를 띄워준다.


#5.4 JSDoc
JSDoc는 쉽게 말해서 코멘트로 이루어진 문법. 함수 바로 위에 코멘트를 적어주면 된다. ‘/**’ 로 시작.


@ts-check
JavaScript 파일에서 오류를 활성화하려면 // @ts-check를 .js 파일의 첫 번째 줄에 추가하여 TypeScript가 오류를 발생시키도록 한다. TypeScript는 여러 오류를 제공할 수 있다.
이러한 오류를 무시하고 싶다면 // @ts-ignore 또는 // @ts-expect-error를 추가하여 특정 줄의 오류를 무시할 수 있다.
https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check

JSDoc Reference
JSDoc 주석을 사용하여 JavaScript 파일에 type 정보를 제공할 수 있다. (자바스크립트 파일에서 타입 정보를 제공할 수 있다.)
https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html

@param, @returns
```
/**
* @param {string} p1 - A string param.
* @param {string=} p2 - An optional param (Google Closure syntax)
* @param {string} [p3] - Another optional param (JSDoc syntax).
* @param {string} [p4="test"] - An optional param with a default value
* @returns {string} This is the result
*/
function stringsStringStrings(p1, p2, p3, p4) {
// 코드...
}
```
https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#param-and-returns


#5.5 Blocks
static 함수는 클래스 안에서 사용하는 함수인데, 클래스 인스턴스가 없어도 부를 수 있는 함수.

ts-node
ts-node는 Node.js용 TypeScript 실행 엔진 및 REPL. JIT는 TypeScript를 JavaScript로 변환하므로 사전 컴파일 없이 Node.js에서 TypeScript를 직접 실행할 수 있다.
npm i ts-node -D
https://www.npmjs.com/package/ts-node

nodemon
npm i nodemon -D
https://www.npmjs.com/package/nodemon

esModuleInterop
CommonJS 모듈을 ES6 모듈 코드베이스로 가져오려고 할 때 발생하는 문제를 해결한다. ES6 모듈 사양을 준수하여 CommonJS 모듈을 정상적으로 가져올 수 있게 해준다.
https://www.typescriptlang.org/tsconfig/#esModuleInterop

블록체인 시리즈
https://www.youtube.com/playlist?list=PL7jH19IHhOLOJfXeVqjtiawzNQLxOgTdq


#5.6 Definitely Typed
DefinitelyTyped
TypeScript type 정의를 위한 리포지토리.
https://github.com/DefinitelyTyped/DefinitelyTyped

@types/node
npm i @types/node -D


#5.7 Chain
#5.8 Conclusions