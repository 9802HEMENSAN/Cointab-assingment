import { Button } from '@chakra-ui/react'
import React from 'react'

const MyButton = ({text,onClick}) => {

  return (
    <Button
    _hover={{
      bg: "teal.500",
      color: "white",
      boxShadow: "xl",
      transform: "scale(1.05)",
      transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
    }}
    _focus={{
      outline: "none",
      boxShadow: "outline",
    }}
    borderRadius="8px"
    paddingX="40px"
    paddingY="30px"
    fontWeight="bold"
    fontSize="lg"
    onClick={onClick}
  >
    {text}
  </Button>
  )
}

export default MyButton