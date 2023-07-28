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
#2.2 Types of TS part One
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