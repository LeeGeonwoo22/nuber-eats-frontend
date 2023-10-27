## 1. switch와 router 사이에 둠

<Header />

```
      <Router>
        <Header />
        <Switch>
          {data.me.role === "Client" && ClientRoutes}
          <Redirect from="/potato" to="/" />
        </Switch>
      </Router>
```

반드시 Router 안에 둬야하며 Router 밖에 두면 Header를 사용할 수 없다. 

## 2. tailwindcss를 알려주고싶다.! 
header는 높이와 관련이 깊으며 , nav bar를 css 할때 주변 padding을 보고 padding 정해주고 코딩해줘야 반응형 디자인 만들기에 더 유리하다. 
사이즈는 %,em, rem, px 로 정할 수있다. 

### 1. em = document's font size. 1 em = 16px. em은 element font 크기에 좌우된다.  

font 50px,
m-t : 2em !== 100px

### 2. rem 

font 50px
m-t : 2em === 100px

## 3. Fontawesome 설치

npm i --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome

추가 스타일

npm install --save @fortawesome/free-brands-svg-icons @fortawesome/free-regular-svg-icons

리액트 전용이다. 

각종 브랜드 로고와 아이콘들을 넣을 수 있다. 

## 4. const Header: React.FC = () => {}

React.FC 는 React의 function components라는 뜻이다. 이것이 이 앱에선 왜 필요한가 ? 

```
Interface IHeaderProps {
    email : string;
}

React.FC<IHeaderProps> = ({email}) => {
    <div> 
    ...
    </div>
}
```
본디 React.FC<IHeaderProps> 가 담겨져 있었다.

하지만 누가 로그인했는지 알고 싶은데 컴포넌트가 깊숙히 있다면?
(=그리고 그 끝에 유저의 email을 알고싶다면?)

custom Hook을 만들어준다 (useHook)

Header가 깊숙히 있다고 가정하고, 혹은 props를 Header로 보내고 싶지않을때  `const Header: React.FC = () => {}` 일때,
`Hook`을 아래코드와 같이 불러준다. 
```
export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <header className="py-4">
      <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
        <img src={nuberLogo} className="w-24" alt="Nuber Eats" />
        <span className="text-xs">{data?.me.email}</span>
      </div>
    </header>
  );
};
```

apollo client는 쿼리가 cache 였다는 것을 알고있다. 그리고 그것을 우리에게 정보로 준다. 이것이 우리가 query hook을 사용하는 이유가 된다. 

header는 api로 가지않고 cache로 간다. 그렇게 되면 props에서 header로 보내는것을 방지 할 수 있으며 header에서 props로 보내는 것은 상관없다. 

최종 코드에선 email 대신에 아이콘을 보내는것으로 하였다. 