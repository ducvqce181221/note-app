import { Modal, notification } from 'antd';
import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import TagInput from '../../components/Tag/TagInput';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const AddNote = (props) => {

    const { isModalOpen, setIsModalOpen, getAllNote } = props;
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();


    const closeAndResetModal = () => {
        setIsModalOpen(false);
        form.resetFields();
        setTags([]);
    }

    const onAddNote = async (values) => {
        setIsLoading(true);

        const { title, content } = values;
        try {
            const res = await axiosInstance.post('./add-note', {
                title,
                content,
                tags
            });

            if (res.data && res.data.note) {
                notification.success({
                    message: 'Add note',
                    description: 'Add note successfully',
                    showProgress: true,
                    pauseOnHover: false,
                    duration: 3
                });
                closeAndResetModal();
                await getAllNote();
            }
        } catch (error) {
            alert(error.response.data.message);
        }

        setIsLoading(false);
    }

    return (
        <>
            <Modal title="NEW NOTE"
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={closeAndResetModal}
                okButtonProps={{ loading: isLoading }}
            >
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={onAddNote}
                >
                    <Form.Item
                        label="TITLE"
                        name="title"
                        rules={[{ required: true, message: 'Please input your TITLE!' }]}
                    >
                        <Input size='large' />
                    </Form.Item>

                    <Form.Item
                        label="CONTENT"
                        name="content"
                        rules={[{ required: true, message: 'Please input your CONTENT!' }]}
                    >
                        <TextArea rows={7} />
                    </Form.Item>

                    <h3 className='mb-2'>TAG</h3>
                    <TagInput
                        tags={tags}
                        setTags={setTags}
                    />

                </Form>
            </Modal>
        </>
    );
}

export default AddNote