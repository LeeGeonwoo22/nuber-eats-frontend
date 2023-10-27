# 복습

## 1. history.push 

`history.push("/login");`
`history.push("/");`

## 2. ClientRoutes

```
const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];
```  
ClientRoutes는 fragment를 리턴하는 컴포넌트이다. 하지만 <Switch> 태그 때문에 렌더링을 할 수 없다 . ( 아래 참조)
*fragment ((html 태그의..) 조각)

그래서 기존에  `<>` 대신에 `[]`로 감싸줘야한다. 이제 ClientRoutes는 여러 route를 가진 변수가 된것이다. 

```
return (
    <Router>
      <Switch>
        {data.me.role === "Client" && ClientRoutes}
        <Redirect from="/potato" to="/" />
      </Switch>
    </Router>
)
```

<Switch> 가 있다면 한번에 route만 render하라고 알려주는 태그이다. 
<Switch> 가 가질수 있는 child는 route밖에 없다. 

<Redirect>는 react-router-dom에서 제공하는 컴포넌트이다. from과 to같은 proprs 라는 것이 있다. 


## 3. path = "/" 

```
<Route path="/">
<Route path="/" exact>
```        

path에 exact를 넣으면 react router에선 기본적으로 nothing 으로 시작한다. 