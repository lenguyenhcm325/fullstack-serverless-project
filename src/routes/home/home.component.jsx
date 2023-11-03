import React from "react";
import { HomeContainer } from "./home.styles";
import TodoListsList from "../../components/todo-lists-list/todo-lists-list.component";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../store/user/user.selector";
const Home = () => {
    const userInfo = useSelector(selectUserInfo)
    if (!userInfo){
        return
    }else {
        return (
            <HomeContainer>
                <TodoListsList maxHeight="605px"/>
            </HomeContainer>
        )
    }
}
export default Home;