import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { setSavedJobs } from '@/redux/jobSlice'
import { toast } from 'sonner'
import { SimpleModeToggle } from '../simple-mode-toggle'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                // Clear all user-related state
                dispatch(setUser(null));
                dispatch(setSavedJobs([]));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // Even if logout API fails, clear user state locally
            dispatch(setUser(null));
            dispatch(setSavedJobs([]));
            navigate("/");

            // Show appropriate error message
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.code === 'ERR_NETWORK') {
                toast.error("Network error. You have been logged out locally.");
            } else {
                toast.error("Logout failed. You have been logged out locally.");
            }
        }
    }
    return (
        <div className='bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>GetHired<span className='text-[#F83002]'>Now</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5 text-gray-700 dark:text-gray-300'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                    {user && <li><Link to="/applied-jobs">My Applications</Link></li>}
                                    {user && <li><Link to="/saved-jobs">Saved Jobs</Link></li>}
                                </>
                            )
                        }


                    </ul>
                    <SimpleModeToggle />
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="User Profile" />
                                        {!user?.profile?.profilePhoto && (
                                            <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                                                {user?.fullname?.charAt(0)?.toUpperCase()}
                                            </div>
                                        )}
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                                    <div className='p-2'>
                                        <div className='flex gap-3 items-center mb-4'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="User Profile" />
                                                {!user?.profile?.profilePhoto && (
                                                    <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                                                        {user?.fullname?.charAt(0)?.toUpperCase()}
                                                    </div>
                                                )}
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium text-gray-900 dark:text-white'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-500 dark:text-gray-400'>{user?.profile?.bio || 'Welcome to GetHiredNow!'}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600 dark:text-gray-400'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'>
                                                        <User2 />
                                                        <Button variant="link" className="p-0 h-auto text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                                                            <Link to="/profile">View Profile</Link>
                                                        </Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'>
                                                <LogOut className="text-red-500" />
                                                <Button
                                                    onClick={logoutHandler}
                                                    variant="link"
                                                    className="p-0 h-auto text-red-500 hover:text-red-700 font-medium"
                                                >
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar