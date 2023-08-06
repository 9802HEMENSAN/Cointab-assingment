import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyButton from "../components/MyButton";
import axios from "axios";
const HomePage = () => {
  const [AllUsers , setAllUsers] = useState([]);
  const fetchUsers = async() => {
     try {
        const response= await axios.get("http://localhost:8080/fetch-users");
         console.log(response)
         if(response.status===200){
          setAllUsers(response.data);
           alert(response.data.message)
         }else{
          alert(response.data.message)
         }
     } catch (error) {
         alert("Error while getting response from server")
     }
  };

  const DeleteUsers = async() => {
    try {
      const response= await axios.delete("http://localhost:8080/delete-all-users");
      console.log(response )
        if(response.status===200){
          alert("Data has been deleted Successfully !!")
        }
    } catch (error) {
       console.log("Failed to delete all users !!")
    }
  };

  return (
    <Box
    backgroundImage={"url('https://www.lifewire.com/thmb/LpYMzRCsv3Cv6xXiC7Z7lF23tpk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/passage_wallpaper_by_trenchmaker-d4pp3zd-5919d0673df78cf5fa42884c.jpg')"}
    height={"100vh"}
    >
      <Heading
      
        as="h1"
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        color="white"
        fontWeight="bold"
        textAlign="center"
        textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
        mb="4"
      >
        Home Page
      </Heading>
      <Flex  direction={"row"} justifyContent={"space-evenly"} gap={5} alignItems={"center"}  mt={250}>
        <MyButton text="Fetch Users"   onClick={fetchUsers}></MyButton>
        <MyButton text="Delete Users"  onClick={DeleteUsers}></MyButton>
        <Link to="/users">
          <MyButton text="User Details" /> 
        </Link>
      </Flex>
    </Box>
  );
};

export default HomePage;
