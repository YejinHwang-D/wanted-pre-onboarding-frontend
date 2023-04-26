![header](https://capsule-render.vercel.app/api?type=Rounded&color=auto&height=150&section=header&text=wanted-pre-onboarding-frontend&fontSize=40)

### 프리온보딩 프론트엔드 인턴십?

다양한 기업의 기술과제를 수행하는 교육형 인턴십  
프론트엔드 과정 선발 과제 안내 [레파지토리](https://github.com/walking-sunset/selection-task)

### 사용 라이브러리
* React Router
* Axios
* Styled Components, Font-Awesome

### 파일 구조
별표(*)는 주요 파일입니다.
```bash
📦src
 ┣ 📂component
 ┃ ┣ 📂todo
 ┃ ┃ ┣ TodoElement.js*
 ┃ ┃ ┗ TodoExample.js
 ┃ ┣ Header.js
 ┃ ┣ Main.js*
 ┃ ┣ Signin.js*
 ┃ ┣ Signup.js*
 ┃ ┗ TodoList.js*
 ┣ 📂config
 ┃ ┗ setupTests.js
 ┣ 📂context
 ┃ ┣ authContext.js
 ┃ ┣ authProvider.js*
 ┃ ┗ useAuth.js
 ┣ 📂style
 ┃ ┗ global.css
 ┣ App.js*
 ┗ index.js
```

### 주요 파일과 구현 설명
**App.js**  
* React Router를 이용하여 각 경로로 라우팅을 했습니다.  
* 로그인 상태를 전역으로 관리할 Context 태그가 적용된 곳이며, 또한 전역에 공통적으로 적용해줄 Header 컴포넌트를 적용한 곳입니다.  

**📂component/Main.js**  
* '/' 경로에서 보여지는 메인 페이지입니다.  
* 아무 기능이 없으며, 📂component/📂todo/TodoExample.js를 이용하여 예시 화면을 보여줍니다.  

**📂component/Signin.js**  
* '/signin' 경로에서 보여지는 로그인 페이지입니다.  
* Context를 통해 전역으로 관리되는 로그인 상태를 통해 useEffect로 리다이렉트를 합니다.
* 입력값을 state로 관리하며 매번 입력값에 대한 유효성 검사를 통해 '로그인' 버튼의 활성화 여부를 결정합니다.
* submitHandler 함수에서 axios 요청을 진행, 결과를 SignIn 함수(Context)를 통해 로컬 스토리지에 저장합니다.

**📂component/Siginup.js**  
* '/signup' 경로에서 보여지는 회원가입 페이지입니다.
* 전체적인 구현은 Signin.js와 동일합니다.  

**📂component/TodoList.js**
* '/todo' 경로에서 보여지는 투두리스트 페이지입니다.
* useEffect를 통한 리다이렉트 부분에 미흡한 부분이 있습니다. (다른 페이지의 리다이렉트로 생각해주세요.😓)
* submitHandler 함수에서 axios 요청을 통해 새로운 투두를 저장합니다.
* getData 함수에서 axios 요청을 통해 저장된 투두리스트를 불러옵니다. 불러온 데이터는 state(todoList)에 저장됩니다.
* state(todoList)에 저장된 데이터를 반복문을 통해 TodoElement 컴포넌트로 렌더링합니다.

**📂component/todo/TodoElement.js**
* 수정 모드를 state(isUpdatemode)와 isUpdatemodeHandler 함수로 관리합니다.
* updateHandler에서 axios를 통해 수정사항을 업데이트합니다.
* deleteHandler에서 axios를 통해 삭제합니다.
* isCompletedHandler에서 체크박스 클릭 시 updateHandler를 호출합니다.
* isUpdateHandler에서 투두리스트 텍스트 변경 시 updateHandler를 호출합니다.
* useEffect를 통해 체크박스 클릭 시 checked 상태를 변경합니다.


### 실행 방법

```shell
git clone https://github.com/YejinHwang-D/wanted-pre-onboarding-frontend.git
cd wanted-pre-onboarding-frontend
npm install
npm start
```

### 데모 영상

Vercel을 통해 배포.
[배포 링크](https://wanted-pre-onboarding-frontend-ten-ruddy.vercel.app/)
