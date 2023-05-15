import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/hubnex white.png'
import searchIcon from '../../assets/search_icon.png'
import Search from '../searchbar/Search'
import MobileNavbar from './MobileNavbar'
import './navbar.css'
import { useOnHover } from './useOnHover'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import menu from '@assets/menuUp.png'
import close from '@assets/Xmark.png'



const Navbar = () => {





  const [searchToggle, setSearchToggle] = useState(false);



  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);


  const handleSearch = () => {
    setSearchToggle((prev) => !prev)
  }
  const handleOpen = () => {
    setOpen((prev) => !prev)
  }

  const industrydropdownRef = useRef(null);
  const servicedropdownRef = useRef(null);
  const [isServiceMenuDropDownOpen, setServiceMenuDropDownOpen] = useState(false);
  const [isIndustryMenuDropDownOpen, setIndustryMenuDropDownOpen] = useState(false);

  // Function to close dropdown
  const closeServiceHoverMenu = () => {
    setServiceMenuDropDownOpen(false);
  };
  const closeIndustryHoverMenu = () => {
    setIndustryMenuDropDownOpen(false);
  };

  useOnHover(industrydropdownRef, closeIndustryHoverMenu);
  useOnHover(servicedropdownRef, closeServiceHoverMenu);

  const isMobile = () => {
    const match = window.matchMedia("(max-width:315px)");
    return (match && match.matches);
  }

  const handleIndustries = () => {
    setDropIndustries((prev) => !prev);
    setDropServices(false);
  }

  const handleServices = () => {
    setDropServices((prev) => !prev);
    setDropIndustries(false);
  }




  const [fix, setFix] = useState(false)
  useEffect(() => {
    const setFixed = () => {
      if (window.pageYOffset > 20) {
        setFix(true)
      } else {
        setFix(false)
      }
    };
    window.addEventListener('scroll', setFixed);
    return () => window.removeEventListener('scroll', setFixed);
  }, [])




  return (

    <div className= "w-full h-20 lg:h-[110px] fixed z-40   bg-black  bg-opacity-60 text-white" >
      <div className=' w-full h-20 lg:h-[110px] fixed bg-black bg-opacity-70 lg:bg-none lg:bg-opacity-0  z-40'>

        {searchToggle && <Search toggler={searchToggle} />}

        <div className=' h-full xl:max-w-[95%] xl:min-w-[90%] w-[90%] m-auto items-center flex justify-between'>

          <div className='cursor-pointer z-50'>
            <Link to='/' className=' flex gap-2 items-center'>
              <img src={logo} alt='Logo' className=' md:w-[170px] w-[120px] ' />
            </Link>
          </div>

          <div className=' text-[18px] hidden xl:flex xl:gap-16 items-center font-gilroy-semi-bold text-white z-10'>

            <NavLink to='/about' className={({ isActive }) => isActive ? 'decoration-white underline decoration-2 underline-offset-4' : 'hover-underline-animation'}>About Us</NavLink>

            <div ref={servicedropdownRef} className=' flex items-center relative'>

              <NavLink to='/service' className={({ isActive }) => isActive ? ` ${setActive(true)} decoration-white underline decoration-2 underline-offset-4 ` : 'hover-underline-animation'}>Services</NavLink>

              <span onMouseOver={() => setServiceMenuDropDownOpen(true)} className=' cursor-pointer' onClick={handleServices}>{isServiceMenuDropDownOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDown />}</span>

              {
                isServiceMenuDropDownOpen &&
                <div className="flex  bg-white/80 bg-opacity-10 backdrop-blur-2xl w-[300px] absolute top-[30px] right-0 rounded-lg">
                  <div className=' flex flex-col'>
                    <Link to='/service/ai-ml'><div className='text-black p-4 text-center'>AI-ML</div></Link>
                    <Link to='/service/cloud-services'><div className='text-black p-4 text-center'>Cloud Services</div></Link>
                    <Link to='/service/software-testing'><div className='text-black p-4 text-center'>Software Testing</div></Link>
                  </div>
                  <div className=' flex flex-col'>
                    <Link to='/service/iot'><div className='text-black p-4 text-center'>IOT</div></Link>
                    <Link to='/service/digital-marketing'><div className='text-black p-4 text-center'>Digital Marketing</div></Link>
                  </div>
                </div>
              }

            </div>

            <div ref={industrydropdownRef} className=' flex items-center relative justify-center'>

              <NavLink to='/industries' className={({ isActive }) => isActive ? 'decoration-white underline decoration-2 underline-offset-4  ' : 'hover-underline-animation'}>Industries</NavLink>

              <span onMouseOver={() => setIndustryMenuDropDownOpen(true)} className=' cursor-pointer' onClick={handleIndustries}>{isIndustryMenuDropDownOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDown />}</span>
              {
                isIndustryMenuDropDownOpen &&
                <div className="flex justify-center bg-white/80 bg-opacity-10 backdrop-blur-2xl w-[300px] absolute top-[30px] left-0 rounded-lg">
                  <div className=' flex flex-col'>
                    <Link to='/industries/Communication'><div className='text-black p-4 text-center'>Communication</div></Link>
                    <Link to='/industries/hospitality'><div className='text-black p-4 text-center'> Logistics</div></Link>
                    <Link to='/industries/logistics'><div className='text-black p-4 text-center'>Retail</div></Link>
                  </div>
                  <div className=' flex flex-col'>
                    <Link to='/industries/public-sector'><div className='text-black p-4 text-center'>Banking and Finances</div></Link>
                    <Link to='/industries/retail'><div className='text-black p-4 text-center'>Public Sector</div></Link>

                  </div>
                </div>
              }
            </div>

            <NavLink to='/contact' className={({ isActive }) => isActive ? 'decoration-white underline decoration-2 underline-offset-4' : 'hover-underline-animation'}>Contact</NavLink>



            <Link to='https://startups.hubnex.in' className={` border-white ${active ? 'bg-white text-black' : 'bg-transparent text-white'}  border-2 py-[8px] px-[12px] rounded-full text-[16px] font-gilroy-semi-bold hover:bg-white hover:text-black duration-150 ease-in-out transition-all`}>Startup Program</Link>

          </div>
          <div className=' flex xl:hidden z-50'>

            {!open ?
              <img onClick={handleOpen} src={menu} className=" w-[30px] cursor-pointer right-4 top-6 absolute" />
              :
              <img onClick={handleOpen} src={close} className=" w-[25px] z-[100] cursor-pointer right-8 top-7 absolute" />
            }
          </div>
          <MobileNavbar open={open} />
        </div>
      </div>
    </div>
  )
}

export default Navbar