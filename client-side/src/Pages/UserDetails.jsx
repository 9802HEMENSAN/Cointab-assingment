import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Avatar,
  Image,
  Select,
  Center,
  Flex,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyButton from "../components/MyButton";
import axios from "axios";
const UserDetails = () => {
  const [AllUsers, setAllUsers] = useState([]);
  const [page, setpage] = useState(1);
  const [gender, setGender] = useState("all");
  const fetchUserDetails = async (page, gender) => {
    try {
      let URL = `http://localhost:8080/get-all-users?page=${page}&limit=10`;
      if (gender === "male" || gender === "female") {
        URL = `http://localhost:8080/get-all-users?gender=${gender}&page=${page}&limit=10`;
      }
      const response = await axios.get(URL);
      console.log(response);
      if (response.status == "200") {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.log("Failed to get all users !!");
    }
  };

  useEffect(() => {
    fetchUserDetails(page, gender);
    console.log(gender);
  }, [page, gender]);

  return (
    <Box
      bgGradient="linear(to-l, green.300, yellow.300)"
      height={"auto"}
      minHeight={"100vh"}
      padding={10}
    >
      <Heading
        as="h1"
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        color="teal.500"
        fontWeight="bold"
        textAlign="center"
        textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
        mb="4"
      >
        All UserDetails
      </Heading>
      <Link to="/">
        <MyButton text="Back to Home"></MyButton>
      </Link>
      <Box m={5} width={56}>
        <Select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
      </Box>
      {/* Pagination */}
      <Box>
        <Button isDisabled={page === 1} onClick={() => setpage(page - 1)}>
          PREV
        </Button>
        <Button isDisabled>{page}</Button>
        <Button
          isDisabled={page === Math.ceil((AllUsers.length * 10) / 10)}
          onClick={() => setpage(page + 1)}
        >
          NEXT
        </Button>
      </Box>
      <Box>
        <Table variant="striped" colorScheme="teal" size="md">
          <Thead>
            <Tr>
              <Th>Picture</Th>
              <Th>Full Name</Th>
              <Th>Location</Th>
              <Th>Email</Th>
              <Th>Username</Th>
              <Th>Age</Th>
            </Tr>
          </Thead>
          <Tbody>
            {AllUsers.length > 0 ? (
              AllUsers?.map((user) => (
                <Tr key={user.id}>
                  <Td>
                    <Image
                      boxSize="50px"
                      src={user.picture_thumbnail}
                      alt="User"
                    />
                  </Td>
                  <Td>
                    {user.title} {user.first_name} {user.last_name}
                  </Td>
                  <Td>
                    {user.street_number} {user.street_name}, {user.city},{" "}
                    {user.state}, {user.country}, {user.postcode}
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.dob_age}</Td>
                </Tr>
              ))
            ) : (
              <Center>
                <Box
                m={25}
                  fontSize={25}
                  color="white"
                >
                  No Users Available
                </Box>
              </Center>
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default UserDetails;
