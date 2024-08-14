import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { motion } from "framer-motion"


import photoURL from "../../assets/home/teach1.jpg"

import {FaBars} from "react-icons/fa"

const navlinks = [
  { name: 'Home', route: '/' },
  { name: 'Teachers', route: '/instructors' },
  { name: 'Courses', route: '/classes' }
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00ff00",
    },
  },
});


const Navbar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navBg, setNavBg] = useState('bg-[#15151580]');
  const user = true;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  };

  useEffect(() => {
    const darkClass = 'dark';
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add(darkClass);
    }
    else {
      root.classList.remove(darkClass);
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (scrollPosition > 100) {
      if (isHome) {
        setNavBg('bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black')
      }
      else {
        setNavBg('bg-white dark:bg-black dark:text-white text-black')
      }
    } else {
      setNavBg(`${isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-white dark:bg-black dark:text-white text-white'}`)
    }
  }, [scrollPosition])

const handleLogout = () => {
console.log('Logged out');
}

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    /* setIsDarkMode(location.pathname === '/'); */
    setIsLogin(location.pathname == '/login');
    setIsFixed(location.pathname === '/register' || location.pathname === '/login');
  }, [location]);


  return (
    <motion.nav 
    initial ={{opacity:0}}
    animate = {{opacity:1}}
    transistion = {{duration: 0.5}}
    className={`${isHome ? navBg : "bg-transparent dark:bg-black backdrop-blur-2xl"} ${isFixed ? "static" : 'fixed'}
    top-0 transition-colors duration-500 ease-in-out w-full z-10`}
    /* className={`${!isHome ? navBg : "bg-white dark:bg-black backdrop-blur-2xl"} ${isFixed ? "static" : 'fixed'}
    top-0 transition-colors duration-500 ease-in-out w-full z-10`} */ >
      <div className='lg: w-[95%] mx-auto sm:px-6 lg:px-6'>
        <div className='px-4 py-4 flex items-center justify-between'>
          {/* logo */}
          <div onClick = {() => navigate('/')} className='flex-shrink-0 cursor-pointer p1-7 md:p-0 flex items-center'>
           <div> <h1 className='text-2xl inline-flex gap-1 items-center font-bold dark:text-white '>GATE <img src="/logo.png" alt="" className='w-8 h-8' /></h1>
            <p className='font-bold text-[13px] tracking-[4px] dark:text-white'>Get Ready for Future</p></div>
          </div>
          {/*mobile menu icons*/}

            <div className='md:hidden flex items-center'>
              <button type="button" onClick= {toggleMobileMenu} className='text-gray-300 hover:text-white focus:outline-none'>
                <FaBars className='h-6 w-6 hover: text-primary'/>
              </button>
            </div>



          {/*navigational links */}
          <div className='hidden md:block text-secondary dark:text-white'>
            <div className='flex'>
              <ul className='ml-10 flex items-center space-x-4 pr-4'>
                {navlinks.map((Link) => (
                  <li key={Link.route}>
                    <NavLink
                      to={Link.route}
                      style={{whiteSpace: 'nowrap'}}
                      className={Link.name === 'Home' ? 'font-bold text-secondary' : ({ isActive }) => isActive ? 'font-bold text-secondary' : 'font-bold text-primary'}
                    /*  className={({isActive }) =>
                           `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent')?
                           'text-white' : 'text-primary dark:text-white'}`}hover:text-secondary duration-300`  
                         } */
                    >
                      {Link.name}
                    </NavLink>
                  </li>
                ))}

                {/*Based on user*/}
                {user ? null : isLogin ? (
                    <li>
                      <NavLink
                        to="/register"
                        className={({ isActive }) =>
                          `font-bold ${
                        isActive 
                        ? 'text-secondary'
                            : `${
                            navBg.includes('bg-transparent')
                              ? 'text-white'
                              : 'text-primary dark:text-white'
                            }`
                          }hover:text-secondary duration-300`
                        }
                        >
                          Register
                        </NavLink>
                        </li>
                      ) : ( 
                      <li>
                          <NavLink
                           to="/login" 
                          className={({ isActive }) =>
                          `font-bold ${
                          isActive 
                          ? 'text-secondary' 
                          : `${
                          navBg.includes('bg-transparent') 
                          ?'text-white' : 'text-primary dark:text-white'
                          }`}hover:text-secondary duration-300`
                        }> 
                        Login
                        </NavLink>
                        </li>
                )}

                {
                  user && <li>
                    <NavLink to = '/dashboard' className={({ isActive }) =>
                          `font-bold ${
                        isActive 
                        ? 'text-secondary'
                            : `${
                            navBg.includes('bg-transparent')
                              ? 'text-white'
                              : 'text-primary dark:text-white'
                            }`
                          }hover:text-secondary duration-300`
                        }>Dashboard</NavLink>
                  </li>
                }

                {
                  user && <li>
                    <img src = {photoURL}alt='' className='h-[40px] rounded-full w- [40px]' />
                  </li>
                }

                {
                  user && <li> <NavLink onClick={handleLogout} className={'font-bold px-3 py-2 bg-secondary text-white rounded-xl'}>LogOut</NavLink></li>
                }

                {/* {color toggle} */}
                <li>
                  <ThemeProvider theme={theme}>
                    <div className='flex flex-col justify-center items-center'>
                      <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                      <h1 className='text - [8px]'>Light/Dark</h1>
                    </div>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar