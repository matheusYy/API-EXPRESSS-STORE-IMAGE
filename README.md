
# API EXPRESSS-STORE-IMAGE

Uma api pequena e minimalista para armazenamento de imagens

## Documentação da API

#### Retorna todos as imagens

```http
  GET /images
```

| Headers   | Tipo       | Descrição |
| :---------- | :--------- | :---------------------------------- |
| `autorization` | `token-jwt` | **Obrigatório**. Token JWT |

```
 RESPONSE: {
    images: {
      [
        id_image: string,
        url: string
      ]
    },
    size: number,
    data: number,
 }
```
#### Retorna um item

```http
  GET /images/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do usuario  |
| `token` | `token-jwt` | **Obrigatório**. Token JWT | 

```http
 RESPONSE: {
    "userName": string,
    "time":  int,
    "images": [
        {
            "id_image": string,
            "url": "string"
        }
    ]
}
```


#### Registra um usuario

```http
  POST /sign
```

| Corpo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`   | `string` | **Obrigatório**. | 
| `email` | `string` | **Obrigatório**. |
`password`      |`string`      | **Obrigatório**   |  
`location`   | `string`   | **Obrigatório**  
 
 
#### 
```http
  RESPONSE: 
```



#### Acessa uma conta de usuario

```http
  POST /login
```

| Corpo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email` | `string` | **Obrigatório**. |
`password`      |`string`      | **Obrigatório**   |  
 
#### 
```http
  RESPONSE: TOKEN_JWT
```

Recebe dois números e retorna a sua soma.


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar de uma conta na supabase com as seguintes variáveis de ambiente no seu .env

`
DIRECT_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"`
 

`
DATABASE_URL="postgres://postgres.[YOUR-PROJECT-ID]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
`

`
SECRET="shiii..."
`

`SUPABASE_URL="project_url"`

`SUPABASE_ANON="project_ref"`

PORT="8000 || 8080"
`

## Referência

 - [SupaBase JavaScript](https://supabase.com/docs/reference/javascript/introduction)
 - [Express-js](https://expressjs.com/)



## Autores

- [@matheusYy](https://github.com/matheusYy)

