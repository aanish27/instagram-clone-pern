import { IoSearch } from 'react-icons/io5';
import { IoCompassOutline } from 'react-icons/io5';
import { AiOutlineMenu } from 'react-icons/ai';
import profile_pic from '../assets/car.jpg';
import BrandName from './BrandName';
import SideBarItem from './SideBarItem';
import { GoHomeFill } from 'react-icons/go';


function Sidebar() {
  const iconStyle = { fontSize: '35px' };

  return (
    <div className="h-[100vh] w-fit p-5 text-white hidden md:block border-r-2 border-gray-900">
      <BrandName />
      <div className="pt-20">
        <SideBarItem
          icon={<GoHomeFill style={iconStyle} />}
          title={'Home'}
          notification={10}
        />
        <SideBarItem icon={<IoSearch style={iconStyle} />} title={'Search'} />
        <SideBarItem
          icon={<IoCompassOutline style={iconStyle} />}
          title={'Explore'}
        />
        <div className="flex items-center gap-5 pt-4">
          <img
            src={profile_pic}
            alt=""
            className="h-[35px] w-[35px] rounded-full"
          />
          <span className="text-xl font-light md:hidden">Aanish</span>
        </div>
        <SideBarItem
          icon={<AiOutlineMenu style={iconStyle} />}
          title={'More'}
        />
      </div>
    </div>
  );
}

export default Sidebar;
