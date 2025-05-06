import { Modal, notification } from 'antd';
import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import TagInput from '../../components/Tag/TagInput';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const EditNote = (props) => {

    const {
        isModalOpen, setIsModalOpen, getAllNote,
        dataUpdate, setDataUpdate,
        tags, setTags
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                title: dataUpdate.title,
                content: dataUpdate.content
            });
        }
    }, [dataUpdate]);

    const closeAndResetModal = () => {
        setIsModalOpen(false);
        form.resetFields();
        setDataUpdate(null);
        setTags([]);
    }

    const onEditNote = async (values) => {
        setIsLoading(true);
        const { title, content } = values;
        try {
            const res = await axiosInstance.put(`/edit-note/${dataUpdate._id}`, {
                title,
                content,
                tags
            });

            if (res.data && res.data.message) {
                notification.success({
                    message: 'Edit note',
                    description: 'Edit note successfully',
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
            <Modal title="EDIT NOTE"
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={closeAndResetModal}
                okButtonProps={{ loading: isLoading }}
                okText={'EDIT'}
            >
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={onEditNote}
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

export default EditNote