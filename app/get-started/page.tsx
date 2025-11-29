'use client';

import { ThemeProvider } from '@mui/material/styles';
import { 
  Box, 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Divider,
  Typography,
  Stack
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import theme from '../theme';

export default function GetStartedPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(22.19deg, #E1BC80 16.99%, #957FFF 89.32%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: 2, md: 4 },
        }}
      >
        {/* Logo in top-left */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs:  8, md: 30 },
            left: { xs: 20, md: 220 },
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          <Link href="/" passHref>
            <Image
              src="/simbi-logo-icon.svg"
              alt="SIMBI Logo"
              width={120}
              height={120}
            />
          </Link>
        </Box>

        {/* Main Card Container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
            maxWidth: '1075px',
            borderRadius: '32px',
            backgroundColor: '#FDFDFF',
            boxShadow: '0px 19px 86.9px rgba(149, 127, 255, 0.53)',
            overflow: 'hidden',
            minHeight: { xs: 'auto', md: '746px' },
            marginTop: { xs: 6, md: 8 },
          }}
        >
          {/* Left Panel */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#E4DFFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: { xs: 4, md: 6 },
              borderRadius: { xs: '32px 32px 0 0', md: '32px 0 0 32px' },
              gap: { xs: 3, md: '47px' },
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: { xs: '32px', md: '48px' },
                fontWeight: 500,
                letterSpacing: '-1.44px',
                lineHeight: { xs: '40px', md: '60px' },
                color: '#000000',
                textAlign: 'center',
                '& .highlight': {
                  color: '#7A5FFF',
                },
              }}
            >
              Get started with
              <br />
              <span className="highlight">SIMBI</span>
            </Typography>

            <Box
              sx={{
                width: { xs: '150px', md: '215px' },
                height: { xs: '200px', md: '293px' },
                position: 'relative',
              }}
            >
              <Image
                src="/character-illustration.svg"
                alt="SIMBI Character"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Box>

          {/* Right Panel - Form */}
          <Box
            sx={{
              flex: 1,
              padding: { xs: 3, md: '45px 67px 45px 67px' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                letterSpacing: '-0.60px',
                color: '#1E1E2F',
                marginBottom: '24px',
              }}
            >
              Enter your Details
            </Typography>

            <Stack spacing={3.25}>
              {/* First Name */}
              <TextField
                placeholder="First Name"
                fullWidth
                variant="outlined"
                InputProps={{
                  sx: {
                    height: '48px',
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#C9C0D4',
                    },
                    '&:hover fieldset': {
                      borderColor: '#C9C0D4',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7A5FFF',
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    color: '#1E1E2F',
                    padding: '14px',
                    '&::placeholder': {
                      color: '#1E1E2F',
                      opacity: 1,
                    },
                  },
                }}
              />

              {/* Last Name */}
              <TextField
                placeholder="Last Name"
                fullWidth
                variant="outlined"
                InputProps={{
                  sx: {
                    height: '48px',
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#C9C0D4',
                    },
                    '&:hover fieldset': {
                      borderColor: '#C9C0D4',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7A5FFF',
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    color: '#1E1E2F',
                    padding: '14px',
                    '&::placeholder': {
                      color: '#1E1E2F',
                      opacity: 1,
                    },
                  },
                }}
              />

              {/* Email */}
              <TextField
                placeholder="Your Email"
                fullWidth
                type="email"
                variant="outlined"
                InputProps={{
                  sx: {
                    height: '48px',
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#C9C0D4',
                    },
                    '&:hover fieldset': {
                      borderColor: '#C9C0D4',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7A5FFF',
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    color: '#1E1E2F',
                    padding: '14px',
                    '&::placeholder': {
                      color: '#1E1E2F',
                      opacity: 1,
                    },
                  },
                }}
              />

              {/* Password */}
              <Stack spacing={0.5}>
                <Typography
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#6B7280',
                    paddingLeft: '2px',
                  }}
                >
                  Password
                </Typography>
                <TextField
                  defaultValue="********"
                  fullWidth
                  type="text"
                  variant="outlined"
                  InputProps={{
                    sx: {
                      height: '48px',
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#C9C0D4',
                      },
                      '&:hover fieldset': {
                        borderColor: '#C9C0D4',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#7A5FFF',
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '14px',
                      color: 'rgba(30, 30, 47, 0.46)',
                      padding: '14px',
                    },
                  }}
                />
              </Stack>

              {/* Confirm Password */}
              <Stack spacing={0.5}>
                <Typography
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#6B7280',
                    paddingLeft: '2px',
                  }}
                >
                  Confirm Password
                </Typography>
                <TextField
                  defaultValue="********"
                  fullWidth
                  type="text"
                  variant="outlined"
                  InputProps={{
                    sx: {
                      height: '48px',
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#C9C0D4',
                      },
                      '&:hover fieldset': {
                        borderColor: '#C9C0D4',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#7A5FFF',
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '14px',
                      color: 'rgba(30, 30, 47, 0.46)',
                      padding: '14px',
                    },
                  }}
                />
              </Stack>

              {/* Remember Me Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: '#D2D0DE',
                      '&.Mui-checked': {
                        color: '#7A5FFF',
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '12px',
                      fontWeight: 400,
                      color: '#7A5FFF',
                    }}
                  >
                    Remember Me
                  </Typography>
                }
                sx={{ margin: 0 }}
              />

              {/* Continue Button */}
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#7A5FFF',
                  color: '#FDFDFF',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  textTransform: 'none',
                  padding: '14px',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#5E30F7',
                  },
                  marginTop: '8px !important',
                }}
              >
                Continue
              </Button>

              {/* Divider with OR */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={2.875}
                sx={{ marginTop: '16px !important' }}
              >
                <Divider sx={{ flex: 1, borderColor: 'rgba(102, 102, 102, 0.25)' }} />
                <Typography
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#666666',
                  }}
                >
                  OR
                </Typography>
                <Divider sx={{ flex: 1, borderColor: 'rgba(102, 102, 102, 0.25)' }} />
              </Stack>

              {/* Google Sign In Button */}
              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <Image
                    src="/google-icon-signup.svg"
                    alt="Google"
                    width={24}
                    height={24}
                  />
                }
                sx={{
                  borderColor: '#C9C0D4',
                  color: '#7A5FFF',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  textTransform: 'none',
                  padding: '14px',
                  borderRadius: '8px',
                  marginTop: '16px !important',
                  '&:hover': {
                    borderColor: '#7A5FFF',
                    backgroundColor: 'rgba(122, 95, 255, 0.04)',
                  },
                }}
              >
                Continue with Google
              </Button>

              {/* Already Have Account Link */}
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#4976F4',
                  textAlign: 'center',
                  marginTop: '16px !important',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Already Have an Account ?
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}