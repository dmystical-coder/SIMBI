"use client";

import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Box minH="100vh" bg="#fafafa">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.5)"
          zIndex={998}
          display={{ base: "block", lg: "none" }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content */}
      <Box
        ml={{ base: 0, lg: "274px" }}
        minH="100vh"
      >
        <TopNav onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <Box p={{ base: "20px", md: "40px" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}