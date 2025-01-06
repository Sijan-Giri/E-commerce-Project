export interface PropsType{
    text : string,
    onSubmit : (data:UserDataType) => void
  }

  export interface UserDataType{
    username : string,
    email : string,
    password : string
  }

  export interface UserLoginDataType{
    email : string,
    password : string
  }

  export enum Status{
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}