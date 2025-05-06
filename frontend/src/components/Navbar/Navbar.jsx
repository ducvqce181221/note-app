
import { Input } from 'antd';
const { Search } = Input;
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axiosInstance';
import { useEffect, useState } from 'react';


const Navbar = (props) => {

    const { userInfo, setUserInfo, setAllNotes, getAllNote } = props;
    const [searchValue, setSearchValue] = useState();
    const navigate = useNavigate();

    const [searchSize, setSearchSize] = useState('large');

    useEffect(() => {
        if (window.innerWidth < 640) {
            setSearchSize('middle'); // Mobile
        } else {
            setSearchSize('large'); // Desktop
        }
    }, []);

    const onLogout = () => {
        localStorage.clear();
        navigate('/login');
        setUserInfo("");
    };


    const onSearch = async (query) => {
        if (!query.trim()) {
            getAllNote();
            return;
        }

        try {
            const res = await axiosInstance.get('/search-note', {
                params: { query }
            });

            if (res.data && res.data.notes) {
                setAllNotes(res.data.notes);
                setSearchValue(null);
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <>
            <div className="navbar bg-base-100 shadow-sm justify-between">
                <p className="btn btn-ghost text-lg sm:text-xl text-blue-600">Notes</p>

                {userInfo &&
                    <>
                        {/* Search Note */}
                        <div className='w-45 sm:w-64 lg:w-80'>
                            <Search
                                placeholder="Search note"
                                onSearch={onSearch}
                                enterButton
                                size={searchSize}
                                onChange={(e) => setSearchValue(e.target.value)}
                                value={searchValue}
                            />
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-x-1 sm:gap-x-2">
                            <img
                                className="object-cover w-8 sm:w-10 h-8 sm:h-10 rounded-full"
                                src="https://img.icons8.com/?size=100&id=7rcs0z3sdioE&format=png&color=000000"
                                alt=""
                            />
                            <div>
                                <h1 className="text-xs sm:text-lg w-16 sm:w-32 truncate font-semibold text-gray-700 capitalize dark:text-white">
                                    {userInfo?.fullName}
                                </h1>
                                <p
                                    className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:cursor-pointer hover:underline"
                                    onClick={onLogout}
                                >
                                    Logout
                                </p>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default Navbar