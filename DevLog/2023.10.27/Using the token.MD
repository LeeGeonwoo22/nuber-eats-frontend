## Using the token

유저가 로그인하면 프로필을 가져옴 . 가져오고 난후 결정할 것

백엔드의 me query를 보면서 무엇을 가져올지 front-end 부분에서 정한다. (gql)

! meQuery를 불러오지 못함.
```
const ME_QUERY = gql`
  query me {
    me {
      id
      email
      role
      verified
    }
  }
`;
```
graphql 스키마 확인결과 email이 id보다 순서가 앞이었음. 순서교체
```
const ME_QUERY = gql`
  query me {
    me {
      email
      id
      role
      verified
    }
  }
`;
```

! query 에서의 formState 속성
기존에 formState : {errors}로 'error'를 핸들링 하였으나, 이것은 mutation에서 보여진것으로 파악. query에서는 'error' 그래도 쓴다. 자세한것은 추후 더 확인

! token 이 없으면 logged-in-router 에서의 `console.log(error);` 가 `undefined`로 뜰것이다. 

! authorization link 
`Apollo Client`의 uri는 `apollo httpLink`에 보낼 수 있다. 
나중에 `subscribe`를 만들때 `web socket`이 필요한데 `web socket` 링크도 만들어줘야한다. 

그리고 link는 그냥 연결할 수 있는 것들이다. http, auth, web sockets 링크들을 가질것이다. 