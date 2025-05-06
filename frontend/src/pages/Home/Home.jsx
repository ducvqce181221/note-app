
import NoteCard from "../../components/Cards/NoteCard"
import { useEffect, useState } from "react"
import AddNote from "./AddNote"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar/Navbar";
import { Empty, Pagination } from "antd";



const Home = (props) => {

    const { setIsLoadingSpin } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [userInfo, setUserInfo] = useState("");
    const [allNotes, setAllNotes] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getAllNote();
    }, [current, pageSize]);

    useEffect(() => {
        getUserInfo();
    }, []);

    // Get all notes
    const getAllNote = async () => {
        setIsLoadingSpin(true);
        try {
            const res = await axiosInstance.get(`/get-all-notes?current=${current}&pageSize=${pageSize}`);

            if (res.data && res.data.notes) {
                setAllNotes(res.data.notes);
                setTotal(res.data.meta.total);
            }
        } catch (error) {
            alert.log(error.response.data.message);
        }
        setIsLoadingSpin(false);
    }

    // Get user info
    const getUserInfo = async () => {
        try {
            const res = await axiosInstance.get('/get-user');
            if (res.data && res.data.user) {
                setUserInfo(res.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        }
    };

    const onChangePage = (page, pagination) => {
        console.log('>>> check', { page, pagination });

        if (page) {
            if (page !== current) setCurrent(page);
        }
        if (pagination) {
            if (+pagination !== pageSize) setPageSize(+pagination);
        }
    }

    return (
        <>
            <Navbar
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setAllNotes={setAllNotes}
                getAllNote={getAllNote}
            />

            {allNotes.length > 0 ?
                <>

                    <div className="mx-4 sm:mx-8 lg:mx-20 mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {allNotes.map((item) => (
                            <NoteCard
                                key={item._id}
                                dataNote={item}
                                getAllNote={getAllNote}
                            />
                        ))}
                    </div>
                    <div className="my-8">
                        <Pagination
                            align="center"
                            current={current}
                            pageSize={pageSize}
                            total={total}
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                            showSizeChanger={true}
                            onChange={onChangePage}
                        />
                    </div>
                </>
                :
                <div className="mx-100 mt-30">
                    <Empty
                        description={
                            <div className="text-lg pt-2">
                                Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!
                            </div>
                        }
                    ></Empty>
                </div>
            }

            <div className="fixed bottom-[7%] sm:bottom-[10%] right-[10%] sm:right-[3%]">
                <button className="btn btn-md sm:btn-xl btn-primary btn-circle"
                    onClick={() => setIsModalOpen(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" fill="currentColor" className="size-5 sm:size-7">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <AddNote
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                getAllNote={getAllNote}
            />
        </>
    )
}

export default Home