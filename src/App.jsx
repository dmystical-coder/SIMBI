import { useState } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-10 space-y-6">

      {/* Chakra UI Test */}
      <Box p={5} bg="teal.500" borderRadius="lg">
        <Text color="white" fontSize="xl">
          Chakra UI is working 🎉
        </Text>
        <Button mt={3} colorScheme="pink">
          Chakra Button
        </Button>
      </Box>

      {/* Tailwind Test */}
      <div className="p-5 bg-blue-500 rounded-lg">
        <h1 className="text-white text-xl">TailwindCSS is working 🎉</h1>
        <button className="mt-3 px-4 py-2 bg-black text-white rounded">
          Tailwind Button
        </button>
      </div>

      {/* Mixed Test */}
      <Box className="p-5 bg-green-200 rounded-lg">
        <Text fontSize="xl" mb={3}>
          Both are working together 👇
        </Text>
        <Button colorScheme="teal" className="!bg-red-500">
          Chakra Component + Tailwind Override
        </Button>
      </Box>

      {/* Tailwind direct color test */}
      <div className="bg-red-600 p-6 text-white rounded-lg">
        This red box is using Tailwind utilities directly
      </div>

    </div>
    </>
  )
}

export default App
