import { format } from "date-fns";
import AddNote from "../../pages/Home/AddNote";
import { useState } from "react";
import EditNote from "../../pages/Home/EditNote";
import { notification, Popconfirm } from "antd";
import axiosInstance from "../../utils/axiosInstance";


const NoteCard = ({
    getAllNote,
    dataNote
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState();
    const [tags, setTags] = useState([]);

    const okDeleteNote = async () => {
        try {
            const res = await axiosInstance.delete(`/delete-note/${dataNote._id}`);
            if (res.data && res.data.message) {
                notification.success({
                    message: 'Delete note',
                    description: 'Delete note successfully',
                    showProgress: true,
                    pauseOnHover: false,
                    duration: 3
                });
                await getAllNote();
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const updateIsPinned = async () => {
        try {
            const res = await axiosInstance.put(`/update-note-pinned/${dataNote._id}`, {
                isPinned: !dataNote.isPinned
            });

            if (res.data && res.data.message) {
                getAllNote();
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <>
            <div className="w-full flex flex-col h-38 sm:h-46 px-4 sm:px-6 py-3 sm:py-4 bg-white border-1 border-solid border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
                <div className="flex items-center justify-between">
                    <p
                        href="#"
                        className="text-sm sm:text-base font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline max-w-[60%] sm:max-w-[75%] truncate"
                        role="link"
                    >
                        {dataNote.title}
                    </p>
                    <span className="text-xs sm:text-sm font-light text-gray-600 dark:text-gray-400">
                        {format(dataNote.createOn, 'dd-MM-yyyy')}
                    </span>
                </div>

                <div className="mt-2 flex-1 overflow-y-auto">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 break-words">
                        {dataNote.content}
                    </p>
                </div>

                <div className="flex gap-1 mt-2 overflow-x-auto">
                    {dataNote.tags.map((item, index) => (
                        <p
                            key={`${item}-${index}`}
                            className="px-1 py-1 text-xs font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500 whitespace-nowrap"
                            role="button"
                        >
                            #{item}
                        </p>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-3 sm:mt-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-4 sm:size-5 text-blue-400 hover:text-blue-500 hover:scale-125 transition duration-300"
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setDataUpdate(dataNote);
                                    setTags(dataNote.tags);
                                }}
                            >
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                            </svg>
                        </div>
                        <Popconfirm
                            placement="right"
                            title="Delete the note"
                            description="You sure to delete the note?"
                            onConfirm={okDeleteNote}
                            onCancel={() => { }}
                            okText="Delete"
                            cancelText="No"
                        >
                            <div className="cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-4 sm:size-5 text-red-400 hover:text-red-500 hover:scale-125 transition duration-300"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </Popconfirm>
                    </div>
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={`size-6 sm:size-7 ${dataNote.isPinned ? 'text-yellow-500' : 'text-gray-300'} hover:scale-125 transition duration-300`}
                            onClick={updateIsPinned}
                        >
                            <path
                                fillRule="evenodd"
                                d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm1.5 1.5a.75.75 0 0 0-.75.75V16.5a.75.75 0 0 0 1.085.67L12 15.089l4.165 2.083a.75.75 0 0 0 1.085-.671V5.25a.75.75 0 0 0-.75-.75h-9Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <EditNote
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                getAllNote={getAllNote}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                tags={tags}
                setTags={setTags}
            />
        </>
    );
}

export default NoteCard